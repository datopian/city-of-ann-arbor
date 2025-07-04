import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { unstable_serialize } from "swr";
import NavBar from "@/components/_shared/NavBar";
import { Footer } from "@/components/_shared/Footer";
import { FormEvent, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { searchGroups } from "@/lib/queries/groups";
import { GroupSearchCard } from "@/components/groups/GroupSearchCard";

export async function getServerSideProps({ query }) {
  const q = query?.q;

  const groups = await searchGroups({ q });

  return {
    props: {
      fallback: {
        [unstable_serialize(["group_search", q])]: groups,
      },
      query: q ?? "",
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
    setValue("q", searchQuery);
  };
  return (
    <div className="pt-[156px]">
      <div className="mx-auto">
        <div className="flex flex-col lg:items-center gap-y-7 relative h-fit">
          <div className="z-10 max-w-[1128px] mx-auto w-full">
            <h1 className="lg:max-w-[478px] font-bold text-3xl mx-auto text-[40px] lg:text-6xl flex flex-col text-center !leading-snug pb-8 lg:pb-[120px]">
              Topics
            </h1>
            <div className="hidden md:block h-[97px]"></div> {/* NOTE: this compensates the height of the search input commeneted below */}
            {/*<div className="w-full p-4 bg-white rounded-lg">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="items-center bg-white border-[2px] border-[#D9D9D9] rounded-[10px] w-full w-full"
              >
                <div className="flex flex-row justify-between gap-4 p-1 lg:p-[7px]">
                  <input
                    data-cy="search-form-input"
                    type="search"
                    name="search"
                    defaultValue={query}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    placeholder="Search..."
                    aria-label="Search topics"
                    className={`w-full py-3 px-4 md:py-3 md:px-4 leading-none placeholder-[#111D43] text-sm lg:text-[19px] ring-0 outline-0`}
                  />
                  <button
                    type="submit"
                    data-cy="search-submit-button"
                    className={`text-sm lg:text-[19px] rounded-[5px] font-bold px-3 py-3 md:px-8 md:py-3 leading-none lg:mt-0 text-white bg-ann-arbor-accent-green transition-all hover:bg-ann-arbor-accent-green/90`}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>*/}
          </div>
          <div className="lg:absolute lg:bottom-[-15px] lg:left-0 w-full lg:h-[240px] lg:bg-[url('/images/bg-image.png')] bg-contain"></div>
        </div>
      </div>
    </div>
  );
}

interface SearchFormData {
  q: string;
}

export default function TopicsSearch({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const form = useForm<SearchFormData>({
    defaultValues: {
      q: query,
    },
  });
  const { watch } = form;
  const formData = watch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["group_search", formData],
    queryFn: () => searchGroups(formData),
  });

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
          <div className="space-y-2 lg:mt-4 bg-gradient-to-t from-[#E2F1E4] to-[#FFFFFF] to-65% pb-28">
            {/* Main Content */}
            <div className="max-w-[1128px] mx-auto px-4 pb-8 flex-grow w-full">
              <div className="">
                {/* Results */}
                <main className="col-span-1 lg:col-span-3 pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[22px] font-medium text-gray-800">
                      {isLoading
                        ? "Loading topics..."
                        : `${(
                            data?.result.length || 0
                          ).toLocaleString()} topics`}
                    </h2>
                    {/* Add sort dropdown here if needed */}
                  </div>

                  {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i} className="animate-pulse border-gray-200">
                          <CardContent className="p-4 sm:p-9">
                            <div className="flex flex-col gap-4">
                              <div className="w-[80px] h-[80px] bg-gray-200 rounded"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-6 bg-gray-200 rounded w-3/4 !mb-4"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                <div className="flex gap-2 !mt-4">
                                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
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
                        Error loading topics: {error.message}. Please try again.
                      </CardContent>
                    </Card>
                  )}

                  {data && data.result.length === 0 && !isLoading && (
                    <Card className="border-gray-200">
                      <CardContent className="p-10 text-center text-gray-500">
                        No topics found matching your query.
                      </CardContent>
                    </Card>
                  )}

                  {data && data.result.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {data.result.map((group, i) => (
                        <GroupSearchCard
                          key={`group-card-${group.id}`}
                          group={group}
                          index={i}
                        />
                      ))}
                    </div>
                  )}
                </main>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </FormProvider>
    </div>
  );
}
