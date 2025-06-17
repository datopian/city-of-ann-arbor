import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";
import HeroSection from "@/components/home/heroSectionLight";
import NavBar from "@/components/_shared/NavBar";
import { PopularDashboards } from "@/components/home/PopularDashboards";
import { RecentlyAdded } from "@/components/home/RecentlyAdded";
import { Footer } from "@/components/_shared/Footer";

export async function getServerSideProps() {
  const datasets = await searchDatasets({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });
  const groups = await getAllGroups({ detailed: true });
  const orgs = await getAllOrganizations({ detailed: true });
  const stats = {
    datasetCount: datasets.count,
    groupCount: groups.length,
    orgCount: orgs.length,
  };
  return {
    props: {
      datasets: datasets.datasets,
      groups,
      orgs,
      stats,
    },
  };
}

export default function Home({
  datasets,
  groups,
  orgs,
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className="space-y-24">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta name="description" content="City of Ann Arbor Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-65%">
        <NavBar />
        <HeroSection />
        <div className="absolute bottom-0 left-0 w-full h-[222px] bg-[url('/images/bg-image.jpg')] bg-contain"></div>
      </div>
      <PopularDashboards />
      <div className="space-y-2">
        <RecentlyAdded />
        <Footer />
      </div>
    </div>
  );
}
