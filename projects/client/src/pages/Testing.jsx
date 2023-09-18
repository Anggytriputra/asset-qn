import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CompTesting from "../components/componentTest/CompTesting";
import TransitionFade from "../components/TransitionFade";

const Testing = () => {
  const open = "testing";
  return (
    <div>
      <TransitionFade>
        <CompTesting />
      </TransitionFade>
    </div>
  );
};

export default Testing;
