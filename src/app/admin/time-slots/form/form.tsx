import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const TimeSlotPicker = () => {
  const { register, handleSubmit } = useForm();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="border p-5 border-slate-200 shadow-md">
      <h1 className="text-2xl font-bold text-center">Créer des créneaux</h1>
      <p className="text-center text-gray-500">
        Ajoutez des créneaux pour permettre aux frères et soeurs de réserver un
        spot.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Listbox value={null} onChange={(e: string) => 
            {
                if (e) {
                    setSelectedTimeSlots([...selectedTimeSlots, e]);
                }
            }
        }>
          <div className="relative">
            <Listbox.Button className="relative w-1/2 py-2 mx-auto pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <span className="block truncate">
                Choisir les tranches horaires
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-1/2 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {timeSlots.map((timeSlot, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `${active ? "text-white bg-blue-600" : "text-gray-900"}
                                                    cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={timeSlot}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {timeSlot}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-white" : "text-blue-600"
                            }
                                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Valider
        </button>
      </form>
      <div className="mt-4">
        {selectedTimeSlots && (
          <ul>
            {selectedTimeSlots.map((timeSlot, index) => (
              <li key={index}>{timeSlot}</li>
            ))}
          </ul>
        )}
        </div>
    </div>
  );
};

export default TimeSlotPicker;
