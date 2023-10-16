export default function SearchBar({ className, onSubmit, defaultValue = "" }) {
  return (
    <div className={`w-full md:w-1/3 ${className}`}>
      <form
        onSubmit={onSubmit}
        className="flex items-center"
      >
        <label
          htmlFor="simple-search"
          className="sr-only"
        >
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            name="searchBar"
            type="text"
            id="simple-search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Search"
            defaultValue={defaultValue}
          />
        </div>
      </form>
    </div>
  );
}
