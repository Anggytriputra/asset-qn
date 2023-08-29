import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationDataAsset({
  categoriesGlobal = [],
  activeTab,
  setActiveTab,
  savedTab,
  tabs,
}) {
  // const location = useLocation();

  // useEffect(() => {
  //   // Fungsi untuk membaca activeTab dari localStorage dan set state
  //   const savedTab = localStorage.getItem("activeTab");

  //   if (savedTab) {
  //     setActiveTab(parseInt(savedTab, 10));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Fungsi untuk menyimpan activeTab ke localStorage setiap kali state berubah
  //   if (activeTab !== null) {
  //     localStorage.setItem("activeTab", activeTab.toString());
  //   }
  // }, [activeTab]);

  // useEffect(() => {
  //   // Hapus activeTab dari localStorage saat URL berubah
  //   return () => {
  //     localStorage.removeItem("activeTab");
  //   };
  // }, [location.pathname]);

  // const tabs = Object.keys(categoriesGlobal)
  //   .filter((key) => key !== "isLoading")
  //   .map((key) => {
  //     return {
  //       id: categoriesGlobal[key].id,
  //       name: categoriesGlobal[key].name_ctgr,
  //       current: categoriesGlobal[key].id === activeTab,
  //     };
  //   });
  const handleMobileSelectChange = (e) => {
    const selectedTabId = e.target.value;
    setActiveTab(selectedTabId);
  };

  return (
    <div>
      {/* Untuk tampilan mobile */}
      <div className="sm:hidden">
        <label
          htmlFor="tabs"
          className="sr-only"
        >
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          value={activeTab}
          onChange={handleMobileSelectChange}
        >
          {tabs.map((tab) => (
            <option
              key={tab.name}
              value={tab.id}
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Untuk tampilan desktop */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
