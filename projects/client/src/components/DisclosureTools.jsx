import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import CheckBox from "./CheckBox";

export default function DisclosureTools() {
  return (
    <div className="">
      <div className="">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                <span>What assets do you have that are damaged?</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="max-w-md px-4 pt-4 pb-2 text-sm text-gray-500">
                <CheckBox />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure
          as="div"
          className="mt-2"
        >
          {/* {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )} */}
        </Disclosure>
      </div>
    </div>
  );
}
