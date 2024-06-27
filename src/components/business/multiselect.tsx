import { Listbox } from "@headlessui/react";
import React from "react";

type Item = { value: string; label: string };

interface Props {
  values: string[];
  items: Item[];
  onChange: (value: string[]) => void;
}

export const MultiSelect: React.FC<Props> = ({ values, items, onChange }) => {
  return (
    <Listbox
        as="div"
        value={values}
        onChange={onChange}
        multiple
    >
      <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
        Choisissez vos créneaux
      </Listbox.Button>
      <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {items.map((item) => (
          <Listbox.Option
            key={item.value}
            value={item.value}
            className={({ active, selected }) =>
              `${active ? "text-white bg-indigo-700" : "text-indigo-900"}
                        cursor-default select-none relative py-2 pl-3 pr-9
            ${selected ? "bg-gray-200" : ""}
                        `
            }
          >
            {item.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
