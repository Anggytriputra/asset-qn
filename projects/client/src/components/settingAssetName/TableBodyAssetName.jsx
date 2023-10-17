// import { numToIDRCurrency } from "../helper/currency";
import { Link } from "react-router-dom";
import BrokenImg from "../../assets/broken_img.png";

export default function TableBodyAssetName({
  asset = [],
  setOpenModalConfirmed,
  setNoidTH,
  setDetailApp,
  // onEdit,
  // onDelete,
}) {
  console.log("TableBody asset name", asset);
  console.log("setnoidTh", setNoidTH);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {asset.map(
        (assets) => (
          // assets.m_trans_d_returns.map((transD, stockIdx) => (
          <tr key={assets.id}>
            <td className="px-3 py-4 text-sm text-blue-500 ">
              <Link
                to={`/asset-tools/Detail-Return/${assets.id}`}
                state={{ asset: assets }}
                className="relative group"
              >
                <div className=" text-blue-400 hover:text-blue-900">
                  {assets.name}
                </div>
              </Link>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{assets.m_category.name}</div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              {assets.updatedAt ? assets.updatedAt.split("T")[0] : "-"}
            </td>
            {/* <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assets.updatedBy ? asset.updatedBy : "-"}
              </div>
            </td> */}

            <td className="px-3 py-4 text-sm text-gray-500">
              <div
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  assets.flag_active === 0
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {assets.flag_active ? "Active" : "Not Active"}{" "}
              </div>
            </td>

            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                className="text-teal-600 hover:text-teal-900"
                // onClick={() => {
                //   onEdit(assets);
                //   setActionSend("Edit");
                // }}
              >
                Edit<span className="sr-only">{assets.name}</span>
              </button>
              <button
                className="text-red-600 hover:text-red-900 ml-4"
                // onClick={() => onDelete(assets.id)}
              >
                Delete
                <span className="sr-only">{assets.name}</span>
              </button>
            </td>
          </tr>
        )
        // ))
      )}
    </tbody>
  );
}
