
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  withButton?: boolean;
  buttonText?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  className = "",
  withButton = false,
  buttonText = "Search",
  autoFocus = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      className={cn(
        "w-full flex items-center transition-all duration-300",
        isFocused ? "scale-[1.02]" : "scale-100",
        className
      )}
      onSubmit={handleSubmit}
    >
      <div
        className={cn(
          "flex-1 flex items-center gap-2 bg-background border rounded-l-lg rounded-r-lg transition-all duration-200",
          withButton ? "rounded-r-none" : "",
          isFocused
            ? "ring-2 ring-primary/20 border-primary/30"
            : "hover:border-input focus-within:border-input"
        )}
      >
        <div className="pl-3 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 py-2 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 mr-1 rounded-full"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {withButton && (
        <Button
          type="submit"
          className="rounded-l-none"
          disabled={!query.trim()}
        >
          {buttonText}
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
