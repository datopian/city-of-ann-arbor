import { type Dataset as CoreDataset } from "@portaljs/ckan";

export type Dataset = CoreDataset & {
  dashboard_url: string;
  image_url: string;
  dataset_type: "dashboard" | "dataset";
  extras?: { key: string; value: string }[];
};
