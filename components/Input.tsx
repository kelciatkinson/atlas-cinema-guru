import "@/styles/Input/styles.css";

interface InputProps {
  placeholder: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export default function Input({
  placeholder,
  value,
  onChange,
  onEnter,
}: InputProps) {
  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder={String(placeholder)}
        value={value || ""}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter?.(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}
