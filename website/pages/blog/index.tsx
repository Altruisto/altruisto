import React from "react";
import Prismic from "prismic-javascript"
import PrismicApi, {getBlogMeta, getBlogPostTypes, getBlogTags} from "../../utils/prismic-api";
import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import PostsList from "../../components/blog/PostsList"
import { Post } from "../../components/blog/PostPreview"
import Categories from "../../components/blog/Categories"

interface BlogMainPage {
    title: string
    supportText: string
}

interface Props {
    mainPage: BlogMainPage
    posts: Array<Post>
    tags: Array<string>
}

const BlogList: React.FC<Props> = ({ mainPage, posts, tags }) => {
    const { title, supportText } = mainPage
    console.log(tags);
    
    return (
        <WithSmallCoverLayout
            coverContent={
                <div className="text-left container">
                    {title ? <h1 className="text-white">{title}</h1>: null}    
                    {supportText ? <p>{supportText}</p> : null}
                </div>
            }
            backgroundImage="url(/images/blog-background.png)"
        >
            <div className="row">
                <div className="col-sm-8">
                    <PostsList
                        title="Latest Posts"
                        posts={posts}
                    />
                </div>
                <div className="col-sm-3 ml-auto">
                    <Categories
                        tags={tags}
                    />
                </div>
            </div>
        </WithSmallCoverLayout>
    )
}

export async function getServerSideProps({ query }) {
    const metaData = await getBlogMeta();
    const blogPostTypes = getBlogPostTypes(metaData);
    const blogPostTags = getBlogTags(metaData);

    const [ mainPage, posts ] = await Promise.all([
        PrismicApi().query(
            Prismic.Predicates.at('document.type', 'blog-main-page')
        ),
        PrismicApi().query(
            Prismic.Predicates.any('document.type', blogPostTypes),
            { pageSize : 10, page: query.page || 1 }
        )
    ]);
    
    

    return {
        props: {
            mainPage: {
                title: mainPage.results[0].data['blog-title'][0].text,
                supportText: mainPage.results[0].data['blog-support-text'][0].text
            },
            posts: posts.results,
            tags: blogPostTags
        }
    }
}

export default BlogList;