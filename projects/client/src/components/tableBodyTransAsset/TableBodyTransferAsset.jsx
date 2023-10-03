// import { numToIDRCurrency } from "../helper/currency";
import { Link } from "react-router-dom";
import BrokenImg from "../../assets/broken_img.png";

export default function TableBodyTransferAsset({
  asset = [],
  setOpenModalConfirmed,
  setNoidTH,
  setDetailApp,
  // onEdit,
  // onDelete,
}) {
  console.log("TableBodyTransferAsset", asset);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {asset.map((assets) =>
        assets.m_trans_ds.map((transD, stockIdx) => (
          <tr key={transD.id}>
            <td className="px-3 py-4 text-sm text-blue-500 ">
              <Link
                to={`/asset-tools/Detail-transfer/${assets.id}`}
                state={{ asset: assets }}
                className="relative group"
              >
                <div className=" text-blue-400 hover:text-blue-900">
                  {assets.no_transfer}
                </div>
              </Link>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{assets.date}</div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{transD.m_asset_name}</div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{transD.m_category.name}</div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assets.CabangOut.cabang_name}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{assets.CabangIn.cabang_name}</div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {assets.desc}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {assets.desc_received || "-"}
              </div>
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  assets.m_status.status_name === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : assets.m_status.status_name === "Rejected"
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {assets.m_status.status_name}
              </span>
            </td>

            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              {assets.m_status.status_name !== "Received" &&
                assets.m_status.status_name !== "Rejected" && (
                  <button
                    className="text-teal-600 hover:text-teal-900"
                    onClick={() => {
                      setOpenModalConfirmed(true);
                      setNoidTH(assets.id);
                      const clickedAsset = asset[stockIdx];
                      setDetailApp(clickedAsset);
                    }}
                  >
                    Confirmed
                    <span className="sr-only">{assets.no_transfer}</span>
                  </button>
                )}
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
}
