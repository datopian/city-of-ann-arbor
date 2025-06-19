"use client"

import { useState, useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

interface SearchFormData {
  query: string
  topics: string[]
  formats: string[]
  tags: string[]
  page: number
}

interface DatasetResource {
  format: string
  url: string
  name?: string
}
interface DatasetTag {
  display_name: string
  name: string
}

interface Dataset {
  id: string
  name: string
  title: string
  notes: string
  metadata_created: string
  metadata_modified: string
  resources: DatasetResource[]
  tags: DatasetTag[]
  type: string // 'dataset' or 'dashboard'
  organization?: { title: string }
}

interface CKANResponse {
  success: boolean
  result: {
    count: number
    results: Dataset[]
    search_facets: {
      topics?: { items: Array<{ name: string; count: number }>; title: string }
      formats?: { items: Array<{ name: string; count: number }>; title: string }
      tags?: { items: Array<{ name: string; count: number }>; title: string }
    }
  }
}

const ITEMS_PER_PAGE = 10

// Mock CKAN API function - replace with actual CKAN endpoint
async function searchDatasets(params: SearchFormData): Promise<CKANResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockResults: Dataset[] = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
    id: `dataset-${params.page}-${i}`,
    name: `city-budget-expenditures-fy2024-${params.page}-${i}`,
    title: "City Budget Expenditures by Department – FY2024",
    notes:
      "Detailed breakdown of city expenditures by department and program for the fiscal year 2024. Includes general fund allocations, capital improvements, and grant-funded initiatives.",
    metadata_created: "2020-03-25T10:30:00",
    metadata_modified: "2022-03-22T14:15:00",
    resources: [
      { format: "CSV", url: "#" },
      { format: "PDF", url: "#" },
      { format: "XLS", url: "#" },
    ],
    tags: [
      { display_name: "Tag 1", name: "tag1" },
      { display_name: "Tag 2", name: "tag2" },
      { display_name: "Tag 3", name: "tag3" },
    ],
    type: i % 3 === 0 ? "dashboard" : "dataset",
    organization: { title: "Finance Department" },
  }))

  return {
    success: true,
    result: {
      count: 2365,
      results: mockResults,
      search_facets: {
        topics: {
          title: "Topics",
          items: [
            { name: "Funding & Investment", count: 120 },
            { name: "Innovation", count: 85 },
            { name: "Policy & Evidence", count: 200 },
            { name: "Implementation & Feasibility", count: 50 },
          ],
        },
        formats: {
          title: "Formats",
          items: [
            { name: "CSV", count: 1500 },
            { name: "PDF", count: 800 },
            { name: "XLS", count: 750 },
            { name: "JSON", count: 300 },
          ],
        },
        tags: {
          title: "Tags",
          items: [
            { name: "budget", count: 50 },
            { name: "finance", count: 45 },
            { name: "government", count: 100 },
          ],
        },
      },
    },
  }
}

export default function SearchPage() {
  const [topicsOpen, setTopicsOpen] = useState(true)
  const [formatsOpen, setFormatsOpen] = useState(false)
  const [tagsOpen, setTagsOpen] = useState(false)

  const { control, watch, setValue, handleSubmit, resetField } = useForm<SearchFormData>({
    defaultValues: {
      query: "",
      topics: [],
      formats: [],
      tags: [],
      page: 1,
    },
  })

  const formData = watch()

  const { data, isLoading, error } = useQuery<CKANResponse, Error>({
    queryKey: ["datasets", formData],
    queryFn: () => searchDatasets(formData),
  })

  const topicsList = data?.result?.search_facets?.topics?.items || [
    { name: "Funding & Investment", count: 0 },
    { name: "Innovation", count: 0 },
    { name: "Policy & Evidence", count: 0 },
    { name: "Implementation & Feasibility", count: 0 },
  ]
  const formatsList = data?.result?.search_facets?.formats?.items || [
    { name: "CSV", count: 0 },
    { name: "PDF", count: 0 },
    { name: "XLS", count: 0 },
  ]
  const tagsList = data?.result?.search_facets?.tags?.items || [
    { name: "budget", count: 0 },
    { name: "finance", count: 0 },
    { name: "government", count: 0 },
  ]

  const onSubmit = (data: SearchFormData) => {
    setValue("page", 1) // Reset to first page on new search
    // Query will refetch due to formData change
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getTypeIcon = (type: string) => {
    const className = "w-8 h-8 text-gray-500"
    return type === "dashboard" ? <BarChart3 className={className} /> : <Database className={className} />
  }

  const getTypeBadgeClass = (type: string) => {
    return type === "dashboard" ? "bg-sky-100 text-sky-700 border-sky-300" : "bg-teal-100 text-teal-700 border-teal-300"
  }

  const handlePageChange = (newPage: number) => {
    setValue("page", newPage)
  }

  const totalPages = data?.result?.count ? Math.ceil(data.result.count / ITEMS_PER_PAGE) : 1

  const activeFilters = useMemo(() => {
    const filters = []
    if (formData.query) filters.push({ type: "query", value: formData.query, label: `Keyword: ${formData.query}` })
    formData.topics.forEach((topic) => filters.push({ type: "topics", value: topic, label: topic }))
    formData.formats.forEach((format) => filters.push({ type: "formats", value: format, label: format }))
    formData.tags.forEach((tag) => filters.push({ type: "tags", value: tag, label: tag }))
    return filters
  }, [formData])

  const removeFilter = (type: keyof SearchFormData | "query", value: string) => {
    if (type === "query") {
      setValue("query", "")
    } else if (type === "topics" || type === "formats" || type === "tags") {
      setValue(
        type,
        formData[type].filter((item) => item !== value),
      )
    }
  }

  const clearAllFilters = () => {
    setValue("query", "")
    setValue("topics", [])
    setValue("formats", [])
    setValue("tags", [])
  }

  const renderPagination = () => {
    if (!data || totalPages <= 1) return null
    const pageNumbers = []
    const currentPage = formData.page
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }

      if (startPage > 1) {
        pageNumbers.push(1)
        if (startPage > 2) pageNumbers.push(-1) // Ellipsis
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push(-1) // Ellipsis
        pageNumbers.push(totalPages)
      }
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
              className={currentPage === page ? "bg-teal-600 hover:bg-teal-700 text-white" : "text-gray-700"}
            >
              {page}
            </Button>
          ),
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="text-gray-700"
        >
          Next
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <Image src="/images/ann-arbor-logo.png" alt="City of Ann Arbor Logo" width={50} height={50} />
              <div>
                <div className="font-semibold text-sm text-gray-700">CITY OF</div>
                <div className="font-bold text-lg text-gray-800">ANN ARBOR</div>
                <div className="font-medium text-xs text-gray-500">MICHIGAN</div>
              </div>
            </div>
            <nav className="flex space-x-10 items-center">
              <a href="#" className="text-teal-600 font-semibold border-b-2 border-teal-600 pb-1 text-sm">
                Data
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-600 font-medium pb-1 text-sm">
                Topics
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-600 font-medium pb-1 text-sm flex items-center">
                a2gov
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-gray-100 py-12 md:py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/skyline-background.svg')" }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Search data</h1>
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md"
              >
                <Controller
                  name="query"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Type a keyword..."
                      className="flex-1 h-12 text-md border-none focus:ring-0"
                    />
                  )}
                />
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 h-12 px-6 text-base">
                  <Search className="w-5 h-5 mr-2 sm:hidden" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 self-start">
            {" "}
            {/* Sticky position with top offset */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 max-h-[calc(100vh-8.5rem)] overflow-y-auto">
              {" "}
              {/* Scrollable inner content */}
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              </div>
              {activeFilters.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-700">Active filters</h3>
                    <button onClick={clearAllFilters} className="text-sm text-teal-600 hover:text-teal-800 font-medium">
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
                          onClick={() => removeFilter(filter.type as keyof SearchFormData, filter.value)}
                          className="ml-1.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {[
                {
                  title: `Topics ${formData.topics.length > 0 ? `(${formData.topics.length})` : ""}`,
                  isOpen: topicsOpen,
                  setIsOpen: setTopicsOpen,
                  items: topicsList,
                  formName: "topics" as const,
                },
                {
                  title: "Formats",
                  isOpen: formatsOpen,
                  setIsOpen: setFormatsOpen,
                  items: formatsList,
                  formName: "formats" as const,
                },
                { title: "Tags", isOpen: tagsOpen, setIsOpen: tagsOpen, items: tagsList, formName: "tags" as const },
              ].map((filterGroup) => (
                <Collapsible
                  key={filterGroup.title}
                  open={filterGroup.isOpen}
                  onOpenChange={filterGroup.setIsOpen}
                  className="border-t border-gray-200 py-4 first-of-type:border-t-0 first-of-type:pt-0 last-of-type:pb-0"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
                    <span className="font-semibold text-gray-700 group-hover:text-teal-600">{filterGroup.title}</span>
                    {filterGroup.isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-teal-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-teal-600" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2.5 mt-3">
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
                                  : field.value.filter((v: string) => v !== item.name)
                                field.onChange(newValue)
                              }}
                              className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 focus:ring-teal-500"
                            />
                            <label
                              htmlFor={`${filterGroup.formName}-${item.name}`}
                              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer flex-grow"
                            >
                              {item.name}
                            </label>
                            <span className="text-xs text-gray-400">{item.count}</span>
                          </div>
                        )}
                      />
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {isLoading ? "Loading results..." : `${(data?.result.count || 0).toLocaleString()} results`}
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

            {data && data.result.results.length === 0 && !isLoading && (
              <Card className="border-gray-200">
                <CardContent className="p-10 text-center text-gray-500">
                  No datasets found matching your criteria.
                </CardContent>
              </Card>
            )}

            {data && data.result.results.length > 0 && (
              <div className="space-y-4">
                {data.result.results.map((dataset) => (
                  <Card
                    key={dataset.id}
                    className="hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded flex items-center justify-center mt-1">
                          {getTypeIcon(dataset.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-teal-600 cursor-pointer leading-tight">
                              {dataset.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium ml-0 sm:ml-2 mt-1 sm:mt-0 ${getTypeBadgeClass(dataset.type)}`}
                            >
                              {dataset.type.charAt(0).toUpperCase() + dataset.type.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dataset.notes}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Created: {formatDate(dataset.metadata_created)}
                            </div>
                            <div className="flex items-center gap-1">
                              <RefreshCw className="w-3.5 h-3.5" />
                              Updated: {formatDate(dataset.metadata_modified)}
                            </div>
                            {dataset.tags && dataset.tags.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag className="w-3.5 h-3.5" />
                                {dataset.tags
                                  .slice(0, 3)
                                  .map((tag) => tag.display_name)
                                  .join(", ")}
                                {dataset.tags.length > 3 && "..."}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {dataset.resources.map((resource, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100 cursor-pointer py-0.5 px-2"
                              >
                                {resource.format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {renderPagination()}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12 mt-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/images/ann-arbor-logo-white.png" alt="City of Ann Arbor Logo" width={40} height={40} />
                <div>
                  <div className="font-semibold text-sm text-slate-400">CITY OF</div>
                  <div className="font-bold text-lg text-white">ANN ARBOR</div>
                  <div className="font-medium text-xs text-slate-400">MICHIGAN</div>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <p>Address: 301 E. Huron St.</p>
                <p>Ann Arbor, MI 48104</p>
                <p>Contact: 734.794.6000</p>
                <p>
                  <a href="#" className="hover:text-white underline">
                    Contact Us
                  </a>
                </p>
              </div>
              <div className="mt-6">
                <p className="font-semibold text-white mb-2">Get Updates from the City</p>
                <div className="flex space-x-3">
                  {[Facebook, Twitter, Instagram, Linkedin, Landmark, MessageSquare, Youtube, Users].map((Icon, i) => (
                    <a key={i} href="#" className="text-slate-400 hover:text-white">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                {["Organizations", "Contact", "Departments"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Learn more</h3>
              <ul className="space-y-2 text-sm">
                {["Open Data Policy", "Data Governance", "Accessibility"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Useful links</h3>
              <ul className="space-y-2 text-sm">
                {["City Website", "Report an Issue", "Public Meetings"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-sm text-center text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <span>
                Powered by{" "}
                <a href="#" className="font-semibold text-teal-400 hover:text-teal-300">
                  Portal.js
                </a>{" "}
                from <span className="font-semibold text-slate-200">DATAPLAN</span>
              </span>
              <Image src="/images/dataplan-logo.png" alt="DATAPLAN Logo" width={24} height={24} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
