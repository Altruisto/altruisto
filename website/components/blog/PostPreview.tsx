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
}

const PostPreview: React.FC<Post> = props => {
    const { data, tags, uid } = props
    
    const { title, main_image, teaser } = data

    const mainTag = tags[0] || 'miscellaneous'
    return <li>
        <Link href={`/blog/${mainTag}/${uid}`}>
            <div>
                {main_image && main_image.url && <div
                    className="cover cover--small my-4 rounded"
                    style={{ backgroundImage: `url(${data.main_image.url})` }}
                />}
                {tags.map(tag => <span className="font-weight-bold small mr-4" key={tag}><a href={`blog/${tag}`}>{tag}</a></span>)}
                {(title && title[0]) ? <h3 className="my-4">{title[0].text}</h3> : null}
                {(teaser && teaser[0]) ? <p className="mb-5">{teaser[0].text}</p> : null}
            </div>
        </Link>
    </li>
}

export default PostPreview