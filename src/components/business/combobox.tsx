"use client";

import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";

type ComboboxProps = {
  placeHolder: string;
  value: string;
  setValue: (value: string) => void;
  items: { value: string; label: string }[];
};

export function Combobox({
  placeHolder,
  value,
  setValue,
  items,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] md:w-[500px] justify-between text-left font-normal"
        >
          {search
            ? items.find((item) => item.label === search)?.label
            : placeHolder}
          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] md:w-[500px] p-0" align="end">
        <Command>
          <CommandInput placeholder={placeHolder} />
          <CommandList>
            <CommandEmpty>Aucun élément trouvé</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setSearch(item.label);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
