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
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
      numberOfDashboards: dashboards.count,
      datasets: datasets.results as Dataset[],
      maps: maps.results as Dataset[],
      numberOfMaps: maps.count,
      groups: topics,
    },
    revalidate: 60,
  };
}

export default function Home({
  dashboards,
  numberOfDashboards,
  groups,
  numberOfMaps,
  maps,
  datasets,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  function scrollToDashboards() {
    const dashboardsSection = document.getElementById("dashboards");
    dashboardsSection?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta
          name="description"
          content="Find datasets, dashboards and maps in the City of Ann Arbor Open Data Portal"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:min-h-screen bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-65%">
        <NavBar />
        <HeroSection groups={groups} />
        <div className="lg:absolute lg:bottom-0 lg:left-0 w-full h-[222px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
        <div
          className="lg:absolute lg:bottom-0 lg:left-0 w-full h-[70px] items-center justify-center hidden lg:flex"
          style={{
            background:
              "linear-gradient(0deg,rgba(255, 255, 255, 0.75) 70%, rgba(237, 221, 83, 0) 100%)",
          }}
        >
          <ChevronDownIcon
            className="w-8 h-6 mt-10 cursor-pointer"
            onClick={scrollToDashboards}
          />
        </div>
      </div>

      <DashboardsSection dashboards={dashboards} count={numberOfDashboards} />
      <MapsSection maps={maps} count={numberOfMaps} />

      <div className="space-y-2 mt-4">
        <DatasetsSection datasets={datasets} />
        <Footer />
      </div>
    </div>
  );
}
