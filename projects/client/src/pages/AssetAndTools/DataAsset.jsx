import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBranches } from "../../reducers/branchSlice";
import TransitionFade from "../../components/TransitionFade";
import AddDataHeader from "../../components/AddDataHeader";
import Table from "../../components/Table";
import DataAssetForm from "../../components/DataAssetForm";
import { fetchAssets } from "../../reducers/assetSlice";
import AssetTableBody from "../../components/AssetTableBody";

const DataAsset = () => {
  const categoryOptions = [{ value: "", label: "None" }];

  const dispatch = useDispatch();
  const assetGlobal = useSelector((state) => state.asset);
  console.log("asetglobal", assetGlobal);

  const [showAddDataForm, setShowAddDataForm] = useState(false);
  const [showEditDataForm, setShowEditDataForm] = useState(false);
  console.log("showaddData", showAddDataForm);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);

  useEffect(() => {
    dispatch(fetchAllBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TransitionFade show={showAddDataForm}>
        {/* <div></div> */}
        <DataAssetForm
          action="Add"
          isLoading={assetGlobal.isLoading}
          setShowForm={setShowAddDataForm}

          // categoryOptions={}
        />
      </TransitionFade>

      <TransitionFade show={!showAddDataForm && !showEditDataForm}>
        <div className="flex flex-1 flex-col md:pl-64">
          <AddDataHeader
            title="Data Assets"
            desc="A list Data Assets"
            addButtonText="Add Data"
            onAddClick={() => setShowAddDataForm(true)}
          />
          <Table
            className="mb-4"
            headCols={[
              "Nama Asset",
              "Category",
              "Description",
              "Stock",
              "Branch",
            ]}
            tableBody={<AssetTableBody asset={assetGlobal.assets} />}
          />
        </div>
      </TransitionFade>
    </div>
  );
};

export default DataAsset;
