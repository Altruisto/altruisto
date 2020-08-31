import React from "react"
import ErrorPage from "next/error"
import Prismic from "prismic-javascript"
import PrismicApi, { getBlogMeta, getBlogPostTypes } from "utils/prismic-api"
import { StandardLayout } from "components/layouts/StandardLayout"
import InstallButton from "components/InstallButton"
import RenderSlices from "components/blog/RenderSlices"
import PostTitle from "components/blog/PostTitle"
import PostFooter from "components/blog/PostFooter"
import Recommendation from "components/blog/Recommendation"
import CallToActionSection from "components/CallToActionSection"
import getNestedPropertyFromObject from "lodash.get"

type Props = {
  post?: any
  similarPosts: Array<any>
  error?: {
    statusCode: number
  }
}

const BlogPost: React.FC<Props> = ({ error, post, similarPosts }) => {
  const title = post && post.data.title[0]
  const mainImage = post && post.data.main_image
  if (error || !title || !mainImage) {
    return <ErrorPage statusCode={error.statusCode} />
  }

  const authorName = getNestedPropertyFromObject(post, "data.author.data.name[0].text", null)

  return (
    <StandardLayout withMenu={true}>
      <div className="container blog__post-wrapper fill-height">
        <main className="row">
          <article id={post.uid}>
            <div className="col-md-12">
              <header>
                <PostTitle title={title} mainImage={mainImage} tags={post.tags} />
              </header>
            </div>
            <RenderSlices allSlices={post.data.body} />
            <div className="col-md-8 mx-auto">
              <footer>
                <PostFooter authorName={authorName} />
              </footer>
            </div>
          </article>
        </main>
      </div>
      <Recommendation title="Check Also" posts={similarPosts} />
      <CallToActionSection button={<InstallButton />} />
    </StandardLayout>
  )
}

export async function getServerSideProps({ params }) {
  const { results } = await PrismicApi().query(
    Prismic.Predicates.at("my.blog-post.uid", params.uid),
    { fetchLinks: "author.name" }
  )

  const post = results[0]
  if (!post) {
    return {
      props: {
        error: {
          statusCode: 404
        }
      }
    }
  }

  const [similarPostsQueryData, metaData] = await Promise.all([
    PrismicApi().query(Prismic.Predicates.similar(post.id, 3)),
    getBlogMeta()
  ])
  const blogPostTypes = getBlogPostTypes(metaData)
  const similarPosts = similarPostsQueryData.results
    .filter(({ type }) => blogPostTypes.includes(type))
    .slice(0, 3)

  return {
    props: {
      post,
      similarPosts: similarPosts
    }
  }
}

export default BlogPost
