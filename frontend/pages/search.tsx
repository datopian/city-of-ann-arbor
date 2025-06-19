import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "@/components/_shared/Layout";
import DatasetSearchForm from "@/components/dataset/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/dataset/search/DatasetSearchFilters";
import ListOfDatasets from "@/components/dataset/search/ListOfDatasets";
import { searchDatasets } from "@/lib/queries/dataset";
import HeroSection from "@/components/_shared/HeroSection";
import { SearchStateProvider } from "@/components/dataset/search/SearchContext";
import { PackageSearchOptions } from "@portaljs/ckan";
import NavBar from "@/components/_shared/NavBar";
import SearchForm from "@/components/home/SearchForm";
import { Footer } from "@/components/_shared/Footer";
import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  BarChart3,
  Database,
  Search,
  ExternalLink,
  RefreshCw,
  Tag,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Landmark,
  MessageSquare,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

export async function getServerSideProps() {
  const initialRequestOption: PackageSearchOptions = {
    offset: 0,
    limit: 10,
    tags: [],
    groups: [],
    orgs: [],
    resFormat: [],
  };

  const search_result = await searchDatasets(initialRequestOption);

  return {
    props: {
      fallback: {
        [unstable_serialize(["package_search", initialRequestOption])]:
          search_result,
      },
      searchFacets: {
        ...search_result.search_facets,
      },
    },
  };
}

export function SearchHero() {
  return (
    <div className="pt-[156px]">
      <div className="mx-auto">
        <div className="flex flex-col lg:items-center gap-y-7 relative">
          <div className="z-10 max-w-[1128px] mx-auto w-full">
            <h1 className="lg:max-w-[478px] font-bold text-3xl mx-auto text-[40px] lg:text-6xl flex flex-col text-center !leading-snug pb-[120px]">
              Search Data
            </h1>
            <div className="w-full p-4 bg-white rounded-lg">
              <SearchForm />
            </div>
          </div>
          <div className="lg:absolute lg:bottom-[-15px] lg:left-0 w-full h-[240px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
        </div>
      </div>
    </div>
  );
}

interface SearchFormData {
  query: string;
  groups: string[];
  orgs: string[];
  formats: string[];
  tags: string[];
  offset: number;
  limit: number;
}

export default function DatasetSearch({
  fallback,
  searchFacets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  console.log("SEARCH FACETS", searchFacets);
  const { control, watch, setValue, handleSubmit, resetField } =
    useForm<SearchFormData>({
      defaultValues: {
        query: "",
        groups: [],
        orgs: [],
        formats: [],
        tags: [],
        offset: 0,
        limit: 10,
      },
    });
  const formData = watch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["datasets", formData],
    queryFn: () => searchDatasets(formData),
  });
  return (
    <div className="">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta name="description" content="City of Ann Arbor Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:min-h-screen bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-25%">
        <NavBar />
        <SearchHero />
      </div>
      <div className="space-y-2 mt-4">
        <Footer />
      </div>
    </div>
  );
}
