import { type Dataset as CoreDataset } from "@portaljs/ckan";

export type Dataset = CoreDataset & {
  visualization_url: string;
  image_url: string;
  ann_arbor_dataset_type: "dashboard" | "dataset" | "map";
  extras?: { key: string; value: string }[];
  license_url: string;
};
