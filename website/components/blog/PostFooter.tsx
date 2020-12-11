import React from "react"
import { useRouter } from "next/router"
import { FacebookShareButton, TwitterShareButton } from "react-share"
import Author from "./Author"

type Props = {
  authorName?: string
}

const PostFooter: React.FC<Props> = ({ authorName }) => {
  const { asPath } = useRouter()
  const shareUrl = "https://altruisto.com" + asPath

  return (
    <div className="blog__post-footer">
      <div className="my-4 d-flex justify-content-between">
        {authorName && <Author name={authorName} />}
        <div className="d-flex ml-md-auto">
          <TwitterShareButton className="mx-3" url={shareUrl}>
            <img src="/images/tw@2x.svg" width="16" height="16" alt="Facebook share" />
          </TwitterShareButton>
          <FacebookShareButton className="mx-2" url={shareUrl}>
            <img src="/images/fb@2x.svg" width="16" height="16" alt="Facebook share" />
          </FacebookShareButton>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default PostFooter
