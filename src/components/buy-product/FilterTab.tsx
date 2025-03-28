"use client";

import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/types";

interface FilterTabsProps {
  selectedTab: ProductStatus | "all";
  onSelectTab: (tab: ProductStatus | "all") => void;
  counts: {
    all: number;
    pending: number;
    confirm: number;
    cancel: number;
  };
}

export default function FilterTabs({
  selectedTab,
  onSelectTab,
  counts,
}: FilterTabsProps) {
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "confirm", label: "Confirm", count: counts.confirm },
    { id: "cancel", label: "Cancel", count: counts.cancel },
  ];

  return (
    <div className='flex space-x-2'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelectTab(tab.id as ProductStatus | "all")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
            selectedTab === tab.id
              ? tab.id === "all"
                ? "bg-gray-800 text-white"
                : tab.id === "pending"
                ? "bg-blue-100 text-blue-600"
                : tab.id === "confirm"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
              : "bg-white text-gray-600 hover:bg-gray-100"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
