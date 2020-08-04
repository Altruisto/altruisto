import React, { useCallback } from "react"
import { useRouter } from "next/router"
import ReactPaginate from "react-paginate"

export interface Pagination {
  page: number
  totalPages: number
  prevPage: string
  nextPage: string
}

const Pagination: React.FC<Pagination> = ({ page, totalPages, prevPage, nextPage }) => {
  const router = useRouter()

  const handlePageChange = useCallback(
    ({ selected }) => {
      const selectedPage = selected + 1

      if (selectedPage !== page) {
        router.push({
          pathname: router.pathname,
          query: { page: selectedPage }
        })
      }
    },
    [router.asPath]
  )

  return (
    <div className="my-4 d-flex justify-content-center">
      <ReactPaginate
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        initialPage={page || 1}
        onPageChange={handlePageChange}
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  )
}

export default Pagination
