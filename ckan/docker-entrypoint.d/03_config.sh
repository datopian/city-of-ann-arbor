#!/bin/bash

ckan config-tool $CKAN_INI "scheming.presets=ckanext.scheming:presets.json ckanext.dcat.schemas:presets.yaml"
