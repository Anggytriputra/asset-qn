import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  Bars4Icon,
  ClockIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TableList({ projects = [] }) {
  console.log("project adalah", projects);
  //   const pinnedProjects = projects.filter((project) => project.pinned);

  //   console.log('project pinned', pinnedProjects)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <main className="flex-1">
        {/* Page title & actions */}
        {/* <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Setting Asset
            </h1>
          </div>
        </div> */}

        {/* Projects list (only on smallest breakpoint) */}
        <div className="mt-10 sm:hidden">
          <div className="px-4 sm:px-6">
            <h2 className="text-sm font-medium text-gray-900">Projects</h2>
          </div>
          <ul
            role="list"
            className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
          >
            {projects.map((project) => (
              <li key={project.id}>
                <a
                  href="#"
                  className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                >
                  <span className="flex items-center space-x-3 truncate">
                    <span
                      className={classNames(
                        project.bgColorClass,
                        "w-2.5 h-2.5 flex-shrink-0 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate text-sm font-medium leading-6">
                      {project.title}{" "}
                      <span className="truncate font-normal text-gray-500">
                        in {project.name}
                      </span>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects table (small breakpoint and up) */}
        <div className="mt-8 hidden sm:block">
          <div className="inline-block min-w-full border-b border-gray-200 align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th
                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    <span className="lg:pl-2">Name</span>
                  </th>
                  <th
                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Members
                  </th>
                  <th
                    className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                    scope="col"
                  >
                    Last updated
                  </th>
                  <th
                    className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {projects.map(
                  (data) => (
                    //   data.m_category.map((data2, stockIdx) => (
                    <tr key={data.id}>
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                        <div className="flex items-center space-x-3 lg:pl-2">
                          <div
                            className={classNames(
                              "bg-pink-600",
                              "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                          <a
                            href="#"
                            className="truncate hover:text-gray-600"
                          >
                            <span>
                              {data.name}{" "}
                              <span className="font-normal text-gray-500">
                                is {data.m_category.name}
                              </span>
                            </span>
                          </a>
                        </div>
                      </td>

                      <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                        {data.m_category.name}
                      </td>

                      <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                        {new Date(data.updatedAt).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                        <button
                          type="button"
                          className="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                  //   ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
