"use client";

import { use, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import CreateCongregation from "../congregations/form/form";
import { Congregation } from "@/types/congregation.type";
import TimeSlotForm from "../time-slots/form/form";
import SpotForm from "../spots/form/form";
import { fetchTimeSlots, fetchUserCongregations } from "./api";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function OnboardingPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [congregation, setCongeration] = useState<Congregation | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

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

  useEffect(() => {
    const getUserCongregation = async () => {
      fetchUserCongregations().then((user) => {
        setCongeration(user.congregation);
      });
    };
    getUserCongregation();
  }, []);

  useEffect(() => {
    const getTimeSlots = async () => {
      const response = await fetchTimeSlots();
      setTimeSlots(response);
      console.log(response);
    };
    getTimeSlots();
  }, []);

  const tabs = [
    {
      title: "Congregation",
      content: () => (
        <CreateCongregation
          handleSumit={setCongeration}
          congregation={congregation}
        />
      ),
      status: "enabled",
    },
    {
      title: "Spots",
      content: <SpotForm timeSlots={timeSlots} />,
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
