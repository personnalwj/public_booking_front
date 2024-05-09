"use client";

import { use, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import CongregationForm from "@/app/forms/congregation.form";
import { Congregation, Spot } from "@/types/congregation.type";
import SpotForm from "@/app/forms/spots.form";
import { fetchSpotsByCongregation, fetchTimeSlots } from "@/app/apis/spot.api";
import { fetchUserCongregations } from "@/app/apis/congregation.api";
import { useAxios } from "@/app/utils/axios";
import Card from "@/app/components/card";
import Button from "@/app/components/button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function OnboardingPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [congregation, setCongeration] = useState<Congregation | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [spots, setSpots] = useState<Spot[] | null>(null);
  const axiosClient = useAxios();

  useEffect(() => {
    if (congregation) {
      setSelectedTab(1);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [congregation]);
  console.log('******* spots', spots);
  useEffect(() => {
    const getUserCongregation = async () => {
      fetchUserCongregations(axiosClient).then((user) => {
        setCongeration(user.congregation);
      });
    };
    getUserCongregation();
  }, [axiosClient]);

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
      content: (
        <>
          <SpotForm timeSlots={timeSlots} handleSubmit={handleSpotSubmit} congregation={congregation} />
          <>
            {spots && (
              <div className="flex-col justify-center items-center">
                <div className="flex flex-wrap">
                  {spots.map((spot: Spot, key: number) => (
                    <Card
                      key={`${spot.title}-${key}`}
                      title={spot.title}
                      description={spot.address}
                      className="w-full sm:w-1/2 mt-4"
                    />
                  ))}
                </div>
                <Button type="button" className="w-1/4 items-center justify-center">
                  Terminer
                </Button>
              </div>
            )}
          </>
        </>
      ),
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
            <Tab.Panel key={index}>{tab.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default OnboardingPage;
