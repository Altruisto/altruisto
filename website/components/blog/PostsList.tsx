import React from "react"
import PostPreview, { Post } from "./PostPreview"

export type Props = {
  title: string
  posts: Array<Post>
}

const PostsList: React.FC<Props> = ({ title, posts }) => {
  const numberOfLargePosts = 2
  return (
    <>
      <h2>{title}</h2>
      <main className="row">
        {posts.map((post, index) => {
          const isLarge = index < numberOfLargePosts
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
