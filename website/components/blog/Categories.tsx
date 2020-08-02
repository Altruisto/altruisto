import React from "react"
import Link from 'next/link'

export interface Props {
    tags: Array<string>
    currentTag?: string
}

const Categories: React.FC<Props> = ({tags, currentTag = 'All'}) => {
    return <aside>
        <h2>Categories</h2>
        <ul className="blog-posts-list mt-4">
            <li>
                <Link href={`/blog`}>
                    <a className={`${currentTag === "All" ? "text-gradient" : ""}`}>All</a>
                </Link>
            </li>
            {tags.map(tag => (
                <li key={tag} className="mt-2">
                    <Link href={`/blog/${tag}`}>
                        <a className={`${currentTag === tag ? "text-gradient" : ""}`}>{tag}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </aside>
}

export default Categories