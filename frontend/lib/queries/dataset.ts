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

  //@ts-ignore
  const type = match(options?.dataset_type)
    .with(["dataset"], (v) => `-dashboard_url:['' TO *]`)
    .with(["dashboard"], (v) => `dashboard_url:['' TO *]`)
    .otherwise(() => "");

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

  if (type !== "") {
    fqList.push(type);
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

  const datasets = res.result.results?.map((d) => ({
    ...d,
    dataset_type: !!d?.dashboard_url ? "dashboard" : "dataset",
  }));

  return { ...res.result, results: datasets };
}

const joinTermsWithOr = (tems) => {
  return tems.map((t) => `"${t}"`).join(" OR ");
};

export const getDataset = async ({ name }: { name: string }) => {
  const DMS = process.env.NEXT_PUBLIC_CKAN_URL;
  const ckan = new CKAN(DMS);
  const privateName = publicToPrivateDatasetName(name);
  const dataset = await ckan.getDatasetDetails(privateName);
  dataset.name = privateToPublicDatasetName(dataset.name);

  return {
    ...dataset,
    _name: privateName,
    organization: {
      ...dataset.organization,
      name: privateToPublicOrgName(dataset.organization.name),
    },
  };
};
