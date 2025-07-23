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
    <Link
      href={`/${dataset.organization.name}/${dataset.name}`}
      data-cy={`dataset-card-${dataset.id}`}
    >
      <Card className="group border-0 hover:border-1 shadow-none border-gray-200 cursor-pointer ">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 ${getTypeIconBgColor(
                dataset.ann_arbor_dataset_type
              )} rounded-[5px] flex items-center justify-center mt-1 relative border-4 border-ann-arbor-dataset-type-accent-${
                dataset.ann_arbor_dataset_type
              }`}
            >
              {dataset.ann_arbor_dataset_type == "dataset" ? (
                getTypeIcon(dataset.ann_arbor_dataset_type)
              ) : !!dataset.image_url ? (
                <Image
                  src={dataset.image_url}
                  alt="Dashboard Thumbnail"
                  fill={true}
                  className={`object-cover object-center ${getTypeIconBgColor(
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
                  {dataset.ann_arbor_dataset_type == "dashboard" && (
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
                  {dataset.ann_arbor_dataset_type == "map" && (
                    <svg
                      width="24"
                      height="27"
                      viewBox="0 0 24 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_487_782)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.46956 8.3941L0.992188 10.0331V25.6021L6.82654 24.1313C7.77299 22.2419 5.99773 19.1371 4.81665 17.0716C4.56086 16.6243 4.33215 16.2243 4.16218 15.8915C4.15715 15.8826 4.15272 15.8732 4.14895 15.8634L4.14962 15.8631C3.29163 13.6384 4.23371 13.1735 5.10404 12.7441C5.71499 12.4427 6.2807 12.1635 5.73082 10.9028C5.26593 9.83712 5.34128 8.93413 5.46956 8.3941Z"
                          fill="#079A6D"
                        />
                        <path
                          d="M15.3979 10.9869C15.4468 11.3314 15.4358 11.8774 15.1265 12.5983C14.7488 13.4785 14.6885 14.1723 14.9985 14.7252C15.2839 15.234 15.8294 15.4887 16.1919 15.6705C16.5704 15.8604 16.7723 15.9795 16.8745 16.1832C16.9681 16.3698 17.0345 16.7665 16.7017 17.6539C16.0956 18.8828 15.3898 21.1603 15.1919 23.3502C15.1112 24.2433 15.1152 25.1474 15.2524 25.9781L8.41064 23.3121L8.26221 23.2535L8.10693 23.2926L7.99756 23.3199C8.09559 22.316 7.82881 21.2361 7.44482 20.2311C6.94386 18.92 6.20207 17.6244 5.62256 16.611C5.37337 16.1751 5.1582 15.7987 4.99951 15.4899C4.6748 14.6312 4.74428 14.2517 4.83447 14.0758C4.93537 13.8792 5.13559 13.7626 5.51416 13.5758C5.87632 13.3971 6.42372 13.1461 6.71045 12.6422C7.02364 12.0916 6.96 11.4017 6.58057 10.5319C6.20646 9.674 6.27935 8.97719 6.37451 8.59436L7.79932 8.07288L15.3979 10.9869Z"
                          fill="#009D6D"
                          stroke="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M23.0076 23.96V7.72211L22.283 8.01936C22.2118 8.19337 22.1369 8.36505 22.0611 8.53303C21.8172 9.07377 21.5477 9.60483 21.2701 10.129C20.9661 10.7029 20.6499 11.2701 20.3312 11.836C20.0829 12.277 19.8296 12.7174 19.5909 13.1635L19.213 13.8701L18.8351 13.1635C18.5965 12.7174 18.3431 12.277 18.0948 11.836C17.7762 11.2701 17.4599 10.7029 17.156 10.129L17.1532 10.1239L16.2398 10.4986C16.3712 10.9749 16.464 11.835 15.9798 12.9631C15.4274 14.2506 15.9943 14.535 16.6066 14.8421C17.4758 15.278 18.4168 15.75 17.561 18.0059L17.3767 17.9366L17.5613 18.0066C17.5564 18.0197 17.5503 18.0319 17.5432 18.0434C16.9811 19.1731 16.3042 21.3427 16.1153 23.4339C15.9955 24.7603 16.0723 26.0481 16.5021 27L23.0076 23.96Z"
                          fill="#079A6D"
                        />
                      </g>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.2979 0C21.7227 0 23.8694 2.37966 23.1638 4.79847C22.5713 6.82918 20.2201 10.401 19.2979 12C18.3861 10.4188 16.0767 6.90841 15.4526 4.86689C14.7054 2.42288 16.8176 0 19.2979 0ZM19.3 2.09701C20.4434 2.09701 21.3703 2.9567 21.3703 4.01721C21.3703 5.07772 20.4434 5.93734 19.3 5.93734C18.1567 5.93734 17.2298 5.07772 17.2298 4.01721C17.2298 2.9567 18.1567 2.09701 19.3 2.09701Z"
                        fill="#3F3F3F"
                      />
                      <defs>
                        <clipPath id="clip0_487_782">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 3)"
                          />
                        </clipPath>
                      </defs>
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
                  <div
                    className="flex items-center gap-1"
                    data-cy={`dataset-card-tag-${dataset.id}`}
                  >
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
