import React from "react";
import BrokenImg from "../../assets/broken_img.png";

export default function Kendaraan2TableBody({ asset = [], onEdit, onDelete }) {
  // console.log("asset table kendaraan", asset);
  // console.log("asset table kendaraan", asset[0]?.m_images.images_url);
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {asset.map((assets, index) => {
        // Membuat objek untuk menyimpan column_name dan value dari assets.m_assets_ins
        const assetInsMap = {};

        if (assets.m_assets_ins && assets.m_assets_ins.length > 0) {
          assets.m_assets_ins.forEach((assetIn) => {
            assetInsMap[assetIn.m_form.column_name] = assetIn.value;
          });
        }

        return (
          <tr key={`header-${index}`}>
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10"
                    src={
                      assets?.m_images && assets.m_images.length > 0
                        ? `http://localhost:2000/static/kendaraan/${assets.m_images[0].images_url}`
                        : BrokenImg
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = BrokenImg;
                    }}
                    alt={assets.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900 truncate max-w-[200px]">
                    {assets.name}
                  </div>
                </div>
              </div>
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {assets.m_cabang.cabang_name}
              </div>
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {assets.m_category.name}
              </div>
            </td>

            {/* Sisipkan seluruh kolom Anda disini, sebagai contoh: */}

            <td className="px-4 py-4 text-sm text-gray-500">
              <div className="text-gray-900 truncate max-w-[90px]">
                {assets.desc}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["Person In Charge - (PIC)"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["Name of Owner"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{"rusak"}</div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{assetInsMap["Merk"] || "-"}</div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{assetInsMap["Year"] || "-"}</div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["No. Polisi"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["No. Rangka"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["No. Mesin"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["Exp tgl Pajak 1 Tahun"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["Exp tgl Pajak 5 Tahun"] || "-"}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {assetInsMap["tanggal terima dicabang"] || "-"}
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
        );
      })}
    </tbody>
  );
}
