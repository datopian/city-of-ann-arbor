import { GetServerSideProps } from "next";
import { Dataset, Resource } from "@portaljs/ckan";
import { CKAN } from "@portaljs/ckan";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import NavBar from "@/components/_shared/NavBar";
import { Footer } from "@/components/_shared/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { ChevronsLeft, ChevronsRight, Clock } from "lucide-react";
import { getFormatBadge, formatDate, formatSize } from "@/lib/uiUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataExplorer } from "@/components/data-explorer/DataExplorer";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function getDatastoreInfo(resourceId: string) {
  const DMS = process.env.NEXT_PUBLIC_CKAN_URL;
  const url = `${DMS}/api/3/action/datastore_search?resource_id=${resourceId}`;
  const res = await fetch(url);
  const datastore: {
    result: {
      fields: {
        id: string;
        type: string;
      }[];
    };
  } = await res.json();
  return datastore.result;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_CKAN_URL;
  const ckan = new CKAN(DMS);
  try {
    const resourceId = context.params?.resourceId;
    const datasetName = context.params?.dataset as string;
    if (!resourceId) {
      console.log("[!] resourceId not found");
      return {
        notFound: true,
      };
    }

    const [resource, resourceInfo, dataset] = await Promise.all([
      ckan.getResourceMetadata(resourceId as string),
      getDatastoreInfo(resourceId as string),
      ckan.getDatasetDetails(datasetName as string),
    ]);
    if (!resource) {
      console.log("[!] Resource metadata not found");
      return {
        notFound: true,
      };
    }

    return {
      props: {
        resource: {
          ...resource,
          ...resourceInfo,
          numOfColumns: resourceInfo.fields.length,
        },
        dataset,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

export default function ResourcePage({
  resource,
  dataset,
}: {
  resource: Resource & { numOfColumns: number };
  dataset: Dataset;
}): JSX.Element {
  const resourceFormat = resource.format.toLowerCase();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${resource.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:min-h-[1250px] bg-gradient-to-t from-[#E2F1E4] to-[#FFFFFF] to-65% pb-28">
        <NavBar />
        <div className="h-[156px] bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-65%"></div>
        <div className="hidden lg:block lg:absolute lg:top-28 lg:left-0 w-full h-[236px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
        <div className="lg:pt-3 relative z-10">
          <MainContent resource={resource} dataset={dataset} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

function Breadcrumbs({
  resource,
  dataset,
}: {
  resource: Resource;
  dataset: Dataset;
}) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-ann-arbor-primary-blue hover:underline"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/search"
            className="text-ann-arbor-primary-blue hover:underline"
          >
            Data
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/@${dataset.organization.name}/${dataset.name}`}
            className="text-ann-arbor-primary-blue hover:underline"
          >
            {dataset.title || dataset.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-ann-arbor-primary-blue">
            {resource.name ?? resource.id}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CurrentResource({
  resource,
}: {
  resource: Resource & { numOfColumns: number };
}) {
  return (
    <div className="flex flex-col gap-y-2 w-full px-8 py-4 bg-[#eef6ff]">
      {getFormatBadge(resource.format)}
      <h3 className="text-primary-black text-sm font-medium leading-tight text-clip">
        {resource.name}
      </h3>
      <div className="flex items-center gap-x-2">
        <div className="text-primary-black text-xs font-normal">
          {formatSize(resource.size)}
        </div>
        <div className="text-primary-black text-xs font-normal">|</div>
        <div className="text-primary-black text-xs font-normal">
          {resource.numOfColumns} columns
        </div>
      </div>
    </div>
  );
}

function OtherResourceCard({
  resource,
  dataset,
}: {
  resource: Resource;
  dataset: Dataset;
}) {
  const href = resource.datastore_active
    ? `/@${dataset.organization.name}/${dataset.name}/r/${resource.id}`
    : resource.url;
  return (
    <div className="p-4">
      <Link href={href}>
        <div className="flex flex-col gap-y-2 w-full px-8 py-4 hover:bg-[#eef6ff]">
          {getFormatBadge(resource.format)}
          <h3 className="text-primary-black text-sm font-medium leading-tight text-clip">
            {resource.name}
          </h3>
          <div className="flex items-center gap-x-2">
            <div className="text-primary-black text-xs font-normal">
              {formatSize(resource.size)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MainContent({
  resource,
  dataset,
}: {
  resource: Resource & {
    numOfColumns: number;
  };
  dataset: Dataset;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-0 z-20">
      <div className="flex flex-col gap-y-5 w-full">
        <div className="w-full gap-4 grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 lg:relative">
          {/* Sidebar */}
          <div
            className={`col-span-1 lg:col-span-2 xl:col-span-2 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
              isSidebarCollapsed
                ? "lg:absolute lg:-left-full lg:opacity-0 lg:pointer-events-none"
                : "lg:relative lg:left-0 lg:opacity-100"
            }`}
          >
            <div className="flex items-center w-full justify-between px-8 pt-8 pb-4">
              <h3 className="text-primary-black text-sm font-medium leading-tight">
                {dataset.num_resources} resources
              </h3>
              <button
                onClick={toggleSidebar}
                className="lg:block hidden hover:bg-gray-100 p-1 rounded transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronsLeft className="w-6 h-6 text-primary-black" />
              </button>
            </div>
            <CurrentResource resource={resource} />
            {dataset.resources
              .filter((r) => r.id !== resource.id)
              .map((r) => (
                <OtherResourceCard dataset={dataset} key={r.id} resource={r} />
              ))}
          </div>

          {/* Main Content */}
          <div
            className={`col-span-1 bg-white p-6 sm:p-8 lg:px-12 rounded-lg shadow-lg transition-all duration-300 ease-in-out lg:relative ${
              isSidebarCollapsed
                ? "lg:col-span-6 xl:col-span-8"
                : "lg:col-span-4 xl:col-span-6"
            }`}
          >
            {/* Floating Toggle Button */}
            {isSidebarCollapsed && (
              <button
                onClick={toggleSidebar}
                className="lg:flex hidden absolute top-6 -left-4 bg-white text-primary-black p-3 rounded-lg shadow-lg transition-colors z-10"
                aria-label="Expand sidebar"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            )}

            <Breadcrumbs resource={resource} dataset={dataset} />
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1">
                  <div className="pb-4">{getFormatBadge(resource.format)}</div>
                  <div className="flex md:flex-row sm:items-start gap-x-2 mb-1 max-w-[80vw]">
                    <h1 className="leading-tight text-black text-3xl font-bold text-clip truncate">
                      {resource.name}{" "}
                    </h1>
                    <Link href={resource.url}>
                      <ArrowDownTrayIcon className="w-6 h-6 mt-1.5" />
                    </Link>
                  </div>
                  <p className="text-sm font-normal text-black mb-3 mt-2">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-normal text-black mb-3">
                    {resource.last_modified && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 mb-0.5" />
                        Created {formatDate(dataset.metadata_created)}
                      </div>
                    )}
                    {resource.size && (
                      <div className="flex items-center gap-1">
                        <ArrowsPointingOutIcon className="w-4 h-4 mb-0.5" />
                        {formatSize(resource.size)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ResourceTabs resource={resource} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function SchemaTab({
  resource,
}: {
  resource: Resource & { fields: any };
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
        {resource.fields.map((field) => (
          <TableRow key={field.id}>
            <TableHead>{field.id}</TableHead>
            <TableHead>{field.type}</TableHead>
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
}

export function ApiTab({ resource }: { resource: Resource }) {
  const url = process.env.NEXT_PUBLIC_CKAN_URL;

  const examples = {
    curl: `# Get 5 results containing "jones" in any field:
curl ${url}/api/action/datastore_search \\
  -H"Authorization:$API_TOKEN" -d '
{
  "resource_id": "${resource.id}",
  "limit": 5,
  "q": "jones"
}'`,

    python: `# Python example using requests
import requests
import json
import os

url = "${url}/api/action/datastore_search"
headers = {"Authorization": os.getenv("API_TOKEN")}
data = {
    "resource_id": "${resource.id}",
    "limit": 5,
    "q": "jones"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(json.dumps(result, indent=2))`,

    r: `# R example using httr
library(httr)
library(jsonlite)

url <- "${url}/api/action/datastore_search"
headers <- add_headers(Authorization = Sys.getenv("API_TOKEN"))
body <- list(
  resource_id = "${resource.id}",
  limit = 5,
  q = "jones"
)

response <- POST(url, headers, body = body, encode = "json")
result <- content(response, "parsed")
print(toJSON(result, pretty = TRUE))`,
  };

  return (
    <div className="space-y-6">
      {Object.entries(examples).map(([lang, code]) => (
        <div key={lang} className="space-y-2">
          <h4 className="font-medium text-gray-900 capitalize">{lang}</h4>
          <pre className="text-sm overflow-x-auto p-4 text-gray-800 rounded-md bg-[#f7fbff]">
            <code>{code.trim()}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

export function ResourceTabs({ resource }: { resource: Resource }) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-[#f7fbfe] p-1 rounded-t-lg max-w-[433px]">
        <TabsTrigger
          value="preview"
          className="data-[state=active]:bg-ann-arbor-accent-green data-[state=active]:text-white data-[state=inactive]:bg-[#f7fbfe] dark:data-[state=inactive]:bg-gray-800 rounded-md py-2 text-sm font-medium"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="table-schema"
          className="data-[state=active]:bg-ann-arbor-accent-green data-[state=active]:text-white data-[state=inactive]:bg-[#f7fbfe] dark:data-[state=inactive]:bg-gray-800 rounded-md py-2 text-sm font-medium"
        >
          Table Schema
        </TabsTrigger>
        <TabsTrigger
          value="api"
          className="data-[state=active]:bg-ann-arbor-accent-green data-[state=active]:text-white data-[state=inactive]:bg-[#f7fbfe] dark:data-[state=inactive]:bg-gray-800 rounded-md py-2 text-sm font-medium"
        >
          API
        </TabsTrigger>
      </TabsList>
      <div className="rounded-b-lg mt-24 md:mt-5 w-full">
        <TabsContent value="preview" className="mt-0">
          <DataExplorer resourceId={resource.id} />
        </TabsContent>
        <TabsContent value="table-schema" className="mt-0">
          <SchemaTab resource={resource as any} />
        </TabsContent>
        <TabsContent value="api" className="mt-0">
          <ApiTab resource={resource} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
