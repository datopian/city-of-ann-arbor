import { CKAN } from "@portaljs/ckan";
import {
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateDatasetName,
} from "./utils";
import { PackageSearchOptions } from "@/schemas/dataset.interface";
import CkanRequest, { CkanResponse } from "@portaljs/ckan-api-client-js";
import { match, P } from "ts-pattern";
import { Dataset } from "@/types/ckan";

const DMS = process.env.NEXT_PUBLIC_CKAN_URL;
const mainOrg = process.env.NEXT_PUBLIC_ORG;

interface FacetItem {
  name: string;
  count: number;
  display_name: string;
}

interface Facet {
  title: string;
  items: FacetItem[];
}

export async function searchDatasets(
  options: PackageSearchOptions & { type?: string[] }
) {
  const baseAction = `package_search`;

  const facetFields = ["groups", "organization", "res_format", "tags"]
    .map((f) => `"${f}"`)
    .join(",");

  let queryParams: string[] = [];

  if (options?.query) {
    queryParams.push(`q=${options.query}`);
  }

  if (options?.offset) {
    queryParams.push(`start=${options.offset}`);
  }

  if (options?.limit || options?.limit == 0) {
    queryParams.push(`rows=${options.limit}`);
  }

  if (options?.sort) {
    queryParams.push(`sort=${options?.sort}`);
  }

  let fqList: string[] = [mainOrg ? `main_org:${mainOrg}` : ""];

  if (options?.fq) {
    fqList.push(options.fq);
  }

  let fqListGroups: string[] = [];
  if (options?.orgs?.length) {
    fqListGroups.push(`organization:(${joinTermsWithOr(options?.orgs)})`);
  }

  if (options?.groups?.length) {
    fqListGroups.push(`groups:(${joinTermsWithOr(options?.groups)})`);
  }

  if (options?.resFormat?.length) {
    fqListGroups.push(`res_format:(${joinTermsWithOr(options.resFormat)})`);
  }

  if (options?.tags?.length) {
    fqListGroups.push(`tags:(${joinTermsWithOr(options.tags)})`);
  }

  if (fqListGroups?.length) {
    fqList.push(`+(${fqListGroups.join(" AND ")})`);
  }

  if (options?.type?.length) {
    fqList.push(`ann_arbor_dataset_type:(${joinTermsWithOr(options.type)})`);
  }

  if (fqList?.length) {
    queryParams.push(`fq=${fqList.join(" ")}`);
  }

  const action = `${baseAction}?${queryParams.join(
    "&"
  )}&facet.field=[${facetFields}]&facet.limit=9999`;

  const res = await CkanRequest.get<
    CkanResponse<{
      results: Dataset[];
      count: number;
      search_facets: {
        organization: Facet;
        groups: Facet;
        res_format: Facet;
        tags: Facet;
      };
    }>
  >(action, { ckanUrl: DMS });

  const datasets = res.result.results;
  return { ...res.result, results: datasets };
}

const joinTermsWithOr = (tems) => {
  return tems.map((t) => `"${t}"`).join(" OR ");
};

export const getDataset = async ({ name }: { name: string }) => {
  const DMS = process.env.NEXT_PUBLIC_CKAN_URL;
  const ckan = new CKAN(DMS);
  const privateName = publicToPrivateDatasetName(name);
  const dataset = (await ckan.getDatasetDetails(privateName)) as Dataset;
  dataset.name = privateToPublicDatasetName(dataset.name);

  return dataset;
};
