import { Dataset } from "@portaljs/ckan";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowPathIcon,
  ClockIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Link from "next/link";
import { getTypeIcon, getTypeBadgeClass, getTypeIconBgColor, getFormatBadge, formatDate } from "@/lib/uiUtils";

interface SearchDatasetCardProps {
  dataset: Dataset;
}

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
