"use client";
import { useState, useEffect } from "react";
import GenreOption from "./GenreOption";

interface GenreListProps {
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
}

export default function GenreList({
  selectedGenres,
  onGenreChange,
}: GenreListProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data.genres);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Failed to load genres");
        setLoading(false);
      }
    }

    loadGenres();
  }, []);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      // Remove genre
      onGenreChange(selectedGenres.filter((g) => g !== genre));
    } else {
      // Add genre
      onGenreChange([...selectedGenres, genre]);
    }
  };

  const clearAllGenres = () => {
    onGenreChange([]);
  };

  if (loading) return <div className="genre-container">Loading genres...</div>;
  if (error) return <div className="genre-container">{error}</div>;

  return (
    <div className="genre-container">
      <div className="genre-heading">
        <p>Genres</p>
      </div>
      <div className="genre-list">
        {genres.map((genre) => (
          <GenreOption
            key={genre}
            title={genre}
            isSelected={selectedGenres.includes(genre)}
            onToggle={handleGenreToggle}
          />
        ))}
      </div>
    </div>
  );
}
