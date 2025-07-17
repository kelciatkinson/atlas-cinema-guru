"use client";
import { useState, useEffect } from "react";
import Input from "./Input";
import "@/styles/Filters/styles.css";

interface FiltersProps {
  minYear: number;
  maxYear: number;
  searchQuery: string;
  onYearChange: (minYear: number, maxYear: number) => void;
  onSearchChange: (query: string) => void;
}

export default function Filters({
  minYear,
  maxYear,
  searchQuery,
  onYearChange,
  onSearchChange,
}: FiltersProps) {
  const [minYearInput, setMinYearInput] = useState(minYear.toString());
  const [maxYearInput, setMaxYearInput] = useState(maxYear.toString());

  // Update local state when props change
  useEffect(() => {
    setMinYearInput(minYear.toString());
    setMaxYearInput(maxYear.toString());
  }, [minYear, maxYear]);

  const handleMinYearEnter = (value: string) => {
    const year = parseInt(value);

    if (!isNaN(year) && year >= 1900 && year <= new Date().getFullYear()) {
      onYearChange(year, maxYear);
    } else {
      setMinYearInput(minYear.toString());
    }
  };

  const handleMaxYearEnter = (value: string) => {
    const year = parseInt(value);

    if (!isNaN(year) && year >= 1900 && year <= new Date().getFullYear()) {
      onYearChange(minYear, year);
    } else {
      setMaxYearInput(maxYear.toString());
    }
  };

  const handleSearchEnter = (value: string) => {
    onSearchChange(value);
  };

  return (
    <div className="container-filter">
      <div className="search-movies">
        <p>Search</p>
        <Input
          placeholder="Search Movies"
          value={searchQuery}
          onChange={onSearchChange}
          onEnter={handleSearchEnter}
        />
      </div>
      <div className="min-max-year">
        <div className="min-year">
          <h1>Min Year</h1>
          <Input
            placeholder="Min Year"
            value={minYearInput}
            onChange={setMinYearInput}
            onEnter={handleMinYearEnter}
          />
        </div>
        <div className="max-year">
          <h1>Max Year</h1>
          <Input
            placeholder="Max Year"
            value={maxYearInput}
            onChange={setMaxYearInput}
            onEnter={handleMaxYearEnter}
          />
        </div>
      </div>
    </div>
  );
}
