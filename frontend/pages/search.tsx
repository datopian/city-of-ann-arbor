import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SWRConfig, unstable_serialize } from "swr";
import SearchDatasetCard from "@/components/dataset/search/SearchDatasetCard";
import { searchDatasets } from "@/lib/queries/dataset";
import { PackageSearchOptions } from "@portaljs/ckan";
import NavBar from "@/components/_shared/NavBar";
import { Footer } from "@/components/_shared/Footer";
import { FormEvent, useMemo, useState } from "react";
import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ITEMS_PER_PAGE = 5;

export async function getServerSideProps({ query }) {
  const q = query?.q;
  const initialRequestOption: PackageSearchOptions = {
    query: q ?? "",
    offset: 0,
    limit: ITEMS_PER_PAGE,
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
      query: initialRequestOption.query,
    },
  };
}

export function SearchHero({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query);
  const { setValue } = useFormContext();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    setValue("query", searchQuery);
    setValue("offset", 0);
  };
  return (
    <div className="pt-[156px]">
      <div className="mx-auto">
        <div className="flex flex-col lg:items-center gap-y-7 relative h-fit">
          <div className="z-10 max-w-[1128px] mx-auto w-full">
            <h1 className="lg:max-w-[478px] font-bold text-3xl mx-auto text-[40px] lg:text-6xl flex flex-col text-center !leading-snug pb-8 lg:pb-[120px]">
              Search Data
            </h1>
            <div className="w-full p-4 bg-white rounded-lg">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="items-center bg-white border-[2px] border-[#D9D9D9] rounded-[10px] w-full w-full"
              >
                <div className="flex flex-row justify-between gap-4 p-1 lg:p-[7px]">
                  <input
                    id="search-form-input"
                    type="search"
                    name="search"
                    defaultValue={query}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    placeholder="Explore datasets..."
                    aria-label="Explore datasets"
                    className={`w-full py-3 px-4 md:py-3 md:px-4 leading-none placeholder-[#111D43] text-sm lg:text-[19px] ring-0 outline-0`}
                  />
                  <button
                    type="submit"
                    className={`text-sm lg:text-[19px] rounded-[5px] font-bold px-3 py-3 md:px-8 md:py-3 leading-none lg:mt-0 text-white bg-ann-arbor-accent-green transition-all hover:bg-ann-arbor-accent-green/90`}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:absolute lg:bottom-[-15px] lg:left-0 w-full lg:h-[240px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
        </div>
      </div>
    </div>
  );
}

interface SearchFormData {
  query: string;
  groups: string[];
  orgs: string[];
  resFormat: string[];
  tags: string[];
  offset: number;
  limit: number;
  type: string[];
}

export default function DatasetSearch({
  fallback,
  searchFacets,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const form = useForm<SearchFormData>({
    defaultValues: {
      query,
      groups: [],
      orgs: [],
      resFormat: [],
      type: [],
      tags: [],
      offset: 0,
      limit: 5,
    },
  });
  const { control, watch, setValue, handleSubmit, resetField } = form;
  const formData = watch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["datasets", formData],
    queryFn: () => searchDatasets(formData),
  });

  const onSubmit = (data: SearchFormData) => {
    setValue("limit", 5); // Reset to first page on new search
    setValue("offset", 0);
    // Query will refetch due to formData change
  };

  const topics = searchFacets?.groups?.items || [];
  const resFormat = searchFacets?.res_format?.items || [];
  const tags = searchFacets?.tags?.items || [];
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
    formData.type.forEach((type) =>
      filters.push({ type: "type", value: type, label: type })
    );
    formData.resFormat.forEach((format) =>
      filters.push({ type: "resFormat", value: format, label: format })
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
    } else if (type === "groups" || type === "resFormat" || type === "tags") {
      setValue(
        type,
        formData[type].filter((item) => item !== value)
      );
    }
  };
  const handlePageChange = (newPage: number) => {
    const currentOffset = formData.offset;
    setValue("offset", currentOffset + ITEMS_PER_PAGE * (newPage - 1));
  };

  const clearAllFilters = () => {
    setValue("query", "");
    setValue("groups", []);
    setValue("resFormat", []);
    setValue("tags", []);
    setValue("type", []);
  };

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <div
      className={`bg-white rounded-lg p-6 pt-4 pl-0 max-h-[calc(100vh-8.5rem)] overflow-y-auto ${className}`}
    >
      <div className="items-center gap-2 mb-4 hidden lg:flex">
        <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-medium text-gray-800">Filters</h2>
      </div>
      {activeFilters.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-normal text-lg text-gray-800">
              Active filters
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-800 hover:text-teal-800 font-medium flex items-center gap-1"
            >
              Clear all
              <XMarkIcon className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.label}
                variant="secondary"
                className="text-white py-1 px-2 text-base font-normal bg-[#5e98a4] border-0"
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
            title: "Type",
            items: [
              {
                name: "dataset",
                display_name: "Dataset",
              },
              {
                name: "dashboard",
                display_name: "Dashboard",
              },
            ],
            formName: "type" as const,
            value: "type",
          },
          {
            title: `Topics ${
              formData.groups.length > 0 ? `(${formData.groups.length})` : ""
            }`,
            items: topics,
            formName: "groups" as const,
            value: "topics",
          },
          {
            title: "Formats",
            items: resFormat,
            formName: "resFormat" as const,
            value: "resFormat",
          },
          {
            title: "Tags",
            items: tags,
            formName: "tags" as const,
            value: "tags",
          },
        ]
          .filter((i) => i.items.length > 0)
          .map((filterGroup) => (
            <AccordionItem
              key={filterGroup.value}
              value={filterGroup.value}
              className="border-none"
            >
              <AccordionTrigger className="font-normal text-gray-700 hover:text-teal-600 hover:no-underline py-4 text-lg">
                <div className="flex items-center gap-2">
                  {filterGroup.title}
                  {formData[filterGroup.formName].length > 0 && (
                    <div className="w-5 h-4 relative rounded-full">
                      <div className="w-5 h-4 left-0 top-0 absolute bg-neutral-200 rounded-full" />
                      <div className="w-[5px] h-2.5 left-[7px] top-[0px] absolute justify-start text-[#313131] text-xs font-medium font-['Fira_Sans']">
                        {formData[filterGroup.formName].length}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2.5 pb-4">
                {filterGroup.items
                  .filter((i) => i.name)
                  .map((item) => (
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
                              setValue("offset", 0);
                            }}
                            className="data-[state=checked]:bg-teal-600 border-2 border-gray-300 bg-gray-300 data-[state=checked]:border-teal-600 focus:ring-teal-500"
                          />
                          <label
                            htmlFor={`${filterGroup.formName}-${item.name}`}
                            className="text-base font-normal text-gray-600 hover:text-gray-900 cursor-pointer flex-grow"
                          >
                            {item.display_name ? item.display_name : item.name}
                          </label>
                        </div>
                      )}
                    />
                  ))}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );

  const renderPagination = () => {
    if (!data || totalPages <= 1) return null;
    const pageNumbers = [];
    const currentPage = Math.ceil(formData.offset / ITEMS_PER_PAGE) + 1;
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
    }
    return (
      <div className="flex items-center justify-center gap-1 mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="text-gray-700"
        >
          <ArrowLeftIcon className="w-4 h-4" />
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
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(page)}
              className={
                currentPage === page
                  ? "bg-[#489fa9] hover:bg-teal-700 text-white"
                  : "text-gray-700"
              }
            >
              {page}
            </Button>
          )
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="text-gray-700"
        >
          Next
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
    );
  };
  return (
    <div className="">
      <Head>
        <title>City of Ann Arbor Open Data Portal</title>
        <meta name="description" content="City of Ann Arbor Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormProvider {...form}>
        <div className="lg:min-h-screen bg-gradient-to-b from-[#E2F1E4] to-[#FFFFFF] to-10%">
          <NavBar />
          <SearchHero query={query} />
          <div className="space-y-2 lg:mt-4">
            {/* Main Content */}
            <div className="max-w-[1128px] mx-auto px-4 pb-8 flex-grow w-full">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-28 self-start">
                  <FilterSidebar />
                </aside>

                {/* Results */}
                <main className="col-span-1 lg:col-span-3 pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="pl-4 sm:pl-6 text-xl font-medium text-gray-800">
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
                        Error loading datasets: {error.message}. Please try
                        again.
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

        {/* Mobile Filter Drawer */}
        <div className="lg:hidden">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="fixed bottom-4 left-4 z-20 bg-ann-arbor-accent-green hover:bg-ann-arbor-accent-green/90 text-white shadow-lg">
                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                Filter data
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Filter Data</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4 overflow-y-auto">
                <FilterSidebar className="p-0" />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </FormProvider>
    </div>
  );
}
