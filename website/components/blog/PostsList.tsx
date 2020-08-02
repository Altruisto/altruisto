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
            <main className="row">
                {posts.map((post, index) => <PostPreview key={post.id} index={index} {...post} />)}
            </main>
        </>
    )
}

export default PostsList