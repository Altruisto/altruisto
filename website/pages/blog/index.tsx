import React from "react"
import Prismic from "prismic-javascript"
import PrismicApi, { getBlogMeta, getBlogPostTypes, getBlogTags } from "utils/prismic-api"
import { WithSmallCoverLayout } from "components/layouts/WithSmallCoverLayout"
import PostsList from "components/blog/PostsList"
import { Post } from "components/blog/PostPreview"
import Categories from "components/blog/Categories"
import InstallButton from "components/InstallButton"
import Pagination from "components/blog/Pagination"

interface BlogMainPage {
  title: string
  supportText: string
}

interface Pagination {
  page: number
  totalPages: number
  prevPage: string
  nextPage: string
}

interface Props {
  mainPage: BlogMainPage
  posts: Array<Post>
  tags: Array<string>
  pagination: Pagination
}

const BlogList: React.FC<Props> = ({ mainPage, posts, tags, pagination }) => {
  const { title, supportText } = mainPage

  return (
    <WithSmallCoverLayout
      coverContent={
        <div className="text-left container">
          <div className="py-5 col-sm-8">
            {title ? <h1 className="mb-4 text-white">{title}</h1> : null}
            {supportText ? <p>{supportText}</p> : null}
          </div>
        </div>
      }
      withMenu
      backgroundImage="url(/images/blog-background.png)"
    >
      <div className="mt-5 row">
        <div className="col-sm-3 ml-auto order-sm-2">
          <Categories tags={tags} />
        </div>
        <div className="col-sm-8">
          <PostsList title="Latest Posts" posts={posts} />
        </div>
        <div className="col-sm-8 order-sm-3">
          <Pagination {...pagination} />
        </div>
      </div>
      <InstallButton />
    </WithSmallCoverLayout>
  )
}

export async function getServerSideProps({ query }) {
  const metaData = await getBlogMeta()
  const blogPostTypes = getBlogPostTypes(metaData)
  const blogPostTags = getBlogTags(metaData)

  const [mainPage, posts] = await Promise.all([
    PrismicApi().query(Prismic.Predicates.at("document.type", "blog-main-page")),
    PrismicApi().query(Prismic.Predicates.any("document.type", blogPostTypes), {
      pageSize: 2,
      page: query.page || 1
    })
  ])

  return {
    props: {
      mainPage: {
        title: mainPage.results[0].data["blog-title"][0].text,
        supportText: mainPage.results[0].data["blog-support-text"][0].text
      },
      posts: posts.results,
      tags: blogPostTags,
      pagination: {
        page: posts.page,
        totalPages: posts.total_pages,
        prevPage: posts.prev_page,
        nextPage: posts.next_page
      }
    }
  }
}

export default BlogList
