// import { numToIDRCurrency } from "../helper/currency";
import BrokenImg from "../../assets/broken_img.png";

export default function SpecialToolsTableBody({
  asset = [],
  onEdit,
  onDelete,
}) {
  // console.log("assetTableBody Special Tool", asset);
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {asset.map((assets) => (
        // product.Stocks.map((stock, stockIdx) => (
        <tr key={assets.id}>
          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                <img
                  className="h-10 w-10"
                  src={
                    `http://localhost:2000/static/asset/${assets.images_url}` ||
                    BrokenImg
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = BrokenImg;
                  }}
                  alt={asset.name}
                />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900 truncate max-w-[200px]">
                  {assets.name}
                </div>
              </div>
            </div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.category_name}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.pic}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.desc}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {assets.cabang_name}
            </div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.merk_special_tools}</div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.tipe_special_tools}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {assets && assets.purchase_date
                ? assets.purchase_date.split("T")[0]
                : "-"}
            </div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {assets && assets.procurument_date
                ? assets.procurument_date.split("T")[0]
                : "-"}
            </div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {assets && assets.received_in_branch
                ? assets.received_in_branch.split("T")[0]
                : "-"}
            </div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {assets && assets.received_in_branch
                ? assets.received_in_branch.split("T")[0]
                : "-"}
            </div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.accesories_one}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{assets.accesories_two || "-"}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">
              {assets.accesories_three || "-"}
            </div>
          </td>

          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button
              className="text-teal-600 hover:text-teal-900"
              onClick={() => onEdit(assets)}
            >
              Edit<span className="sr-only">{assets.name}</span>
            </button>
            <button
              className="text-red-600 hover:text-red-900 ml-4"
              onClick={() => onDelete(assets.id)}
            >
              Delete
              <span className="sr-only">{assets.name}</span>
            </button>
          </td>
        </tr>
        // )
      ))}
    </tbody>
  );
}
