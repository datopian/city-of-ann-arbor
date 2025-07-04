ckan.module("dataset-type", function($, _) {
    "use strict";
    return {
        options: {
            debug: false,
        },

        initialize: function() {
            function updateNonDatasetFieldsVisibility() {
                const value = $('[name="ann_arbor_dataset_type"]').val();
                const $visualizationUrl = $('[name="visualization_url"]').parents(".form-group.control-medium");
                const $thumbnailUrl = $(".image-upload");

                if (value == "dataset") {
                    $visualizationUrl.css("display", "none");
                    $thumbnailUrl.css("display", "none");
                } else {
                    $visualizationUrl.css("display", "block");
                    $thumbnailUrl.css("display", "block");
                }
            }
            updateNonDatasetFieldsVisibility()

            this.el.on("change", () => {
                updateNonDatasetFieldsVisibility()
            });
        },
    };
});
