import { useMemo } from "react"

export default ({ slice }) => {
  const { aligment, image, title1 } = slice.primary
  const text = (aligment[0] && aligment[0].text) || ""
  const imageClassName = useMemo(() => {
    switch (text || "center") {
      case "left":
        return "blog__post-image--left"
      case "right":
        return "blog__post-image--right"
      case "full-width":
        return "blog__post-image--full-width"
      default:
        return "blog__post-image--center"
    }
  }, [text])

  return (
    <figure className={`blog__post-image ${imageClassName}`}>
      <img className="blog--rounded mb-2" src={image.url} alt={image.alt} />
      {title1[0] && title1[0].text && (
        <figcaption className="blog__post-image-caption">{title1[0].text}</figcaption>
      )}
    </figure>
  )
}
