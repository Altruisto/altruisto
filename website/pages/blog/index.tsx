import React from "react"
import Prismic from "prismic-javascript"
import PrismicApi, {
  getBlogMeta,
  getBlogTags,
  getMetaTags,
  getDataFromPostsList,
  BlogPages
} from "utils/prismic-api"
import { WithSmallCoverLayout } from "components/layouts/WithSmallCoverLayout"
import PostsList from "components/blog/PostsList"
import { Post } from "components/blog/PostPreview"
import Categories from "components/blog/Categories"
import InstallButton from "components/InstallButton"
import Pagination, { Pagination as PaginationProps } from "components/blog/Pagination"
import CallToActionSection from "components/CallToActionSection"
import { MetaTags } from "components/partials/DefaultHead"
import getNestedPropertyFromObject from "lodash.get"
import ExitIntentModal from "components/ExitIntentModal"

type BlogMainPage = {
  title: string
  supportText: string
}

type BlogList = {
  mainPage: BlogMainPage
  posts: Array<Post>
  tags: Array<string>
  pagination: PaginationProps
  metaTags: MetaTags
}

const BlogList: React.FC<BlogList> = ({ mainPage, posts, tags, pagination, metaTags }) => {
  const { title, supportText } = mainPage

  return (
    <WithSmallCoverLayout
      {...metaTags}
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
          {pagination.totalPages !== 1 ? <Pagination {...pagination} /> : null}
        </div>
      </div>
      <CallToActionSection button={<InstallButton />} />
      <ExitIntentModal />
    </WithSmallCoverLayout>
  )
}

export async function getServerSideProps({ query }) {
  const metaData = await getBlogMeta()
  const blogPostTags = getBlogTags(metaData)

  const [mainPageQueryData, posts] = await Promise.all([
    PrismicApi().query(Prismic.Predicates.at("my.blog-posts-list.blog-page", BlogPages.MainPage)),
    PrismicApi().query(Prismic.Predicates.any("document.type", ["blog-post"]), {
      pageSize: 8,
      page: query.page || 1
    })
  ])

  const mainPage = getNestedPropertyFromObject(mainPageQueryData, "results[0]", {})

  return {
    props: {
      mainPage: getDataFromPostsList(mainPage),
      metaTags: getMetaTags(mainPage),
      posts: posts.results,
      tags: blogPostTags,
      pagination: {
        page: posts.page,
        totalPages: posts.total_pages
      }
    }
  }
}

export default BlogList
