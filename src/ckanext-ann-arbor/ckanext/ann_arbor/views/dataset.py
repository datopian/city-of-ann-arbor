import logging

import ckan.lib.base as base
import ckan.lib.navl.dictization_functions as dict_fns
import ckan.logic as logic
from ckan.common import _, config, request
from ckan.lib.helpers import helper_functions as h
from ckan.lib.search import SearchIndexError
from ckan.types import Context
from ckan.views.dataset import CreateView as BaseCreateView
from ckan.views.dataset import (
    EditView, _form_save_redirect, _tag_string_to_list)
from flask import Blueprint

tuplize_dict = logic.tuplize_dict
clean_dict = logic.clean_dict
parse_params = logic.parse_params
get_action = logic.get_action
NotFound = logic.NotFound
NotAuthorized = logic.NotAuthorized
ValidationError = logic.ValidationError

log = logging.getLogger(__name__)


dataset = Blueprint(
    "ann_arbor_dataset",
    __name__,
    url_prefix="/dataset",
    url_defaults={"package_type": "dataset"},
)


class CreateView(BaseCreateView):

    def post(self, package_type):
        # Override
        context = self._prepare()
        is_an_update = False
        ckan_phase = request.form.get("_ckan_phase")
        try:
            data_dict = clean_dict(
                dict_fns.unflatten(tuplize_dict(parse_params(request.form)))
            )
        except dict_fns.DataError:
            return base.abort(400, _("Integrity Error"))
        try:
            if ckan_phase:
                # prevent clearing of groups etc
                context["allow_partial_update"] = True
                # sort the tags
                if "tag_string" in data_dict:
                    data_dict["tags"] = _tag_string_to_list(
                        data_dict["tag_string"])
                if data_dict.get("pkg_name"):
                    is_an_update = True
                    # This is actually an update not a save
                    data_dict["id"] = data_dict["pkg_name"]
                    del data_dict["pkg_name"]
                    # don't change the dataset state
                    data_dict["state"] = "draft"
                    # this is actually an edit not a save
                    pkg_dict = get_action("package_update")(context, data_dict)

                    # redirect to add dataset resources
                    url = h.url_for(
                        "{}_resource.new".format(package_type), id=pkg_dict["name"]
                    )
                    return h.redirect_to(url)
                # Make sure we don't index this dataset
                if request.form["save"] not in ["go-resource", "go-metadata"]:
                    data_dict["state"] = "draft"
                # allow the state to be changed
                context["allow_state_change"] = True

            data_dict["type"] = package_type
            pkg_dict = get_action("package_create")(context, data_dict)

            create_on_ui_requires_resources = pkg_dict.get("ann_arbor_dataset_type") == "dataset"

            if ckan_phase:
                if create_on_ui_requires_resources:
                    # redirect to add dataset resources if
                    # create_on_ui_requires_resources is set to true
                    url = h.url_for(
                        "{}_resource.new".format(package_type), id=pkg_dict["name"]
                    )
                    return h.redirect_to(url)

                get_action("package_update")(
                    Context(context, allow_state_change=True),
                    dict(pkg_dict, state="active"),
                )
                return h.redirect_to("{}.read".format(package_type), id=pkg_dict["id"])

            return _form_save_redirect(
                pkg_dict["name"], "new", package_type=package_type
            )
        except NotAuthorized:
            return base.abort(403, _("Unauthorized to read package"))
        except NotFound:
            return base.abort(404, _("Dataset not found"))
        except SearchIndexError as e:
            try:
                exc_str = str(repr(e.args))
            except Exception:  # We don't like bare excepts
                exc_str = str(str(e))
            return base.abort(
                500, _("Unable to add package to search index.") + exc_str
            )
        except ValidationError as e:
            errors = e.error_dict
            error_summary = e.error_summary
            if is_an_update:
                # we need to get the state of the dataset to show the stage we
                # are on.
                pkg_dict = get_action("package_show")(context, data_dict)
                data_dict["state"] = pkg_dict["state"]
                return EditView().get(
                    package_type, data_dict["id"], data_dict, errors, error_summary
                )
            data_dict["state"] = "none"
            return self.get(package_type, data_dict, errors, error_summary)


dataset.add_url_rule("/new", view_func=CreateView.as_view(str("new")))
