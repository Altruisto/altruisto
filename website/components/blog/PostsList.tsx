import React from "react"
import PostPreview, { Post } from "./PostPreview"

export interface Props {
    title: string
    posts: Array<Post>
}

const PostsList: React.FC<Props> = ({ title, posts }) => {
    
    return (
        <>
            <h2>{title}</h2>
            <ul className="blog-posts-list">
                {posts.map(post => <PostPreview key={post.id} {...post} />)}
            </ul>
        </>
    )
}

export default PostsList