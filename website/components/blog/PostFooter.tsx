import React from "react"
import { useRouter } from "next/router"

import { FacebookShareButton, TwitterShareButton } from "react-share"

const PostFooter: React.FC = () => {
  const { asPath } = useRouter()
  const shareUrl = "https://altruisto.com" + asPath

  return (
    <div className="blog__post-footer">
      <div className="my-4 d-flex justify-content-center">
        <TwitterShareButton className="mx-3" url={shareUrl}>
          <img src="/images/tw@2x.svg" width="16" height="16" alt="Facebook share" />
        </TwitterShareButton>
        <FacebookShareButton className="mx-2" url={shareUrl}>
          <img src="/images/fb@2x.svg" width="16" height="16" alt="Facebook share" />
        </FacebookShareButton>
      </div>
      <hr />
    </div>
  )
}

export default PostFooter
