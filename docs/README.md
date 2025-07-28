# DOCS

## Schema

Our modifications to default CKAN were pretty small, they basically can be traced back to these 3 new fields

```
- field_name: ann_arbor_dataset_type
  label: Dataset Type
  preset: select
  required: true
  choices:
  - label: Dataset
    value: dataset
  - label: Dashboard
    value: dashboard
  - label: Map
    value: map
  form_attrs:
    data-module: dataset-type

- field_name: visualization_url
  label: Visualization URL
  form_placeholder: http://example.com/dashboard
  display_property: foaf:page
  display_snippet: link.html
  validators: ignore_missing url_validator optional_for_datasets
  required: true
  help_text: "Link to the external visualization"

- field_name: image_url
  label: Visualization Thumbnail
  form_placeholder: http://example.com/my-image.jpg
  preset: organization_url_upload
  display_snippet: image.html
```

- ann_arbor_dataset_type
    - This defines if a dataset is an actual dataset, a map or a dashboard, this allow us to filter them on the frontend and make sure that if you create a dashboard or a map you are not required to upload resources together with it
    - For reference these are the filters we are talking about![image](https://hackmd.io/_uploads/SkJZqkSvlx.png)
- visualization_url
    - This is used mainly for maps and dashboards, basically a new url field that allow us to link the respective map or dashboard
    - This allow us to populate the link in this button ![image](https://hackmd.io/_uploads/Ske09JBvlx.png)

- image_url
    - In an ideal world this would be called "dashboard_image" or "visualization_image" but we had to use this name to make use of the image uploader from CKAN. This is supposed to be the "thumbnail" for a given dashboard or map.
    - This becomes this small image next to the item card![image](https://hackmd.io/_uploads/BkbG5kBPxl.png)

## Oauth2

Besides that we also installed the `oauth2` extension, all the configuration required for it is present on https://github.com/datopian/dx-helm-ann-arbor/blob/dev/ckan/setup/oauth2_config.yaml just keep in mind that there is a file on the dev branch and one on the prod branch



