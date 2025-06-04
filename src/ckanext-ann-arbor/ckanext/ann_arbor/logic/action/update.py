import ckan.lib.navl.dictization_functions as dictization_functions
from ckan.common import request
import ckan.plugins.toolkit as tk
import ckan.lib.uploader as uploader
import ckan.logic as logic

@tk.chained_action
def package_update(up_func, context, data_dict):
    # Get the translated title field value in the original title field so that 
    # core features do not break. eg. solr search with title
    model = context['model']

    try:
        data_dict.update(logic.clean_dict(
            dictization_functions.unflatten(
                logic.tuplize_dict(logic.parse_params(request.files)))
        ))
    except Exception as e:
        pass

    upload = uploader.get_uploader('group')
    upload.update_data_dict(data_dict, 'dashboard_thumbnail',
                            'image_upload', 'clear_upload')
    upload.upload(uploader.get_max_image_size())
    dashboard_thumbnail = data_dict.get("dashboard_thumbnail", None)
    if dashboard_thumbnail and not dashboard_thumbnail.startswith("http"):
        data_dict['dashboard_thumbnail'] = tk.h.url_for_static(
        'uploads/group/%s' % dashboard_thumbnail, qualified=True)
