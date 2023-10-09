import { PlusIcon } from "@heroicons/react/24/solid";

export default function Button({ addButtonText, onAddClick }) {
  return (
    <div className="flex items-center justify-end">
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
  );
}
