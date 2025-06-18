import { type Dataset as CoreDataset } from "@portaljs/ckan";

export type Dashboard = CoreDataset & {
  dashboard_url: string;
  dashboard_thumbnail: string;
};
