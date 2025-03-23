
import { useState, useRef, useEffect } from "react";
import { 
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MapPin, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for stations
const stations = [
  { value: "ndls", label: "New Delhi", code: "NDLS" },
  { value: "cstm", label: "Mumbai CST", code: "CSTM" },
  { value: "mas", label: "Chennai Central", code: "MAS" },
  { value: "hwh", label: "Howrah", code: "HWH" },
  { value: "bza", label: "Vijayawada", code: "BZA" },
  { value: "bpl", label: "Bhopal", code: "BPL" },
  { value: "bbs", label: "Bhubaneswar", code: "BBS" },
  { value: "jaipur", label: "Jaipur", code: "JP" },
  { value: "bdts", label: "Bandra Terminus", code: "BDTS" },
  { value: "adi", label: "Ahmedabad", code: "ADI" },
  { value: "pnbe", label: "Patna", code: "PNBE" },
  { value: "lko", label: "Lucknow", code: "LKO" },
  { value: "cnb", label: "Kanpur Central", code: "CNB" },
  { value: "sc", label: "Secunderabad", code: "SC" },
  { value: "sealdah", label: "Sealdah", code: "SDAH" },
  { value: "pune", label: "Pune", code: "PUNE" },
  { value: "ald", label: "Allahabad", code: "ALD" },
  { value: "ajmer", label: "Ajmer", code: "AII" },
  { value: "cbe", label: "Coimbatore", code: "CBE" },
  { value: "vskp", label: "Visakhapatnam", code: "VSKP" },
];

interface StationSelectorProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

const StationSelector = ({
  label,
  id,
  value,
  onChange,
  placeholder = "Select station",
  className = "",
  error,
}: StationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedStation = stations.find(station => station.value === value);

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-start font-normal",
              error ? "border-destructive ring-destructive" : "",
              !value && "text-muted-foreground"
            )}
          >
            {selectedStation ? (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                <span>{selectedStation.label}</span>
                <span className="text-xs text-muted-foreground">({selectedStation.code})</span>
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search stations..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No stations found.</CommandEmpty>
              <CommandGroup>
                {stations.map((station) => (
                  <CommandItem
                    key={station.value}
                    value={station.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span>{station.label}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {station.code}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === station.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default StationSelector;
