import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddDataHeader({
  title,
  desc,
  addButtonText,
  onAddClick,
}) {
  return (
    <div className="sm:flex sm:items-center ml-4 mr-4">
      <div className="sm:flex-auto">
        <h1 className="text-2xl relative font-semibold  w-max text-gray-900 after:block after:bg-red-300 after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-700">{desc}</p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
          onClick={onAddClick}
        >
          <PlusIcon
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          {addButtonText}
        </button>
      </div>
    </div>
  );
}
