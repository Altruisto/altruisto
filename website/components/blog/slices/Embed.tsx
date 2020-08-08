import { useMemo, useCallback } from "react"

export default ({ slice }) => {
  const switchEmbedSizeToCssClass = useCallback(
    (iFrameHtml) =>
      iFrameHtml
        .replace(/width.*?" /g, "")
        .replace(/height.*?" /g, 'class="embed-responsive-item" '),
    []
  )

  const embedHTML = useMemo(() => switchEmbedSizeToCssClass(slice.primary.embed.html), [
    slice.primary.embed.html
  ])

  return (
    <div
      className="blog__post-embed embed-responsive embed-responsive-16by9 blog--rounded"
      dangerouslySetInnerHTML={{ __html: embedHTML }}
    />
  )
}
