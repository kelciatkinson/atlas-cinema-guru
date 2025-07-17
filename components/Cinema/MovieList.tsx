"use client";

import "@/styles/Cinema/styles.css";
import Movie from "@/components/Cinema/Movie";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TitleType } from "@/types";

interface MovieListProps {
  selectedGenres?: string[];
  minYear?: number;
  maxYear?: number;
  searchQuery?: string;
}

export default function MovieList({
  selectedGenres = [],
  minYear = 2000,
  maxYear = 2025,
  searchQuery = "",
}: MovieListProps) {
  const [titles, setTitles] = useState<TitleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function getTitles() {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page: currentPage.toString(),
          minYear: minYear.toString(),
          maxYear: maxYear.toString(),
          query: searchQuery,
          genres: JSON.stringify(selectedGenres),
        });

        const response = await fetch(`/api/titles?${params}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error response:", errorText);

          if (response.status === 401) {
            throw new Error("Please log in to view movies!");
          }
          throw new Error(
            `Failed to fetch titles: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        setTitles(data.titles);
        setHasMore(data.titles.length === 6);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch titles:", error);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    }

    getTitles();
  }, [currentPage, session, selectedGenres, minYear, maxYear, searchQuery]); // Added all filter dependencies

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (titles.length === 0) {
    return <div className="no-results"></div>;
  }

  return (
    <div className="movie-container">
      <div className="movie-list">
        {titles.map((title) => (
          <Movie key={title.id} title={title} />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-button prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-indicator">Page {currentPage}</span>
        <button
          className="pagination-button next"
          onClick={handleNextPage}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
