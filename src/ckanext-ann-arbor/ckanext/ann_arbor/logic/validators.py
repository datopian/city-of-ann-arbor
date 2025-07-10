import logging
import ckan.lib.navl.dictization_functions as df
from ckan.common import _


log = logging.getLogger(__name__)


def optional_for_datasets(key, data, errors, context):
    dataset_type = data.get(("ann_arbor_dataset_type",), "")
    value = data.get(key)

    if dataset_type != "dataset" and not value:
        raise df.Invalid(_("Required"))
