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
        {posts.map((post, index) => {
          const isLarge = index < 2
          return (
            <PostPreview
              key={post.id}
              columnsOccupied={isLarge ? 12 : 6}
              isLargeTitle={isLarge}
              post={post}
            />
          )
        })}
      </main>
    </>
  )
}

export default PostsList
