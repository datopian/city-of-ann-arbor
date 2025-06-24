import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from ckanext.ann_arbor.logic.action.create import package_create as ann_arbor_create_package
from ckanext.ann_arbor.logic.action.update import package_update as ann_arbor_update_package
from ckanext.ann_arbor.views.dataset import dataset as dataset_bp


class AnnArborPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IActions)
    plugins.implements(plugins.IBlueprint)

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
