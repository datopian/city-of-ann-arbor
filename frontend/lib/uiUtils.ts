import { BarChart3 } from "lucide-react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import React from "react";

export const getTypeIcon = (type: string) => {
  const className = "w-6 h-6 text-black";
  return type === "dashboard"
    ? React.createElement(BarChart3, { className })
    : React.createElement(CircleStackIcon, { className });
};

export const getTypeBadgeClass = (type: string) => {
  return type === "dashboard"
    ? "bg-[#d2eaef] text-gray-700"
    : "bg-[#d1f1ea] text-gray-700";
};

export const getTypeIconBgColor = (type: string) => {
  return type === "dashboard" ? "bg-[#d0f1e9]" : "bg-[#d2eaef]";
};

export const formatSize = (bytes: number) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${Math.round(kb)} KB`;
  }
  const mb = kb / 1024;
  if (mb < 1024) {
    return `${Math.round(mb)} MB`;
  }
  const gb = mb / 1024;
  return `${Math.round(gb)} GB`;
};

export const getFormatBadge = (format: string) => {
  const classNames: Record<string, { bg: string }> = {
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
    return React.createElement(
      "div",
      {
        className:
          "whitespace-nowrap bg-gray-200 text-gray-600 px-2 h-7 rounded-[5px] text-sm font-normal text-center flex items-center justify-center",
      },
      React.createElement("div", { className: "mt-0.5" }, format)
    );
  return React.createElement(
    "div",
    {
      className: `whitespace-nowrap ${badge.bg} w-12 h-7 rounded-[5px] text-sm font-normal text-gray-600 text-center flex items-center justify-center`,
    },
    React.createElement("div", { className: "mt-0.5" }, format)
  );
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
