"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";

interface TableControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  onExport: () => void;
}

export default function TableControls({
  searchTerm,
  onSearchChange,
  onToggleFilters,
  onExport,
}: TableControlsProps) {
  return (
    <section className="flex flex-col sm:flex-row gap-4 items-center justify-between ">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            className="absolute left-3  transform translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search your applications"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-700 placeholder-gray-400 dark:placeholder-gray-300"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={"outline"}
          onClick={onToggleFilters}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
        </Button>
        <Button
          variant="outline"
          onClick={onExport}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export CSV
        </Button>
      </div>
    </section>
  );
}
