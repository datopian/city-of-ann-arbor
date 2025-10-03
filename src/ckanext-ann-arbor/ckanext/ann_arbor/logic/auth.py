import logging
import ckan.plugins as p

log = logging.getLogger(__name__)


@p.toolkit.auth_allow_anonymous_access
def group_show(context, data_dict):
    return {"success": True}
