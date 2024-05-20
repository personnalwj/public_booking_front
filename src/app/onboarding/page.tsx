"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import CongregationForm from "@/forms/congregation.form";
import { Congregation } from "@/types/congregation.type";
import { fetchSpotsByCongregation, fetchTimeSlots } from "@/api/spots.api";
import { fetchUserCongregations } from "@/api/congregations.api";
import { useAxios } from "@/utils/axios";

import { Spot } from "@/types/spot.type";
import SpotContent from "./spot.content";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function OnboardingPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [congregation, setCongeration] = useState<Congregation | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [spots, setSpots] = useState<Spot[] | null>(null);
  const axiosClient = useAxios();
  const [hasSubmitSpot, setHasSubmitSpot] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (congregation) {
      setSelectedTab(1);
      return;
    }
    const getUserCongregation = async () => {
      fetchUserCongregations(axiosClient).then((user) => {
        setCongeration(user.congregation);
      });
    };
    getUserCongregation();
  }, [axiosClient, congregation]);

  useEffect(() => {
    const getTimeSlots = async () => {
      const response = await fetchTimeSlots(axiosClient);
      setTimeSlots(response);
    };
    getTimeSlots();
  }, [axiosClient]);

  useEffect(() => {
    const getSpots = async () => {
      if (!congregation) return;
      const response = await fetchSpotsByCongregation(
        axiosClient,
        congregation.id
      );
      setSpots(response);
    };
    getSpots();
  }, [axiosClient, congregation]);

  const handleSpotSubmit = (spot: Spot) => {
    if (!spots) {
      setSpots([spot]);
      return;
    }
    setSpots([...spots, spot]);
    setHasSubmitSpot(true);
  };

  const handleOnboardingEnd = () => {
    setHasSubmitSpot(true);
    router.push("/");
  };

  const tabs = [
    {
      title: "Congregation",
      content: () => (
        <CongregationForm
          handleSumit={setCongeration}
          congregation={congregation}
        />
      ),
      status: "enabled",
    },
    {
      title: "Spots",
      content: () => {
        if (spots && congregation) {
          return (
            <SpotContent
              timeSlots={timeSlots}
              spots={spots}
              congregation={congregation}
              handleSpotSubmit={handleSpotSubmit}
              hasSubmitSpot={hasSubmitSpot}
              setHasSubmitSpot={setHasSubmitSpot}
              handleOnboardingEnd={handleOnboardingEnd}
            />
          );
        }
      },
      status: selectedTab === 1 ? "enabled" : "disabled",
    },
  ];
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-100 shadow-sm">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              disabled={tab.status === "disabled"}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm",
                  selected
                    ? "bg-indigo-900 text-indigo-100 shadow"
                    : "text-indigo-900 hover:bg-indigo-100 hover:text-indigo-900",
                  tab.status === "disabled"
                    ? "text-gray-400 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
                    : ""
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index}>{tab.content()}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default OnboardingPage;
