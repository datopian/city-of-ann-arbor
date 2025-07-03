import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowPathIcon,
  ClockIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Link from "next/link";
import {
  getTypeIcon,
  getTypeBadgeClass,
  getTypeIconBgColor,
  getFormatBadge,
  formatDate,
} from "@/lib/uiUtils";
import { Dataset } from "@/types/ckan";
import Image from "next/image";
import fallbackImage from "../../../public/images/dashboard-fallback.jpg";

interface SearchDatasetCardProps {
  dataset: Dataset;
}

export default function SearchDatasetCard({ dataset }: SearchDatasetCardProps) {
  return (
    <Link href={`/${dataset.organization.name}/${dataset.name}`} data-cy={`dataset-card-${dataset.id}`}>
      <Card className="group border-0 hover:border-1 shadow-none border-gray-200 cursor-pointer ">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 ${getTypeIconBgColor(
                dataset.ann_arbor_dataset_type
              )} rounded-[5px] flex items-center justify-center mt-1 relative`}
            >
              {dataset.ann_arbor_dataset_type == "dataset" ? (
                getTypeIcon(dataset.ann_arbor_dataset_type)
              ) : !!dataset.image_url ? (
                <Image
                  src={dataset.image_url}
                  alt="Dashboard Thumbnail"
                  fill={true}
                  className={`mix-blend-luminosity object-contain object-center opacity-50 ${getTypeIconBgColor(
                    dataset.ann_arbor_dataset_type
                  )}`}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage.src;
                  }}
                />
              ) : (
                getTypeIcon(dataset.ann_arbor_dataset_type)
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row sm:items-start gap-x-2 mb-1">
                <h3 className="group-hover:text-teal-600 cursor-pointer leading-tight text-black text-2xl font-bold transition-colors duration-200 flex items-center gap-x-2">
                  {dataset.ann_arbor_dataset_type != "dataset" && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 13.125C3 12.504 3.504 12 4.125 12H6.375C6.996 12 7.5 12.504 7.5 13.125V19.875C7.5 20.496 6.996 21 6.375 21H4.125C3.82663 21 3.54048 20.8815 3.3295 20.6705C3.11853 20.4595 3 20.1734 3 19.875V13.125Z"
                        fill="#079A6D"
                        stroke="#079A6D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.875 7.5C11.254 7.5 10.75 8.004 10.75 8.625V19.875C10.75 20.1734 10.8685 20.4595 11.0795 20.6705C11.2905 20.8815 11.5766 21 11.875 21H14.125C14.746 21 15.25 20.496 15.25 19.875V8.625C15.25 8.004 14.746 7.5 14.125 7.5H11.875Z"
                        fill="#0787AD"
                        stroke="#0787AD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.625 3C19.004 3 18.5 3.504 18.5 4.125V19.875C18.5 20.1734 18.6185 20.4595 18.8295 20.6705C19.0405 20.8815 19.3266 21 19.625 21H21.875C22.496 21 23 20.496 23 19.875V4.125C23 3.504 22.496 3 21.875 3H19.625Z"
                        fill="#8289AD"
                        stroke="#8289AD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                  {dataset.title}
                </h3>
                <Badge
                  data-cy={`dataset-card-badge-${dataset.id}`}
                  variant="outline"
                  className={`w-fit text-[#3f3f3f] mt-1 text-sm font-normal border-0 ${getTypeBadgeClass(
                    dataset.ann_arbor_dataset_type
                  )}`}
                >
                  {dataset.ann_arbor_dataset_type}
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
                  <div className="flex items-center gap-1" data-cy={`dataset-card-tag-${dataset.id}`}>
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
                {[
                  ...(new Set(dataset.resources.map((r) => r.format)) ?? []),
                ].map((format, index) => (
                  <Fragment key={`r-${dataset.id}-format-${format}`}>
                    {getFormatBadge(format)}
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
