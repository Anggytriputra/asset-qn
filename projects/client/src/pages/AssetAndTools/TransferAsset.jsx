import React, { useEffect, useState } from "react";
import AddDataHeader from "../../components/AddDataHeader";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/DropDown";
import Comboboxes from "../../components/Comboboxes";
import { fetchAllBranches } from "../../reducers/branchSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import TableBodyTransferAsset from "../../components/tableBodyTransAsset/TableBodyTransferAsset";
import Pagination from "../../components/Pagination";

const TransferAsset = () => {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const branchGlobal = useSelector((state) => state.branch.allBranches);
  console.log("branch global", branchGlobal);

  const [selectedBranch, setSelectedBranch] = useState();
  console.log("selected", selectedBranch);

  //////////////////////////////////////
  const branchesWithNewName = branchGlobal.map((branch) => ({
    id: branch.id,
    name: branch.cabang_name,
  }));

  console.log("branchName", branchesWithNewName);

  useEffect(() => {
    dispatch(fetchAllBranches());
  }, [userGlobal.role]);

  return (
    <div>
      <AddDataHeader
        title="Transfer Asset"
        desc="A list Transfer Asset"
        addButtonText="Transfer Asset"
      />
      <div className="flex flex-wrap items-center justify-start gap-6 pb-4 mb-4 mt-12 border-b border-gray-200">
        <div className="sm:col-span-2">
          <label
            htmlFor="expTaxOneYear"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            name="expTaxOneYear"
            id="expTaxOneYear"
            className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
            // defaultValue={assetInsMap["Exp tgl Pajak 1 Tahun"]}
            // required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="expTaxOneYear"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            name="expTaxOneYear"
            id="expTaxOneYear"
            className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
            // defaultValue={assetInsMap["Exp tgl Pajak 1 Tahun"]}
            // required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="expTaxOneYear"
            className="block text-sm font-medium text-gray-700"
          >
            Branch
          </label>
          <Comboboxes
            people={branchesWithNewName}
            selectedValue={selectedBranch}
            setSelectedValue={setSelectedBranch}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </div>

      <Table
        className="mb-4"
        headCols={[
          "No Transfer",
          "Asset Name",
          "Cabang Pengirim",
          "Cabang Penerima",
          "Description",
          "Description Received",
          "Status",
        ]}
        tableBody={<TableBodyTransferAsset />}
      />
      <Pagination />
    </div>
  );
};

export default TransferAsset;
