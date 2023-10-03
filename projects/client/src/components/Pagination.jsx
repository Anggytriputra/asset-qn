import { useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({
  itemsPerPage = 6,
  itemsInPage,
  totalItems,
  totalPages = 0,
  currentPage,
  setCurrentPage,
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = startItem + itemsInPage - 1;
  // console.log("total itrm", totalItems);
  // console.log("total itemsInPage", itemsInPage);

  useEffect(() => {
    if (totalPages && currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, setCurrentPage, totalPages]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  if (totalPages === 0) return null;
  return (
    <>
      <div className="flex gap-4 items-center border-t border-gray-200 justify-between">
        <p className=" text-gray-700">
          Showing <span className="font-bold">{startItem}</span> to{" "}
          <span className="font-bold">{endItem}</span> of{" "}
          <span className="font-bold">{totalItems}</span> results
        </p>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="react-paginate"
          pageClassName="paginate-page-num-container"
          breakLinkClassName="paginate-break"
          pageLinkClassName="paginate-page-num"
          previousLinkClassName="paginate-prev-btn"
          nextLinkClassName="paginate-next-btn"
          activeClassName="paginate-active"
        />
      </div>
    </>
  );
}
