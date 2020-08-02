import React from "react"
import Link from 'next/link'

export interface Props {
    tags: Array<string>
}

const Categories: React.FC<Props> = ({tags}) => {
    return <>
        <h2>Categories</h2>
        <ul className="blog-posts-list mt-4">
            <li>
                <Link href={`/blog/$`}>
                    All
                </Link>
            </li>
            {tags.map(tag => (
                <li className="mt-2" key={tag}>
                    <Link href={`/blog/${tag}`}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    </>
}

export default Categories