import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import HeroSection from "@/components/home/Hero";
import NavBar from "@/components/_shared/NavBar";
import { DashboardsSection } from "@/components/home/DashboardsSection";
import { DatasetsSection } from "@/components/home/DatasetsSection";
import { Footer } from "@/components/_shared/Footer";
import { Dataset } from "@/types/ckan";
import { MapsSection } from "@/components/home/MapsSection";

export async function getStaticProps() {
  const dashboards = await searchDatasets({
    offset: 0,
    limit: 9,
    tags: [],
    groups: [],
    orgs: [],
    type: ["dashboard"],
  });
  const maps = await searchDatasets({
    offset: 0,
    limit: 9,
    tags: [],
    groups: [],
    orgs: [],
    type: ["map"],
  });
  const datasets = await searchDatasets({
    offset: 0,
    limit: 6,
    tags: [],
    groups: [],
    orgs: [],
    type: ["dataset"],
  });
  const topics = await getAllGroups({ detailed: true });
  return {
    props: {
      dashboards: dashboards.results as Dataset[],
      datasets: datasets.results as Dataset[],
      maps: maps.results as Dataset[],
      groups: topics,
    },
    revalidate: 60,
  };
}

export default function Home({
  dashboards,
  groups,
  maps,
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

      <DashboardsSection dashboards={dashboards} />
      <MapsSection maps={maps} />

      <div className="space-y-2 mt-4">
        <DatasetsSection datasets={datasets} />
        <Footer />
      </div>
    </div>
  );
}
