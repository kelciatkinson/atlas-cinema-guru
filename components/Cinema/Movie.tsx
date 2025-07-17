"use client";

import "@/styles/Cinema/styles.css";

import Image from "next/image";
import PlaceholderSVG from "@/assets/placeholder.svg";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { TitleType } from "@/lib/types";

const StarIcon = ({ color = "currentColor" }) => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9307 6.47966C15.4246 4.9595 17.5753 4.9595 18.0692 6.47966L19.834 11.9111C20.0549 12.591 20.6884 13.0512 21.4032 13.0512H27.1142C28.7126 13.0512 29.3772 15.0966 28.0841 16.0361L23.4638 19.393C22.8855 19.8131 22.6435 20.5579 22.8644 21.2377L24.6292 26.6692C25.1231 28.1893 23.3832 29.4534 22.0901 28.5139L17.4698 25.1571C16.8915 24.7369 16.1084 24.7369 15.5301 25.1571L10.9098 28.5139C9.61671 29.4534 7.87682 28.1893 8.37075 26.6692L10.1355 21.2377C10.3564 20.5579 10.1144 19.8131 9.53614 19.393L4.91586 16.0361C3.62273 15.0966 4.28731 13.0512 5.88571 13.0512H11.5967C12.3115 13.0512 12.945 12.591 13.1659 11.9111L14.9307 6.47966Z"
      fill={color}
    />
  </svg>
);

const ClockIcon = ({ color = "currentColor" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L15.5355 16.9497C15.9261 17.3403 16.5592 17.3403 16.9497 16.9497C17.3403 16.5592 17.3403 15.9261 16.9497 15.5355L13 11.5858V6Z"
      fill={color}
    />
  </svg>
);

export default function Movie({ title }: { title: TitleType }) {
  const [isFavorite, setIsFavorite] = useState(title.favorited || false);
  const [isWatchLater, setIsWatchLater] = useState(title.watchLater || false);
  const { data: session } = useSession();

  const handleWatchLater = async () => {
    try {
      if (!session?.user?.email) {
        alert("Please log in to add to your Watch Later list");
        return;
      }

      const method = isWatchLater ? "DELETE" : "POST";
      const response = await fetch("/api/watch-later", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleId: title.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to update watch later status"
        );
      }

      setIsWatchLater(!isWatchLater);
    } catch (error) {
      console.error("Error updating watch later status:", error);
      alert("Failed to update watch later status");
    }
  };

  const handleFavorite = async () => {
    try {
      if (!session?.user?.email) {
        alert("Please log in to add to your Favorites");
        return;
      }

      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch("/api/favorites", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleId: title.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update favorite status");
      }

      setIsFavorite(!isFavorite);
      console.log(
        `${isFavorite ? "Removed" : "Added"} "${title.title}" ${
          isFavorite ? "from" : "to"
        } favorites`
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
      alert("Failed to update favorite status");
    }
  };

  return (
    <div className="movie-item">
      <Image
        className="img-movie"
        src={title.image || PlaceholderSVG}
        alt={title.title}
        width={500}
        height={500}
      />
      <div className="hover-movie">
        <div className="icons">
          <button
            className={`icon-button ${isWatchLater ? "active" : ""}`}
            onClick={handleWatchLater}
            aria-label={
              isWatchLater ? "Remove from watch later" : "Add to watch later"
            }
          >
            <ClockIcon />
          </button>
          <button
            className={`icon-button ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <StarIcon />
          </button>
        </div>
        <div className="movie-info">
          <p className="movie-title">
            {title.title} ({title.released})
          </p>
          <p className="movie-synopsis">{title.synopsis}</p>
          <div className="movie-genre">
            <p>{title.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
