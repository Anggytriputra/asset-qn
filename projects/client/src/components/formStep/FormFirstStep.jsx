import Comboboxes from "../Comboboxes";
import ComboboxesWithStatus from "../ComboboxesWithStatus";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function FormFirstStep({
  categories = {},
  allbranch = {},
  selectCategory,
  setSelectCategory,
  selectBranch,
  setSelectBranch,
}) {
  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Category Asset Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Category
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={categories}
                  selectedValue={selectCategory}
                  setSelectedValue={setSelectCategory}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Branch
              </label>

              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={allbranch}
                  selectedValue={selectBranch}
                  setSelectedValue={setSelectBranch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
