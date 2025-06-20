import { Dataset } from "@portaljs/ckan";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  RefreshCw,
  Tag,
  BarChart3,
  Database,
} from "lucide-react";

interface SearchDatasetCardProps {
  dataset: Dataset;
}

const getTypeIcon = (type: string) => {
  const className = "w-8 h-8 text-gray-500";
  return type === "dashboard" ? (
    <BarChart3 className={className} />
  ) : (
    <Database className={className} />
  );
};

const getTypeBadgeClass = (type: string) => {
  return type === "dashboard"
    ? "bg-sky-100 text-sky-700 border-sky-300"
    : "bg-teal-100 text-teal-700 border-teal-300";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function SearchDatasetCard({ dataset }: SearchDatasetCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200">
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
                className={`text-xs font-medium ml-0 sm:ml-2 mt-1 sm:mt-0 ${getTypeBadgeClass(
                  dataset.type
                )}`}
              >
                {dataset.type.charAt(0).toUpperCase() + dataset.type.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {dataset.notes}
            </p>
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
  );
}