import { GetServerSideProps } from "next";
import Head from "next/head";
import OrgNavCrumbs from "@/components/organization/individualPage/OrgNavCrumbs";
import OrgInfo from "@/components/organization/individualPage/OrgInfo";
import ActivityStream from "@/components/_shared/ActivityStream";
import Layout from "@/components/_shared/Layout";
import Tabs from "@/components/_shared/Tabs";
import styles from "styles/DatasetInfo.module.scss";
import DatasetList from "@/components/_shared/DatasetList";
import { CKAN } from "@portaljs/ckan";
import { getOrganization } from "@/lib/queries/orgs";
import { getDataset } from "@/lib/queries/dataset";

import HeroSection from "@/components/_shared/HeroSection";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_CKAN_URL;
  const ckan = new CKAN(DMS);
  let orgName = context.params?.org as string;
  if (!orgName) {
    return {
      notFound: true,
    };
  }
  orgName = orgName.includes("@") ? orgName.split("@")[1] : orgName;
  let org = await getOrganization({
    name: orgName as string,
    include_datasets: true,
  });
  if (org.packages) {
    const packagesWithResources = await Promise.all(
      org.packages.map(
        async (dataset) => await getDataset({ name: dataset.name })
      )
    );
    org = { ...org, packages: packagesWithResources };
  }
  const activityStream = await ckan.getOrgActivityStream(org._name);
  if (!org) {
    return {
      notFound: true,
    };
  }
  org = { ...org, activity_stream: activityStream };
  return {
    props: {
      org,
    },
  };
};

export default function OrgPage({ org }): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content: org.packages ? (
        <DatasetList datasets={org.packages ? org.packages : []} />
      ) : (
        ""
      ),
      title: "Datasets",
    },
    {
      id: "activity-stream",
      content: (
        <ActivityStream
          activities={org?.activity_stream ? org.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];
  return (
    <>
      <Head>
        <title>{org.title || org.name + " - Organization Page"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {org && (
        <Layout>
          <HeroSection title={org.title} cols="6" />
          <OrgNavCrumbs
            org={{
              name: org?.name,
              title: org?.title,
            }}
          />
          <div className="grid mt-8 grid-rows-datasetpage-hero">
            <section className="grid row-start-2 row-span-2 col-span-full">
              <div className="custom-container">
                {org && (
                  <main className={styles.main}>
                    <OrgInfo org={org} />
                    <div>
                      <Tabs items={tabs} />
                    </div>
                  </main>
                )}
              </div>
            </section>
          </div>
        </Layout>
      )}
    </>
  );
}
