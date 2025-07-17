import "@/styles/Genre/styles.css";

interface GenreProps {
  title: string;
  isSelected: boolean;
  onToggle: (genre: string) => void;
}

export default function GenreOption({
  title,
  isSelected,
  onToggle,
}: GenreProps) {
  return (
    <button
      className={`button-genre ${isSelected ? "selected" : ""}`}
      onClick={() => onToggle(title)}
    >
      {title}
    </button>
  );
}
