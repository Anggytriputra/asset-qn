import Comboboxes from "../Comboboxes";

export default function FormAsset({
  category,
  selectCategory,
  setSelectCategory,
}) {
  return (
    <>
      {/* <form
        className=" space-y-8 divide-y divide-gray-200 "
        onSubmit={handleSubmit}
      > */}
      <div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Category
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <Comboboxes
              people={category}
              selectedValue={selectCategory}
              setSelectedValue={setSelectCategory}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              id="name"
              type="text"
              name="name"
              className="p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      {/* </form> */}
    </>
  );
}
