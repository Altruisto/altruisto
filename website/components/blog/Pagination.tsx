import React from "react"
import Link from "next/link"

export interface Pagination {
    page: number
    totalPages: number
    prevPage: string
    nextPage: string
}

const Pagination: React.FC<Pagination> = ({ page, totalPages, prevPage, nextPage }) => {
    const areAllPagesRenderable = totalPages <= 5;

    

    return (
        <div className="my-4 d-flex justify-content-center">
            <Link href={`?page=${page-1}`}>
                <img src="/images/page_prev@2x.svg" width="16" height="16" alt="Facebook share" />
            </Link>
            <Link href={`?page=${page+1}`}>
                <img src="/images/page_next@2x.svg" width="16" height="16" alt="Facebook share" />
            </Link>
        </div>
    )
}

export default Pagination