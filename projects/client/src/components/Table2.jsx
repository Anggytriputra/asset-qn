export default function Table2({
  headCols = [],
  tableBody = null,
  className = "",
}) {
  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th>{""}</th>
                    {headCols.map((col, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        // style={{ width: "600px" }}
                        className={
                          idx === 0
                            ? "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            : "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        }
                      >
                        {col}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                {tableBody}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
