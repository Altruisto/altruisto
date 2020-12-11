import React from "react"
import Link from "next/link"

type Props = {
  title: {
    text?: string
  }
  mainImage: {
    url?: string
    alt?: string
    dimensions: {
      width?: number
      height?: number
    }
  }
  tags: Array<string>
}

const PostTitle: React.FC<Props> = ({ title, mainImage, tags }) => {
  return (
    <div
      className="cover with-overlay blog--rounded blog__post-title"
      style={{ backgroundImage: `url(${mainImage.url})` }}
    >
      <div className="col-md-8 position-static">
        <Link href="/blog">
          <a className="blog__post-title__back-button text-white text-uppercase">
            <img
              src="/images/arrow_left@2x.svg"
              className="mr-2"
              width="10"
              height="10"
              alt="back to blog"
            />
            <small>back to blog</small>
          </a>
        </Link>
        {tags.map((tag) => (
          <span key={tag}>
            <strong>
              <a href={`/blog/category/${tag}`} className="mr-4 text-white">
                {tag}
              </a>
            </strong>
          </span>
        ))}
        {title.text && <h1 className="my-4 text-white">{title.text}</h1>}
      </div>
    </div>
  )
}

export default PostTitle
