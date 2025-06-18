import type {
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import HeroSection from "@/components/home/Hero";
import NavBar from "@/components/_shared/NavBar";
import { PopularDashboards } from "@/components/home/PopularDashboards";
import { RecentlyAdded } from "@/components/home/RecentlyAdded";
import { Footer } from "@/components/_shared/Footer";
import { Dashboard } from "@/types/ckan";

export async function getStaticProps() {
  const dashboards = await searchDatasets({
    offset: 0,
    limit: 9,
    tags: [],
    groups: [],
    orgs: [],
    fq: "dashboard_url:[* TO *]",
  });
  const datasets = await searchDatasets({
    offset: 0,
    limit: 6,
    tags: [],
    groups: [],
    orgs: [],
    fq: "-dashboard_url:[* TO *]",
  });
  const groups = await getAllGroups({ detailed: true });
  return {
    props: {
      dashboards: dashboards.datasets as Dashboard[],
      datasets: datasets.datasets,
      groups,
    },
    revalidate: 60,
  };
}

export default function Home({
  dashboards,
  groups,
  datasets,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <div className="">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta name="description" content="City of Ann Arbor Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:min-h-screen bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-65%">
        <NavBar />
        <HeroSection groups={groups} />
        <div className="lg:absolute lg:bottom-0 lg:left-0 w-full h-[222px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
      </div>
      <PopularDashboards dashboards={dashboards} />
      <div className="space-y-2 mt-4">
        <RecentlyAdded datasets={datasets} />
        <Footer />
      </div>
    </div>
  );
}
