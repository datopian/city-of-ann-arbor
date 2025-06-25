import { GetServerSideProps } from "next";
import Head from "next/head";
import { CKAN } from "@portaljs/ckan";
import { getDataset } from "@/lib/queries/dataset";
import { Dataset } from "@/schemas/dataset.interface";
import {
  getTypeIcon,
  getTypeBadgeClass,
  getTypeIconBgColor,
  getFormatBadge,
  formatDate,
} from "@/lib/uiUtils";

interface DatasetPageProps {
  dataset: Dataset;
}

export const getServerSideProps: GetServerSideProps<DatasetPageProps> = async (
  context
) => {
  try {
    const ckan = new CKAN(process.env.NEXT_PUBLIC_CKAN_URL);
    const datasetName = context.params?.dataset as string;
    let dataset = await getDataset({ name: datasetName as string });
    if (!dataset) {
      return {
        notFound: true,
      };
    }
    const activityStream = await ckan.getDatasetActivityStream(dataset.name);
    dataset = {
      ...dataset,
      activity_stream: activityStream,
    };
    return {
      props: {
        dataset,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

import type React from "react";
import { Clock, Download, DownloadIcon } from "lucide-react";
import { ArrowPathIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NavBar from "@/components/_shared/NavBar";
import { Footer } from "@/components/_shared/Footer";
import { Fragment } from "react";
import Link from "next/link";

export default function DatasetPage({ dataset }: DatasetPageProps) {
  return (
    <div className="">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta name="description" content="City of Ann Arbor Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:min-h-screen bg-gradient-to-t from-[#E2F1E4] to-[#FFFFFF] to-65% pb-28">
        <NavBar />
        <div className="h-[156px] bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-65%"></div>
        <div className="hidden lg:block lg:absolute lg:top-28 lg:left-0 w-full h-[236px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
        <div className="lg:pt-3 relative z-10">
          <MainContent dataset={dataset} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

function MainContent({ dataset }: { dataset: Dataset }) {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-0 z-20">
      <div className="flex flex-col gap-y-5 w-full">
        <div className="w-full bg-white p-6 sm:p-8 lg:px-12 rounded-lg shadow-lg">
          <Breadcrumbs dataset={dataset} />
          <TitleSection dataset={dataset} />
        </div>
        <div className="">
          <TabsSection dataset={dataset} />
        </div>
      </div>
    </main>
  );
}

function Breadcrumbs({ dataset }: { dataset: Dataset }) {
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
          <BreadcrumbPage className="text-ann-arbor-primary-blue">
            {dataset.title || dataset.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function TitleSection({ dataset }: { dataset: Dataset }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-col md:flex-row sm:items-start gap-x-2 mb-1">
            <h1 className="leading-tight text-black text-3xl font-bold">
              {dataset.title || dataset.name}
            </h1>
            <Badge
              variant="outline"
              className={`w-fit text-gray-800 mt-1 text-sm font-normal border-0 ${getTypeBadgeClass(
                dataset.type || "dataset"
              )}`}
            >
              {dataset.type || "dataset"}
            </Badge>
          </div>
          <p className="text-sm font-normal text-black mb-3 mt-2">
            {dataset.notes}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-normal text-black mb-3">
            {dataset.metadata_created && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 mb-0.5" />
                Created {formatDate(dataset.metadata_created)}
              </div>
            )}
            {dataset.metadata_modified && (
              <div className="flex items-center gap-1">
                <ArrowPathIcon className="w-4 h-4 mb-0.5" />
                Updated {formatDate(dataset.metadata_modified)}
              </div>
            )}
            {dataset.tags && dataset.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <HashtagIcon className="w-4 h-4 mb-0.5" />
                {dataset.tags
                  .slice(0, 3)
                  .map((tag) => tag.display_name)
                  .join(", ")}
                {dataset.tags.length > 3 && "..."}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dataset.resources.map((resource) => (
              <Fragment key={resource.id}>
                {getFormatBadge(resource.format)}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabsSection({ dataset }: { dataset: Dataset }) {
  return (
    <Tabs defaultValue="overview" className="bg-transparent drop-shadow-xl">
      <TabsList className="flex justify-start bg-transparent rounded-md mb-0 p-0 border-b-0 h-auto overflow-x-scroll md:overflow-x-visible">
        <TabsTrigger
          value="resources"
          className="font-normal text-base block py-4 px-12 data-[state=active]:border-b-0 data-[state=active]:font-bold data-[state=active]:bg-white data-[state=active]:text-ann-arbor-gray-600 data-[state=active]:shadow-none data-[state=active]:border-t-[3px] data-[state=active]:border-t-ann-arbor-accent-green rounded-none rounded-t-[10px]"
        >
          Resources
        </TabsTrigger>
        <TabsTrigger
          value="overview"
          className="font-normal text-base block py-4 px-12 data-[state=active]:border-b-0 data-[state=active]:font-bold data-[state=active]:bg-white data-[state=active]:text-ann-arbor-gray-600 data-[state=active]:shadow-none data-[state=active]:border-t-[3px] data-[state=active]:border-t-ann-arbor-accent-green rounded-none rounded-t-[10px]"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="api"
          className="font-normal text-base block py-4 px-12 data-[state=active]:border-b-0 data-[state=active]:font-bold data-[state=active]:bg-white data-[state=active]:text-ann-arbor-gray-600 data-[state=active]:shadow-none data-[state=active]:border-t-[3px] data-[state=active]:border-t-ann-arbor-accent-green rounded-none rounded-t-[10px]"
        >
          API Documentation
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="resources"
        className="bg-white p-12 border-none rounded-b-[10px] mt-0"
      >
        <ResourcesContent dataset={dataset} />
      </TabsContent>
      <TabsContent
        value="overview"
        className="bg-white p-12 border-none rounded-b-[10px] mt-0"
      >
        <OverviewContent />
      </TabsContent>
      <TabsContent
        value="api"
        className="bg-white p-12 border-none rounded-b-[10px] mt-0"
      >
        <ApiCodeTabs
          url={process.env.NEXT_PUBLIC_CKAN_URL}
          packageId={dataset.id}
        />
      </TabsContent>
    </Tabs>
  );
}

function OverviewContent() {
  const detailItem = (label: string, value: string | React.ReactNode) => (
    <div className="mb-4">
      <h3 className="text-base font-medium mb-1">{label}</h3>
      {typeof value === "string" ? (
        <p className="text-gray-500 text-sm">{value}</p>
      ) : (
        value
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex gap-x-2 items-center">
        <h2 className="text-base font-normal text-ann-arbor-primary-blue mb-2">
          Export metadata in
        </h2>
        <div className="flex space-x-4 mb-2 text-base font-normal">
          <Button
            variant="link"
            className="p-0 h-auto hover:underline font-normal"
          >
            <Download size={16} className="text-ann-arbor-primary-blue" /> RDF
          </Button>
          <Button
            variant="link"
            className="p-0 h-auto hover:underline font-normal"
          >
            <Download size={16} className="text-ann-arbor-primary-blue" /> TTL
            TTL
          </Button>
          <Button
            variant="link"
            className="p-0 h-auto hover:underline font-normal"
          >
            <Download size={16} className="text-ann-arbor-primary-blue" />
            JSON-LD
          </Button>
        </div>
      </div>

      {detailItem(
        "Stakeholders",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
      )}

      <div className="mb-4">
        <h3 className="text-base font-medium mb-1">Sources</h3>
        <ul className="list-disc list-inside text-sm">
          <li>
            <a href="#" className="text-ann-arbor-primary-blue hover:underline">
              American Transport Outlook (ATO)
            </a>
          </li>
          <li>
            <a href="#" className="text-ann-arbor-primary-blue hover:underline">
              Integrated Database of the American Energy System (JRC-IDEES)
            </a>
          </li>
        </ul>
      </div>

      {detailItem("Last updated date", "23 March, 2023")}
      {detailItem("Version", "1.0")}
      {detailItem("Temporal Coverage", "01 January 1990 - 31 December 2022")}
      {detailItem("Coverage type", "National")}
      {detailItem("Data type", "Count")}
      {detailItem("Visibility", "Public")}
      {detailItem(
        "License",
        <a
          href="#"
          className="text-ann-arbor-primary-blue hover:underline text-sm"
        >
          Open Data Commons Attribution License
        </a>
      )}
    </div>
  );
}

function ResourcesContent({ dataset }: { dataset: Dataset }) {
  const getFileIcon = (format: string) => {
    const formatLower = format?.toLowerCase() || "";
    const iconClass = "w-8 h-10 relative overflow-hidden";

    switch (formatLower) {
      case "xls":
      case "xlsx":
        return (
          <div data-file-type="XLS" className={iconClass}>
            <img src="/icons/xls.svg" alt="xls" />
          </div>
        );
      case "csv":
        return (
          <div data-file-type="CSV" className={iconClass}>
            <img src="/icons/csv.svg" alt="csv" />
          </div>
        );
      case "xml":
        return (
          <div data-file-type="XML" className={iconClass}>
            <img src="/icons/xml.svg" alt="xml" />
          </div>
        );
      case "json":
        return (
          <div data-file-type="JSON" className={iconClass}>
            <img src="/icons/json.svg" alt="json" />
          </div>
        );
      default:
        return <></>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    return `${Math.round(kb)} KB`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!dataset.resources || dataset.resources.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No resources available for this dataset.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-gray-800 text-base font-semibold leading-tight">
          {dataset.resources.length} resource
          {dataset.resources.length !== 1 ? "s" : ""}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {dataset.resources.map((resource, index) => (
          <div
            key={resource.id}
            className={`pl-4 pr-6 py-4 rounded-[20px] hover:bg-ann-arbor-groups-5/20 outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-4 
            `}
          >
            {getFileIcon(resource.format)}
            <div className="flex-1 inline-flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-base font-medium leading-normal">
                {resource.name || `Resource ${index + 1}`}
              </div>
              <div className="self-stretch justify-center text-gray-500 text-xs font-normal leading-tight">
                {resource.last_modified &&
                  `Updated ${formatDate(resource.last_modified)}`}
                {resource.last_modified && resource.size && " | "}
                {resource.size && formatFileSize(resource.size)}
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              {resource.datastore_active && (
                <Button className="bg-ann-arbor-accent-green text-white hover:bg-ann-arbor-accent-green/80">
                  Preview
                </Button>
              )}
              <Link href={`${resource.url}`}>
                <DownloadIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ApiCodeTabsProps {
  url: string;
  packageId: string;
}

export function ApiCodeTabs({ url, packageId }: ApiCodeTabsProps) {
  const pythonCode = `
import urllib.request
import json

# Define the API endpoint and package ID
url = '${url}/api/package_show'
id = '${packageId}'

# Construct the full URL with query parameters
full_url = api_url + '?' + urllib.parse.urlencode(params)

try:
    with urllib.request.urlopen(full_url) as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            print(json.dumps(data, indent=2)) # Display the fetched JSON data
        else:
            print(f'Error: Received status code {response.status}')
except urllib.error.URLError as e:
    print(f'Error fetching data: {e.reason}')
except json.JSONDecodeError as e:
    print(f'Error decoding JSON: {e}')
  `;

  const javascriptCode = `
  async function fetchData() {
    const apiUrl = '${url}/api/package_show/';
    const packageId = '${packageId}';
    const fullUrl = \`\${apiUrl}?id=\${packageId}\`;

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2)); // Display the fetched JSON data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
  `;

  const curlCode = `
  curl -X GET "${url}/api/package_show?id=${packageId}"
  `;

  return (
    <div className="w-full">
      <div className="max-w-[680px] pb-4">
        <span className="text-gray-800 text-base font-normal leading-relaxed">
          Access package data via a web API with powerful query support. Further
          information in the main{" "}
        </span>
        <a
          href="https://docs.ckan.org/en/2.11/"
          className="text-[#00565b] text-base font-medium underline leading-relaxed"
        >
          CKAN API guide.
        </a>
      </div>
      <Tabs defaultValue="python" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-t-lg max-w-[433px]">
          <TabsTrigger
            value="python"
            className="data-[state=active]:bg-ann-arbor-accent-green data-[state=active]:text-white data-[state=inactive]:bg-gray-100 dark:data-[state=inactive]:bg-gray-800 rounded-md py-2 text-sm font-medium"
          >
            Python
          </TabsTrigger>
          <TabsTrigger
            value="javascript"
            className="data-[state=active]:bg-ann-arbor-accent-green data-[state=active]:text-white data-[state=inactive]:bg-gray-100 dark:data-[state=inactive]:bg-gray-800 rounded-md py-2 text-sm font-medium"
          >
            JavaScript
          </TabsTrigger>
          <TabsTrigger
            value="curl"
            className="data-[state=active]:bg-ann-arbor-accent-green data-[state=active]:text-white data-[state=inactive]:bg-gray-100 dark:data-[state=inactive]:bg-gray-800 rounded-md py-2 text-sm font-medium"
          >
            curl
          </TabsTrigger>
        </TabsList>
        <div className="bg-[#f7fbfe] p-4 rounded-b-lg mt-5 max-w-[1000px]">
          <TabsContent value="python" className="mt-0">
            <pre className="text-sm overflow-x-auto p-4 text-gray-800 rounded-md">
              <code>{pythonCode.trim()}</code>
            </pre>
          </TabsContent>
          <TabsContent value="javascript" className="mt-0">
            <pre className="text-sm overflow-x-auto p-4 text-gray-800 rounded-md">
              <code>{javascriptCode.trim()}</code>
            </pre>
          </TabsContent>
          <TabsContent value="curl" className="mt-0">
            <pre className="text-sm overflow-x-auto p-4 text-gray-800 rounded-md">
              <code>{curlCode.trim()}</code>
            </pre>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
