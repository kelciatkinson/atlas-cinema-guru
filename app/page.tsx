"use client";

import "@/styles/Page/styles.css";
import { useState } from "react";

import Filters from "@/components/Filters";
import GenreList from "@/components/Genres/GenreList";
import MovieList from "@/components/Cinema/MovieList";

export default function Page() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2025);
  const [searchQuery, setSearchQuery] = useState("");

  const handleYearChange = (min: number, max: number) => {
    setMinYear(min);
    setMaxYear(max);
  };

  return (
    <div className="container-home-page">
      <div className="container-filter-genre">
        <Filters
          minYear={minYear}
          maxYear={maxYear}
          searchQuery={searchQuery}
          onYearChange={handleYearChange}
          onSearchChange={setSearchQuery}
        />
        <GenreList
          selectedGenres={selectedGenres}
          onGenreChange={setSelectedGenres}
        />
      </div>
      <div className="container-movie-list">
        <MovieList
          selectedGenres={selectedGenres}
          minYear={minYear}
          maxYear={maxYear}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
