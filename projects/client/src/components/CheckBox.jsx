import React from "react";

export default function CheckBoxList({ data }) {
  return (
    <div>
      {data.map((item) => (
        <fieldset
          key={item.id}
          className="border-t border-b border-gray-200"
        >
          <legend className="sr-only">{item.column_name}</legend>
          <div className="divide-y divide-gray-200">
            <div className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor={`checkbox-${item.column_name}`}
                  className="font-medium text-gray-700"
                >
                  {/* {item.value} */}
                </label>
                <p
                  id={`checkbox-${item.column_name}-description`}
                  className="text-gray-500"
                >
                  {item.value}
                </p>
              </div>

              <input
                id={`checkbox-${item.column_name}`}
                aria-describedby={`checkbox-${item.column_name}-description`}
                name={`checkbox-${item.column_name}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
}
