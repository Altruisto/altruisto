import Article from "./slices/Article"
import Quote from "./slices/Quote"
import Image from "./slices/Image"
import Embed from "./slices/Embed"
import DoubleColumns from "./slices/DoubleColumns"

const RenderSlices = ({ allSlices }) => {
  return (
    <>
      {allSlices.map((slice, index) => {
        switch (slice.slice_type) {
          case "article":
            return (
              <div className="col-md-8 mx-auto blog__post-article" key={"slice-" + index}>
                <Article slice={slice} />
              </div>
            )
          case "image":
            return (
              <div className="col-md-8 mx-auto" key={"slice-" + index}>
                <Image slice={slice} />
              </div>
            )
          case "quote":
            return (
              <div className="col-md-8 mx-auto" key={"slice-" + index}>
                <Quote slice={slice} />
              </div>
            )
          case "double_columns":
            return (
              <div className="col-md-8 mx-auto container" key={"slice-" + index}>
                <DoubleColumns slice={slice} />
              </div>
            )
          case "embed":
            return (
              <div className="col-md-12" key={"slice-" + index}>
                <Embed slice={slice} />
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}

export default RenderSlices
