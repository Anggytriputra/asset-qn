// GlobalFunction.js
export const updateStepStatus = (currentStep, steps) => {
  const updatedSteps = [...steps];
  for (let i = 0; i < updatedSteps.length; i++) {
    if (i < currentStep) {
      updatedSteps[i].status = "complete";
    } else {
      updatedSteps[i].status = "upcoming";
    }
  }
  return updatedSteps;
};

export const resetStepStatus = (steps) => {
  const updatedSteps = steps.map((step) => {
    if (step.status === "complete") {
      return { ...step, status: "upcoming" };
    }
    return step;
  });
  return updatedSteps;
};

export const handleCheckboxChange = (assets, selectItem, setSelectItem) => {
  // Cek apakah asset sudah ada dalam state selectItem
  if (selectItem.includes(assets)) {
    // Jika sudah ada, hilangkan dari state
    setSelectItem(selectItem.filter((asset) => asset !== assets));
  } else {
    // Jika belum ada, tambahkan ke state
    setSelectItem([...selectItem, assets]);
  }
};

export const transformData = (item, index) => {
  const {
    id,
    name,
    desc,
    m_category_id,
    m_cabang_id,
    m_assets_ins,
    m_stock,
    m_category,
  } = item;

  // Cari nilai No. Polisi atau Serial Number dari m_assets_ins
  const noPolisi = m_assets_ins.find(
    (ins) => ins.m_form.column_name === "No. Polisi"
  );

  const serialNumber = m_assets_ins.find(
    (ins) => ins.m_form.column_name === "Serial Number"
  );

  const newData = {
    no: index + 1,
    id,
    m_category_id,
    name,
    desc,
    m_cabang_id,
    qty: m_stock ? m_stock.quantity : null,
    category: m_category.name,
    noPolisi: noPolisi ? noPolisi.value : null,
    serialNumber: serialNumber ? serialNumber.value : null,
  };

  return newData;
};

export const handleQtyChange = (e, assetId, setQtyInputTf) => {
  const { value } = e.target;
  setQtyInputTf((prevQtyInputTf) => {
    return {
      ...prevQtyInputTf,
      [assetId]: { assetId, selectQty: value },
    };
  });
};

export const searchAssetForm = (asset, assetInsMap) => {
  if (asset.m_assets_ins && asset.m_assets_ins.length > 0) {
    asset.m_assets_ins.forEach((assetIn) => {
      assetInsMap[assetIn.m_form.column_name] = assetIn.value;
    });
  }
};
