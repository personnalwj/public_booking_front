import SpotForm from "@/forms/spots.form";
import { Congregation } from "@/types/congregation.type";
import { Spot, TimeSlot } from "@/types/spot.type";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

const SpotContent = ({
  timeSlots,
  handleSpotSubmit,
  congregation,
  spots,
  hasSubmitSpot,
  setHasSubmitSpot,
  handleOnboardingEnd,
}: {
  timeSlots: TimeSlot[];
  handleSpotSubmit: (spot: Spot) => void;
  congregation: Congregation;
  spots: Spot[];
  hasSubmitSpot: boolean;
  setHasSubmitSpot: (value: boolean) => void;
  handleOnboardingEnd: () => void;
}) => {
  return (
    <>
      {hasSubmitSpot ? (
        <Transition appear show={hasSubmitSpot} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setHasSubmitSpot(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-indigo-100">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-indigo-900 text-center"
                    >
                      Vous avez créé un spot !
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Si vous souhaitez en créer un autre cliquez sur
                        continuer.
                      </p>
                    </div>
                    <div role="alert" className="mt-4 alert py-1 text-xs">
                      <InformationCircleIcon className="h-6 w-6 text-indigo-500" />
                      Vous pourrez rajouter des spots plus tard.
                    </div>
                    <div className="mt-4">
                      <button
                        className="btn btn-sm bg-indigo-300 border-none hover:bg-indigo-400 mx-1 text-indigo-950 shadow-lg hover:shadow-none"
                        onClick={() => setHasSubmitSpot(false)}
                      >
                        Continuer
                      </button>
                      <button
                        className="btn btn-sm bg-indigo-800 text-indigo-200 border-none hover:bg-indigo-600 hover:shadow-none shadow-lg mx-1 text-color-white "
                        onClick={handleOnboardingEnd}
                      >
                        Terminer
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="w-full">
            <SpotForm
              timeSlots={timeSlots}
              handleSubmit={handleSpotSubmit}
              congregation={congregation}
            />
          </div>
          <>
            {spots && (
              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-1 gap-1 md:grid-cols-2 py-2">
                  {spots.map((spot: Spot, key: number) => (
                    <Disclosure
                      key={`${spot.title}-${key}`}
                      className="w-full"
                      as="div"
                    >
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-bold text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/75">
                            <span>{spot.title}</span>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-indigo-500`}
                            />
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-200 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-100 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                              <p className="text-xs">{spot.description}</p>
                              <p className="text-xs">{spot.address}</p>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default SpotContent;
