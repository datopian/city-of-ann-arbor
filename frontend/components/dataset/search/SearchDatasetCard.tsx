import { Dataset } from "@portaljs/ckan";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, RefreshCw, Tag, BarChart3, Database } from "lucide-react";
import {
  ArrowPathIcon,
  CircleStackIcon,
  ClockIcon,
  HashtagIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Link from "next/link";

interface SearchDatasetCardProps {
  dataset: Dataset;
}

const getTypeIcon = (type: string) => {
  const className = "w-6 h-6 text-black";
  return type === "dashboard" ? (
    <BarChart3 className={className} />
  ) : (
    <CircleStackIcon className={className} />
  );
};

const getTypeBadgeClass = (type: string) => {
  return type === "dashboard"
    ? "bg-[#d2eaef] text-gray-700"
    : "bg-[#d1f1ea] text-gray-700";
};

const getFormatBadge = (format: string) => {
  const classNames = {
    CSV: {
      bg: "bg-[#d9efd2]",
    },
    PDF: {
      bg: "bg-[#d2eaef]",
    },
    XLS: {
      bg: "bg-[#d1f1ea]",
    },
  };
  if (format === "") return null;
  const badge = classNames[format.toUpperCase()];
  if (!badge)
    return (
      <div className="whitespace-nowrap bg-gray-200 text-gray-600 px-2 h-7 rounded-[5px] text-sm font-normal text-center flex items-center justify-center">
        <div className="mt-0.5">{format}</div>
      </div>
    );
  return (
    <div
      className={`whitespace-nowrap ${badge.bg} w-12 h-7 rounded-[5px] rounded-[5px] text-sm font-normal text-gray-600 text-center flex items-center justify-center`}
    >
      <div className="mt-0.5">{format}</div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getTypeIconBgColor = (type: string) => {
  return type === "dashboard" ? "bg-[#d0f1e9]" : "bg-[#d2eaef]";
};

export default function SearchDatasetCard({ dataset }: SearchDatasetCardProps) {
  return (
    <Link href={`/${dataset.organization.name}/${dataset.name}`}>
      <Card className="group border-0 hover:border-1 shadow-none border-gray-200 cursor-pointer ">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 ${getTypeIconBgColor(
                dataset.type
              )} rounded-[5px] flex items-center justify-center mt-1`}
            >
              {getTypeIcon(dataset.type)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row sm:items-start gap-x-2 mb-1">
                <h3 className="group-hover:text-teal-600 cursor-pointer leading-tight text-black text-2xl font-bold transition-colors duration-200">
                  {dataset.title}
                </h3>
                <Badge
                  variant="outline"
                  className={`w-fit text-[#3f3f3f] mt-1 text-sm font-normal border-0 ${getTypeBadgeClass(
                    dataset.type
                  )}`}
                >
                  {dataset.type}
                </Badge>
              </div>
              <p className="text-sm font-normal text-black mb-3 mt-2 line-clamp-2">
                {dataset.notes}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-normal text-black mb-3">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 mb-0.5" />
                  Created {formatDate(dataset.metadata_created)}
                </div>
                <div className="flex items-center gap-1">
                  <ArrowPathIcon className="w-4 h-4 mb-0.5" />
                  Updated {formatDate(dataset.metadata_modified)}
                </div>
                {dataset.tags && dataset.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <HashtagIcon className="w-4 h-4 mb-0.5" />
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
                  <Fragment key={resource.id}>
                    {getFormatBadge(resource.format)}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
