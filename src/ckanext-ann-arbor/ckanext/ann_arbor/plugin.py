import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from ckanext.ann_arbor.logic.action.create import package_create as ann_arbor_create_package
from ckanext.ann_arbor.logic.action.update import package_update as ann_arbor_update_package
from ckanext.ann_arbor.views.dataset import dataset as dataset_bp
import ckanext.ann_arbor.logic.auth as auth_fn
from ckanext.ann_arbor.logic import fix_lowercase_tags
import ckanext.ann_arbor.logic.validators as validators
import logging
import ckan.lib.helpers as h

log = logging.getLogger(__name__)

def get_featured_groups():
    _group = h.get_featured_groups()
    group = _group[0]
    group['packages'] = [package for package in group['packages'] if package['private'] == False]
    return [group]

def get_featured_organizations():
    _organization = h.get_featured_organizations()
    organization = _organization[0]
    organization['packages'] = [package for package in organization['packages'] if package['private'] == False]
    return [organization]

class AnnArborPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IActions)
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.IAuthFunctions)
    plugins.implements(plugins.IPackageController, inherit=True)
    plugins.implements(plugins.ITemplateHelpers)

    # ITemplateHelpers

    def get_helpers(self):
        return {
            'get_featured_groups': get_featured_groups,
            'get_featured_organizations': get_featured_organizations,
        }

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, "templates")
        toolkit.add_public_directory(config_, "public")
        toolkit.add_resource("assets", "ann_arbor")

    def get_actions(self):
        return {
            "package_create": ann_arbor_create_package,
            "package_update": ann_arbor_update_package,
        }

    # IBlueprint

    def get_blueprint(self):
        return [dataset_bp]

    # IValidators
    
    def get_validators(self):
        return {
            "optional_for_datasets": validators.optional_for_datasets
        }

    # IAuthFunctions
    def get_auth_functions(self):
        return {
            "group_show": auth_fn.group_show
        }

    # IPackageController
    def before_dataset_index(self, data_dict):
        tags = data_dict.get("tags", [])
        lowercase_tags = map(lambda t: t.lower(), tags)
        data_dict["tags"] = list(lowercase_tags)
        return data_dict
