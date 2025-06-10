#!/bin/bash

ckan config-tool $CKAN_INI "scheming.presets=ckanext.scheming:presets.json ckanext.dcat.schemas:presets.yaml"
ckan config-tool $CKAN_INI "scheming.dataset_schemas=ckanext.ann_arbor:ckan_dataset.yaml"
ckan config-tool $CKAN_INI "ckanext.dcat.rdf.profiles=dcat_us_3"
