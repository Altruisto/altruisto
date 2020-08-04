import React from "react"
import Link from 'next/link'

export interface Text {
    type: string 
    text: string
    spans: Array<any>
}

interface MainImg {
    url: string
    dimensions: {
        width: number
        height: number
    }
    alt: string | null
    copyright: string | null
}

export interface PostData {
    title?: Array<Text>
    main_image?: MainImg
    teaser?: Array<Text>
}

export interface Post {
    data: PostData
    tags: Array<string>
    uid: string
    id: string
    index: number
}

interface Props {
    post: Post
    columnsOccupied?: number
    isLargeTitle?: boolean
}

const PostPreview: React.FC<Props> = ({ post, columnsOccupied = 12, isLargeTitle = true}) => {
    const { data, tags, uid, index } = post
    const { title, main_image, teaser } = data

    const mainTag = tags[0] || 'miscellaneous'
    return <article
        id={uid}
        className={`col-md-${columnsOccupied}`}
    >
        {main_image && main_image.url &&
            <Link href={`/blog/${mainTag}/${uid}`}>
                <div
                    className="blog__post-preview-image cover cover--small my-4 blog-rounded"
                    style={{ backgroundImage: `url(${data.main_image.url})` }}
                />
            </Link>
        }
        {tags.map(tag => <span className="font-weight-bold small mr-4" key={tag}><a href={`blog/${tag}`}>{tag}</a></span>)}
        {(title && title[0]) ?
            <Link href={`/blog/${mainTag}/${uid}`}>
                <header>
                    {isLargeTitle ? 
                        <h3 className="my-4 blog__post-preview-title">{title[0].text}</h3>
                        : <h5 className="my-4 blog__post-preview-title">{title[0].text}</h5>
                    }
                </header>
            </Link>
            : null
            }
        {(teaser && teaser[0]) ? <p className="mb-5">{teaser[0].text}</p> : null}
    </article>
}

export default PostPreview