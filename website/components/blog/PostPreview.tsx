import React from "react"
import Link from 'next/link'

export interface Text {
    type: string //TODO: enum
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
    index: number
}

const PostPreview: React.FC<Post> = props => {
    const { data, tags, uid, index } = props
    const { title, main_image, teaser } = data

    const isLarge = index < 2;

    const mainTag = tags[0] || 'miscellaneous'
    return <article
        id={uid}
        className={isLarge ? "col-md-12" : "col-md-6"}
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
                    {isLarge ? 
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