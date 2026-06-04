"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

interface Option {
  value: string;
  label: string;
}

interface AutosearchSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function AutosearchSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
}: AutosearchSelectProps) {
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Sync input field value when selection changes
  const selectedOption = React.useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  React.useEffect(() => {
    setSearch(selectedOption ? selectedOption.label : "");
  }, [selectedOption]);

  const filteredOptions = React.useMemo(() => {
    if (!search || (selectedOption && search === selectedOption.label)) {
      return options;
    }
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, selectedOption]);

  return (
    <div ref={containerRef} className="relative w-full">
      <Combobox
        value={value}
        onValueChange={(val) => {
          const stringVal = val ? (val as string) : "";
          onChange(stringVal);
        }}
        inputValue={search}
        onInputValueChange={(val) => setSearch(val)}
        disabled={disabled}
        itemToStringLabel={(val) => {
          if (!val) return "";
          const opt = options.find((o) => o.value === val);
          return opt ? opt.label : val;
        }}
      >
        <ComboboxInput
          placeholder={placeholder}
          showClear={!!value}
          className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9"
        />
        <ComboboxContent
          container={containerRef}
          className="border border-zinc-200 dark:border-zinc-800 bg-popover rounded-none shadow-md max-h-60 overflow-y-auto z-9999"
        >
          <ComboboxList>
            {filteredOptions.length === 0 ? (
              <ComboboxEmpty className="py-2 text-center text-xs text-muted-foreground">
                No results found
              </ComboboxEmpty>
            ) : (
              filteredOptions.map((opt) => (
                <ComboboxItem
                  key={opt.value}
                  value={opt.value}
                  className="cursor-pointer py-1.5 px-2 hover:bg-muted text-xs transition-colors rounded-none"
                >
                  {opt.label}
                </ComboboxItem>
              ))
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
