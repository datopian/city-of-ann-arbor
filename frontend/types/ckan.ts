import { type Dataset as CoreDataset } from "@portaljs/ckan";

export type Dashboard = CoreDataset & {
  dashboard_url: string;
  image_url: string;
};

export type Dataset = CoreDataset & {}
