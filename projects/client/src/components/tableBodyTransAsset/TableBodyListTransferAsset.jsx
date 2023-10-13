import { qtyValidationSchema } from "../../midlleware/Formik";
import { Formik } from "formik";
import Comboboxes from "../Comboboxes";

export default function TableBodyListTransferAsset({
  asset = [],
  allBranch = [],
  allUsers = [],
  formikRef,
  selectDestBranch,
  setSelectBranch,
  isSuperAdmin,
  selectfromBranch,
  setSelectFromBranch,
  selectToBranch,
  setSelectToBranch,
  selectUserPenerima,
  setSelectUserPenerima,
  qtyInputTf,
  setQtyInputTf,

  // function
  handleQtyChange,
}) {
  console.log("asset tf", asset);
  console.log("yg di tf", qtyInputTf);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from{" "}
            <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
            <time dateTime="2022-08-31">August 31, 2022</time>.
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th>No.</th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
              >
                Asset Name
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Category
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                NOPOL/SN
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Qty
              </th>
            </tr>
          </thead>
          <tbody>
            {asset.map((data) => (
              <tr
                key={data.id}
                className="border-b border-gray-200"
              >
                <td className="py-4  pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">{data.no}</div>
                </td>
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">{data.name}</div>
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {data.category}
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {data.serialNumber || data.noPolisi || "-"}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  <Formik
                    initialValues={{ assetId: data.id, qty: 0 }} // Inisialisasi assetId dan qty
                    validationSchema={qtyValidationSchema(asset)}
                    innerRef={(ref) => (formikRef[data.id] = ref)}
                    initialTouched={{ qty: true }} // Atur bidang sebagai "touched" secara awal
                    initialErrors={{ qty: "Jumlah harus diisi" }}
                    onSubmit={(values) => {
                      // Validasi berhasil
                      const assetId = values.assetId;
                      const qty = values.qty;
                      // Lakukan sesuatu dengan assetId dan qty yang telah divalidasi
                      setQtyInputTf({ qty: qty, assetId: assetId });
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <input
                          type="number"
                          min="0"
                          name="qty"
                          id="qty"
                          value={values.qty}
                          onChange={(e) => {
                            handleChange(e);
                            handleQtyChange(e, data.id, setQtyInputTf);
                          }}
                          onBlur={handleBlur}
                          className="p-2 border border-gray-400 spin-hidden min-w-0 flex-1 rounded-md focus:border-orange-500 focus:ring-orange-500 sm:text-right"
                          required
                        />
                        {touched.qty && errors.qty && (
                          <div className="text-red-500">{errors.qty}</div>
                        )}
                      </form>
                    )}
                  </Formik>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {/* <tr>
              <th
                scope="row"
                colSpan={4}
                className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
              >
                Total Asset Transfer
              </th>
              <th
                scope="row"
                className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
              >
                Total Asset Transfer
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                $4,485.00
              </td>
            </tr> */}
          </tfoot>
        </table>
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div className=" border-t border-gray-300 my-6">
            <h3 className="mt-10 text-lg font-medium leading-6 text-gray-900">
              Sender Information Form
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Please fill out this purpose form
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                From Branch
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={allBranch}
                  selectedValue={selectfromBranch}
                  setSelectedValue={setSelectFromBranch}
                  isInputDisabled={isSuperAdmin}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Destination
              </label>

              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={allBranch}
                  selectedValue={selectToBranch}
                  setSelectedValue={setSelectToBranch}
                />
              </div>
            </div>

            {selectToBranch && (
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Recepitaine
                </label>

                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Comboboxes
                    people={allUsers}
                    selectedValue={selectUserPenerima}
                    setSelectedValue={setSelectUserPenerima}
                  />
                </div>
              </div>
            )}

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Date
              </label>

              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="p-2 border spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <div className="sm:col-span-6">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="desc"
                    name="desc"
                    rows={3}
                    className="p-2 block w-full rounded-md border border-gray-400 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    // value={desc}
                    // onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a description about your asset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
