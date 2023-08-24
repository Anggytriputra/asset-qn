import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const tabs = [
//   { name: "Kendaraan", path: "/kendaraan", current: false },
//   { name: "Special Tools", path: "/special-tools", current: false },
//   { name: "Stadard Tools", path: "/stadard-tools", current: true },
//   { name: "Safety Tools", path: "/safety-tools", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationDataAsset({ activeTab, setActiveTab }) {
  const categoriesGlobal = useSelector((state) => state.category.categories);

  // console.log("Categories G", categoriesGlobal);
  // Dapatkan daftar kategori unik
  const uniqueCategories = Array.from(
    new Set(categoriesGlobal.map((cat) => cat.ctgr))
  );

  const tabs = uniqueCategories.map((ctgr) => ({
    name: ctgr,
    path: `/${ctgr.toLowerCase().replace(/ /g, "-")}`,
    current: false,
  }));

  // const [activeTab, setActiveTab] = useState(tabs[0]?.name || "");

  useEffect(() => {
    if (tabs.length) setActiveTab(tabs[0].name);
  }, []);

  const handleTabClick = (tabName) => {
    console.log("Active tab set to:", tabName);
    setActiveTab(tabName);
  };

  useEffect(() => {
    console.log("Component re-rendered with activeTab:", activeTab);
  }, [activeTab]);

  return (
    <div>
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
          className="block w-80 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={activeTab}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.path} // pastikan Anda menggunakan 'path', bukan 'href'
                onClick={(e) => {
                  e.preventDefault(); // mencegah perilaku default saat mengklik anchor link
                  handleTabClick(tab.name);
                }}
                className={classNames(
                  activeTab === tab.name
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                )}
                aria-current={activeTab === tab.name ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
