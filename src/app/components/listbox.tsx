import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface ListBoxProps extends React.SelectHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  id?: string;
  name?: string;
  label: string;
  labelClassName?: string;
  timeSlots: any;
}

export default function ListBox(
  { label, labelClassName, name, timeSlots, ...props }: ListBoxProps,
  ref: any
) {
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}
      >
        {label}
      </label>
      <div className="mt-1 relative">
        <Listbox value={selected} multiple {...props}>
          <span className="inline-block w-full rounded-md shadow-sm">
            <Listbox.Button
              className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={() => setIsOpen(!isOpen)}
              open={isOpen}
            >
              <span className="block truncate">Selectionnez vos créneaux</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </span>
          <Transition
            unmount={false}
            show={isOpen}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
          >
            <Listbox.Options
              className="max-h-60 rounded-md py-1 text-base leading-6
               overflow-auto focus:outline-none
                sm:text-sm sm:leading-5"
            >
              <div
                className={`cursor-default select-none relative py-2 pl-8 pr-4`}
              >
                {timeSlots.map((timeSlot) => (
                  <Listbox.Option key={timeSlot.id} value={timeSlot.id}>
                    <div className="flex items-center justify-start">
                      <span>{timeSlot.startTime.slice(0, 5)}</span>
                      <span className="mx-2">-</span>
                      <span>{timeSlot.endTime.slice(0, 5)}</span>
                    </div>
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </>
  );
}
