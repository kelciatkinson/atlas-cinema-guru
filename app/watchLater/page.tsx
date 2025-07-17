"use client";

import "@/styles/Page/styles.css";
import "@/styles/Cinema/styles.css";
import Movie from "@/components/Cinema/Movie";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function WatchLater() {
  const { data: session } = useSession();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getWatchLaterMovies() {
      try {
        // Do nothing if session is still loading
        if (session === undefined) {
          return;
        }

        if (!session?.user?.email) {
          setError("Please log in to view your watch later list");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const response = await fetch(`/api/watch-later?page=${currentPage}`);

        if (!response.ok) {
          const errorData = await response.text();

          if (response.status === 401) {
            throw new Error("Please log in to view your watch later list");
          }
          throw new Error(`Failed to fetch watch later: ${response.status}`);
        }

        const data = await response.json();

        setMovies(data.watchLater);
        setHasMore(data.watchLater.length === 6);
        setLoading(false);
      } catch (error) {
        setError("Failed to load watch later movies. Please try again later.");
        setLoading(false);
      }
    }

    getWatchLaterMovies();
  }, [currentPage, session]);

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

  return (
    <div className="container-movie-list">
      <div>
        <h1 className="page-title">Watch Later</h1>
      </div>

      {loading && currentPage === 1 ? (
        <div className="loading">Loading watch later movies</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : movies.length === 0 ? (
        <div className="no-results"></div>
      ) : (
        <div className="movie-container">
          <div className="movie-list">
            {movies.map((movie, index) => (
              <Movie key={`${movie.id}-${index}`} title={movie} />
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
      )}
    </div>
  );
}
