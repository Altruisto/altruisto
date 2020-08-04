import React, { useCallback } from "react"
import { useRouter } from "next/router"
import ReactPaginate from "react-paginate"

export interface Pagination {
  page: number
  totalPages: number
}

const Pagination: React.FC<Pagination> = ({ page = 1, totalPages }) => {
  const router = useRouter()
  const pathname = router.asPath.match(/[^?]*/m)[0]

  const handlePageChange = useCallback(
    ({ selected }) => {
      const selectedPage = selected + 1

      if (selectedPage !== page) {
        router.push({
          pathname,
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
        initialPage={page - 1}
        disableInitialCallback={true}
        onPageChange={handlePageChange}
        previousLabel=""
        nextLabel=""
        breakLabel="..."
        containerClassName="blog__pagination pagination"
        pageClassName="blog__pagination__page"
        activeLinkClassName="blog__pagination__active"
        activeClassName="blog__pagination__active"
        previousLinkClassName="blog__pagination__button blog__pagination__previous rounded"
        nextLinkClassName="blog__pagination__button blog__pagination__next rounded"
        disabledClassName="blog__pagination__disabled"
      />
    </div>
  )
}

export default Pagination
