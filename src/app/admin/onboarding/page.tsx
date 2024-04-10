"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import CreateCongregation from "./congregations/create/form";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function OnboardingPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const tabs = [
    {
      title: "Congregation",
      content: () => <CreateCongregation />,
      status: "enabled",
    },
    {
      title: "Creneaux",
      content: () => (
        <div>
          <p>Content for Tab 2</p>
        </div>
      ),
      status: "disabled",
    },
    {
      title: "Spots",
      content: () => (
        <div>
          <p>Content for Tab 3</p>
        </div>
      ),
      status: "disabled",
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
