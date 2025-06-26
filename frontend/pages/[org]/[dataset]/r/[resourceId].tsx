import { GetServerSideProps } from "next";
import { format } from "timeago.js";
import Layout from "@/components/_shared/Layout";
import { Dataset, Resource } from "@portaljs/ckan";
import { CKAN } from "@portaljs/ckan";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiArrowLeftLine } from "react-icons/ri";
import ResourcesBadges from "@/components/dataset/_shared/ResourcesBadges";
import Head from "next/head";
import { PrimeReactProvider } from "primereact/api";
import ResponsiveGridData from "@/components/responsiveGrid";
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
import { Clock, Download, DownloadIcon } from "lucide-react";
import { ArrowPathIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { getFormatBadge, formatDate, formatSize } from "@/lib/uiUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PdfViewer = dynamic(
  () => import("@portaljs/components").then((mod) => mod.PdfViewer),
  { ssr: false }
);

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

    const [resource, dataset] = await Promise.all([
      ckan.getResourceMetadata(resourceId as string),
      ckan.getDatasetDetails(datasetName as string),
    ]);
    if (!resource) {
      console.log("[!] Resource metadata not found");
      return {
        notFound: true,
      };
    }

    return {
      props: { resource, dataset },
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
  resource: Resource;
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

function CurrentResource({ resource }: { resource: Resource }) {
  return (
    <div className="flex flex-col gap-y-2 w-full px-8 py-4 bg-[#eef6ff]">
      {getFormatBadge(resource.format)}
      <h3 className="text-primary-black text-sm font-medium leading-tight">
        {resource.name}
      </h3>
      <div className="flex items-center gap-x-2">
        <div className="text-primary-black text-xs font-normal">
          {formatSize(resource.size)}
        </div>
        <div className="text-primary-black text-xs font-normal">
          120 columns
        </div>
      </div>
    </div>
  );
}

function OtherResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-2 w-full px-8 py-4 hover:bg-[#eef6ff]">
        {getFormatBadge(resource.format)}
        <h3 className="text-primary-black text-sm font-medium leading-tight">
          {resource.name}
        </h3>
        <div className="flex items-center gap-x-2">
          <div className="text-primary-black text-xs font-normal">
            {formatSize(resource.size)}
          </div>
          <div className="text-primary-black text-xs font-normal">
            120 columns
          </div>
        </div>
      </div>
    </div>
  );
}

function MainContent({
  resource,
  dataset,
}: {
  resource: Resource;
  dataset: Dataset;
}) {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-0 z-20">
      <div className="flex flex-col gap-y-5 w-full">
        <div className="w-full gap-4 grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8">
          <div className="col-span-1 lg:col-span-2 xl:col-span-2 bg-white rounded-lg shadow-lg ">
            <h3 className="px-8 pt-8 pb-4 text-primary-black text-sm font-medium leading-tight">
              {dataset.num_resources} resources
            </h3>
            <CurrentResource resource={resource} />
            {dataset.resources
              .filter((r) => r.id !== resource.id)
              .map((r) => (
                <OtherResourceCard resource={r} />
              ))}
          </div>
          <div className="col-span-1 lg:col-span-4 xl:col-span-6 bg-white p-6 sm:p-8 lg:px-12 rounded-lg shadow-lg ">
            <Breadcrumbs resource={resource} dataset={dataset} />
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1">
                  <div className="pb-4">{getFormatBadge(resource.format)}</div>
                  <div className="flex flex-col md:flex-row sm:items-start gap-x-2 mb-1">
                    <h1 className="leading-tight text-black text-3xl font-bold">
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
                  <ResourceTabs resource={resource} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ResourceTabs({ resource }: { resource: Resource }) {
  return (
    <div className="w-full">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#f7fbfe] p-1 rounded-t-lg max-w-[433px]">
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
        <div className="bg-[#f7fbfe] p-4 rounded-b-lg mt-5 max-w-[1000px]">
          <TabsContent value="preview" className="mt-0"></TabsContent>
          <TabsContent value="table-schema" className="mt-0"></TabsContent>
          <TabsContent value="api" className="mt-0"></TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
