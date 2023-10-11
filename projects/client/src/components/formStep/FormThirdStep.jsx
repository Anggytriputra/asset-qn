import Comboboxes from "../Comboboxes";
import ComboboxesWithStatus from "../ComboboxesWithStatus";
import Dropdown from "../DropDown";

export default function FormThirdStep({
  currentCategory,
  subCategory = {},
  selectSubCategory,
  OpMerk = {},
  OpStnk = {},
  OpYear = {},
  opCondition = {},
  oPMerkST = {},
  oPTipeST = {},
  setSelectSubCategory,
  selectOpOwner,
  setSelectOpOwner,
  selectOpStnk,
  setSelectOpStnk,
  selectYear,
  setSelectYear,
  selectCondition,
  setSelectCondition,
  selectNoPolisi,
  setSelectNoPolisi,
  selectNoMesin,
  setSelectNoMesin,
  selectNoRangka,
  setSelectNorangka,
  selectColor,
  setSelectColor,
  selectExpOneYear,
  setSelectExpOneYear,
  selectExpFiveYear,
  setSelectFiveYear,

  // Special Tools
  sN,
  setSN,
  selectMerkST,
  setSelectMerkST,
  selectTipeST,
  setSelectTipeST,
  accOne,
  setAccOne,
  accTwo,
  setAccTwo,
  accThree,
  setAccThree,
}) {
  console.log("category saat ini", currentCategory);
  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Detail Asset Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {currentCategory === "Kendaraan" && (
              <>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="sub_category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub-Category
                  </label>
                  <Comboboxes
                    people={subCategory}
                    selectedValue={selectSubCategory}
                    setSelectedValue={setSelectSubCategory}
                  />
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="tahun"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merk
                  </label>
                  <Comboboxes
                    people={OpMerk}
                    selectedValue={selectOpOwner}
                    setSelectedValue={setSelectOpOwner}
                  />
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="tahun"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <Comboboxes
                    people={OpYear}
                    selectedValue={selectYear}
                    setSelectedValue={setSelectYear}
                  />
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="noPolisi"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No. Polisi
                  </label>
                  <input
                    type="text"
                    name="noPolisi"
                    id="noPolisi"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={selectNoPolisi}
                    onChange={(e) => setSelectNoPolisi(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="noRangka"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No. Rangka
                  </label>
                  <input
                    type="text"
                    // min="0"
                    name="noRangka"
                    id="noRangka"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={selectNoRangka}
                    onChange={(e) => setSelectNorangka(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="noMesin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No. Mesin
                  </label>
                  <input
                    type="text"
                    // min="0"
                    name="noMesin"
                    id="noMesin"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={selectNoMesin}
                    onChange={(e) => setSelectNoMesin(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="warna"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Warna
                  </label>
                  <input
                    type="text"
                    name="warna"
                    id="warna"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={selectColor}
                    onChange={(e) => setSelectColor(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="expTaxOneYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Exp Tanggal Pajak 1 Tahun
                  </label>
                  <input
                    type="date"
                    name="expTaxOneYear"
                    id="expTaxOneYear"
                    className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                    value={selectExpOneYear}
                    onChange={(e) => setSelectExpOneYear(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="expTaxFiveYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Exp Tanggal Pajak 5 Tahun
                  </label>
                  <input
                    type="date"
                    name="expTaxFiveYear"
                    id="expTaxFiveYear"
                    className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                    value={selectExpFiveYear}
                    onChange={(e) => setSelectFiveYear(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="statusStnk"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status Stnk
                  </label>
                  <Dropdown
                    label="None"
                    options={OpStnk}
                    selectedValue={selectOpStnk}
                    onChange={setSelectOpStnk}
                    className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </>
            )}

            {/*  */}
            {/* dibawah ini adalah form punya Special Tools */}
            {/*  */}

            {currentCategory === "Special Tools" && (
              <>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="sub_category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub-Category
                  </label>
                  <Comboboxes
                    people={subCategory}
                    selectedValue={selectSubCategory}
                    setSelectedValue={setSelectSubCategory}
                  />
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="merk"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merk
                  </label>
                  <Comboboxes
                    people={oPMerkST}
                    selectedValue={selectMerkST}
                    setSelectedValue={setSelectMerkST}
                  />
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="serialNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Serial Number
                  </label>
                  <input
                    type="text"
                    // min="0"
                    name="serialNumber"
                    id="serialNumber"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={sN}
                    onChange={(e) => setSN(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="AccessoriesOne"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Accessories 1
                  </label>
                  <input
                    type="text"
                    // min="0"
                    name="AccessoriesOne"
                    id="AccessoriesOne"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={accOne}
                    onChange={(e) => setAccOne(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="AccessoriesTwo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Accessories 2
                  </label>
                  <input
                    type="text"
                    // min="0"
                    name="AccessoriesTwo"
                    id="AccessoriesTwo"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={accTwo}
                    onChange={(e) => setAccTwo(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="AccessoriesThree"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Accessories 3
                  </label>
                  <input
                    type="text"
                    // min="0"
                    name="AccessoriesThree"
                    id="AccessoriesThree"
                    className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={accThree}
                    onChange={(e) => setAccThree(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
