import React from "react"
import PostPreview, { Post } from "./PostPreview"

export type Props = {
  title: string
  posts: Array<Post>
}

const Recommendation: React.FC<Props> = ({ title, posts }) => {
  if (posts.length === 0) return null

  return (
    <section className="my-5 container">
      <h2>{title}</h2>
      <main className="row">
        {posts.map((post) => (
          <PostPreview key={post.id} columnsOccupied={4} isLargeTitle={false} post={post} />
        ))}
      </main>
    </section>
  )
}

export default Recommendation
