import logging

log = logging.getLogger(__name__)


def fix_lowercase_tags(data_dict):
    tag_string = data_dict.get("tag_string", "")

    if tag_string:
        data_dict["tag_string"] = tag_string.lower()

    tags = data_dict.get("tags", [])

    for t in tags:
        t["name"] = t["name"].lower()

    return data_dict
