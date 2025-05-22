"use client";

import { Application } from "@/lib/types";
import { useMemo, useState } from "react";

export function useTableFilters(applications: Application[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterLocation, setFilterLocation] = useState<string>("ALL");

  const uniqueStatuses = useMemo(
    () => [...new Set(applications.map((app) => app.status))],
    [applications]
  );

  const uniqueLocations = useMemo(
    () => [
      ...new Set(
        applications.map((app) =>
          app.remote ? "Remote" : app.location || "not specified"
        )
      ),
    ],
    [applications]
  );

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchedSearch =
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase());

      const applicatioLocation = app.remote
        ? "Remote"
        : app.location || "not specified";

      const matchedStatus =
        filterStatus === "ALL" || app.status === filterStatus;

      const matchedLocation =
        filterLocation === "ALL" || applicatioLocation === filterLocation;

      return matchedSearch && matchedStatus && matchedLocation;
    });
  }, [applications, filterLocation, filterStatus, searchTerm]);
    
    const clearFilters = () => {
        setSearchTerm('');
        setFilterStatus('ALL');
        setFilterLocation('ALL');
    }
    
    return {
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        filterLocation,
        setFilterLocation,
        uniqueStatuses,
        uniqueLocations,
        filteredApplications,
        clearFilters
    }
}
