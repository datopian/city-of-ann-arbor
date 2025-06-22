import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "@/components/_shared/Layout";
import DatasetSearchForm from "@/components/dataset/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/dataset/search/DatasetSearchFilters";
import ListOfDatasets from "@/components/dataset/search/ListOfDatasets";
import SearchDatasetCard from "@/components/dataset/search/SearchDatasetCard";
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
  Search,
  ExternalLink,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

  const onSubmit = (data: SearchFormData) => {
    setValue("limit", 10); // Reset to first page on new search
    setValue("offset", 0);
    // Query will refetch due to formData change
  };

  const topics = searchFacets?.groups?.items || [];
  const formats = searchFacets?.res_format?.items || [];
  const tags = searchFacets?.tags?.items || [];
  const ITEMS_PER_PAGE = 10;
  const totalPages = data?.count ? Math.ceil(data.count / ITEMS_PER_PAGE) : 1;

  const activeFilters = useMemo(() => {
    const filters = [];
    if (formData.query)
      filters.push({
        type: "query",
        value: formData.query,
        label: `Keyword: ${formData.query}`,
      });
    formData.groups.forEach((topic) =>
      filters.push({ type: "topics", value: topic, label: topic })
    );
    formData.formats.forEach((format) =>
      filters.push({ type: "formats", value: format, label: format })
    );
    formData.tags.forEach((tag) =>
      filters.push({ type: "tags", value: tag, label: tag })
    );
    return filters;
  }, [formData]);

  const removeFilter = (
    type: keyof SearchFormData | "query",
    value: string
  ) => {
    if (type === "query") {
      setValue("query", "");
    } else if (type === "groups" || type === "formats" || type === "tags") {
      setValue(
        type,
        formData[type].filter((item) => item !== value)
      );
    }
  };
  const handlePageChange = (newPage: number) => {
    setValue("offset", newPage * ITEMS_PER_PAGE);
  };

  const clearAllFilters = () => {
    setValue("query", "");
    setValue("groups", []);
    setValue("formats", []);
    setValue("tags", []);
  };

  const renderPagination = () => {
    if (!data || totalPages <= 1) return null;
    const pageNumbers = [];
    const currentPage = formData.offset / ITEMS_PER_PAGE + 1;
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push(-1); // Ellipsis
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push(-1); // Ellipsis
        pageNumbers.push(totalPages);
      }
      return (
        <div className="flex items-center justify-center gap-1 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-700"
          >
            Prev
          </Button>
          {pageNumbers.map((page, index) =>
            page === -1 ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "text-gray-700"
                }
              >
                {page}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="text-gray-700"
          >
            Next
          </Button>
        </div>
      );
    }
  };
  return (
    <div className="">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta name="description" content="City of Ann Arbor Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:min-h-screen bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-10%">
        <NavBar />
        <SearchHero />
        <div className="space-y-2 mt-4">
          {/* Main Content */}
          <div className="max-w-[1128px] mx-auto px-4 pb-8 flex-grow w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <aside className="lg:col-span-1 lg:sticky lg:top-28 self-start">
                {" "}
                {/* Sticky position with top offset */}
                <div className="bg-white rounded-lg p-6 pt-0 pl-0 max-h-[calc(100vh-8.5rem)] overflow-y-auto">
                  {" "}
                  {/* Scrollable inner content */}
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Filters
                    </h2>
                  </div>
                  {activeFilters.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-700">
                          Active filters
                        </h3>
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeFilters.map((filter) => (
                          <Badge
                            key={filter.label}
                            variant="secondary"
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 py-1 px-2 text-xs"
                          >
                            {filter.label}
                            <button
                              onClick={() =>
                                removeFilter(
                                  filter.type as keyof SearchFormData,
                                  filter.value
                                )
                              }
                              className="ml-1.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <Accordion type="multiple" className="w-full">
                    {[
                      {
                        title: `Topics ${
                          formData.groups.length > 0
                            ? `(${formData.groups.length})`
                            : ""
                        }`,
                        items: topics,
                        formName: "groups" as const,
                        value: "topics",
                      },
                      {
                        title: "Formats",
                        items: formats,
                        formName: "formats" as const,
                        value: "formats",
                      },
                      {
                        title: "Tags",
                        items: tags,
                        formName: "tags" as const,
                        value: "tags",
                      },
                    ].map((filterGroup) => (
                      <AccordionItem
                        key={filterGroup.value}
                        value={filterGroup.value}
                        className="border-t border-gray-200 first-of-type:border-t-0"
                      >
                        <AccordionTrigger className="font-semibold text-gray-700 hover:text-teal-600 hover:no-underline py-4">
                          {filterGroup.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2.5 pb-4">
                          {filterGroup.items.map((item) => (
                            <Controller
                              key={item.name}
                              name={filterGroup.formName}
                              control={control}
                              render={({ field }) => (
                                <div className="flex items-center space-x-2.5">
                                  <Checkbox
                                    id={`${filterGroup.formName}-${item.name}`}
                                    checked={field.value.includes(item.name)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, item.name]
                                        : field.value.filter(
                                            (v: string) => v !== item.name
                                          );
                                      field.onChange(newValue);
                                    }}
                                    className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 focus:ring-teal-500"
                                  />
                                  <label
                                    htmlFor={`${filterGroup.formName}-${item.name}`}
                                    className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer flex-grow"
                                  >
                                    {item.name}
                                  </label>
                                  <span className="text-xs text-gray-400">
                                    {item.count}
                                  </span>
                                </div>
                              )}
                            />
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </aside>

              {/* Results */}
              <main className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="pl-4 sm:pl-6 text-lg font-semibold text-gray-800">
                    {isLoading
                      ? "Loading results..."
                      : `${(data?.count || 0).toLocaleString()} results`}
                  </h2>
                  {/* Add sort dropdown here if needed */}
                </div>

                {isLoading && (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i} className="animate-pulse border-gray-200">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex gap-4">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                              <div className="flex gap-2 mt-2">
                                <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                                <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {error && (
                  <Card className="border-red-300 bg-red-50">
                    <CardContent className="p-6 text-center text-red-700">
                      Error loading datasets: {error.message}. Please try again.
                    </CardContent>
                  </Card>
                )}

                {data && data.results.length === 0 && !isLoading && (
                  <Card className="border-gray-200">
                    <CardContent className="p-10 text-center text-gray-500">
                      No datasets found matching your criteria.
                    </CardContent>
                  </Card>
                )}

                {data && data.results.length > 0 && (
                  <div className="space-y-4">
                    {data.results.map((dataset) => (
                      <SearchDatasetCard key={dataset.id} dataset={dataset} />
                    ))}
                  </div>
                )}
                {renderPagination()}
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
