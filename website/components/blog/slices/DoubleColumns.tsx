import { RichText } from "prismic-reactjs"

export default ({ slice }) => (
  <div className="row blog__post-double-columns">
    <div className="col-md-6 blog__post-article">
      <RichText render={slice.primary.left_column} />
    </div>
    <div className="col-md-6 blog__post-article">
      <RichText render={slice.primary.right_column} />
    </div>
  </div>
)
