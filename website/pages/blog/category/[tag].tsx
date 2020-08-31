import React from "react"
import Prismic from "prismic-javascript"
import PrismicApi, { getBlogMeta, getBlogPostTypes, getBlogTags } from "utils/prismic-api"
import { WithSmallCoverLayout } from "components/layouts/WithSmallCoverLayout"
import PostsList from "components/blog/PostsList"
import { Post } from "components/blog/PostPreview"
import Categories from "components/blog/Categories"
import InstallButton from "components/InstallButton"
import Pagination, { Pagination as PaginationProps } from "components/blog/Pagination"
import CallToActionSection from "components/CallToActionSection"
import getNestedPropertyFromObject from "lodash.get"

type BlogMainPage = {
  title: string
  supportText: string
}

type Props = {
  mainPage: BlogMainPage
  posts: Array<Post>
  tags: Array<string>
  currentTag?: string
  pagination: PaginationProps
}

const BlogList: React.FC<Props> = ({ mainPage, posts, tags, currentTag, pagination }) => {
  const { title, supportText } = mainPage
  const isMoreThanOnePage = pagination.totalPages > 1
  return (
    <WithSmallCoverLayout
      coverContent={
        <div className="text-left container">
          {title ? <h1 className="text-white">{title}</h1> : null}
          {supportText ? <p>{supportText}</p> : null}
        </div>
      }
      withMenu
      backgroundImage="url(/images/blog-background.png)"
    >
      <div className="mt-5 row">
        <div className="col-sm-3 ml-auto order-sm-2">
          <Categories tags={tags} currentTag={currentTag} />
        </div>
        <div className="col-sm-8">
          <PostsList title={`Posts about: ${currentTag}`} posts={posts} />
        </div>
        <div className="col-sm-8 order-sm-3">
          {isMoreThanOnePage ? <Pagination {...pagination} /> : null}
        </div>
      </div>
      <CallToActionSection button={<InstallButton />} />
    </WithSmallCoverLayout>
  )
}

export async function getServerSideProps({ query }) {
  const metaData = await getBlogMeta()
  const blogPostTags = getBlogTags(metaData)
  const currentTag = query.tag

  const [mainPage, posts] = await Promise.all([
    PrismicApi().query(Prismic.Predicates.at("document.type", "blog-main-page")),
    PrismicApi().query(Prismic.Predicates.at("document.tags", [currentTag]), {
      pageSize: 8,
      page: query.page || 1
    })
  ])

  return {
    props: {
      mainPage: {
        title: getNestedPropertyFromObject(mainPage, 'results[0].data["blog-title"][0].text', ""),
        supportText: getNestedPropertyFromObject(
          mainPage,
          'results[0].data["blog-support-text"][0].text',
          ""
        )
      },
      posts: posts.results,
      tags: blogPostTags,
      currentTag,
      pagination: {
        page: posts.page,
        totalPages: posts.total_pages
      }
    }
  }
}

export default BlogList
