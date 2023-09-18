// import { numToIDRCurrency } from "../helper/currency";
import { Link } from "react-router-dom";
import BrokenImg from "../../assets/broken_img.png";

export default function OrderTable({ asset = [], onEdit, onDelete }) {
  console.log("assetTableBody OrderTable", asset);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {asset.map((assets) =>
        assets.m_transd_orders.map((transD, stockIdx) => (
          <tr key={transD.id}>
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10"
                    src={
                      `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}` ||
                      BrokenImg
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = BrokenImg;
                    }}
                    alt={transD.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900 truncate max-w-[200px]">
                    {transD.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{assets.m_cabang.cabang_name}</div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {transD.m_category.name}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500 text-center">
              <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
                {transD.qty}
              </td>
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

            {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                className="text-teal-600 hover:text-teal-900"
                onClick={() => onEdit(product, stockIdx)}
              >
                Edit<span className="sr-only">{product.name}</span>
              </button>
              <button
                className="text-red-600 hover:text-red-900 ml-4"
                onClick={() => onDelete(product.id)}
              >
                Delete
                <span className="sr-only">{product.name}</span>
              </button>
            </td> */}
          </tr>
        ))
      )}
    </tbody>
  );
}
