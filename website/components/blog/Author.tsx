import React from "react"

type Props = {
  name: string
}

const Author: React.FC<Props> = ({ name }) => (
  <div>
    <p className="blog__post-footer-author-name m-0">
      <a>{name}</a>
    </p>
    <p className="small m-0">
      <a>Author</a>
    </p>
  </div>
)

export default Author
