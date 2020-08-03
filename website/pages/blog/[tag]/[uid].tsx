import React from "react"
import ErrorPage from 'next/error'
import Prismic from "prismic-javascript"
import PrismicApi from "utils/prismic-api"
import { StandardLayout } from "components/layouts/StandardLayout"
import InstallButton from "components/InstallButton"
import RenderSlices from "components/blog/RenderSlices"
import PostTitle from "components/blog/PostTitle"
import PostFooter from "components/blog/PostFooter"
 

interface Props {
    post?: any
    error?: {
        statusCode: number
    }
}

const BlogPost: React.FC<Props> = ({ error, post }) => {
    const title = post && post.data.title[0]
    const mainImage = post && post.data.main_image
    if (error || !title || !mainImage) {
        return <ErrorPage statusCode={error.statusCode} />
    }    

    console.log(post);
    

    return (
        <StandardLayout>
            <div className="container blog__post-wrapper fill-height">
                <main className="row">
                    <article id={post.uid}>
                        <div className="col-md-12">
                            <header>
                                <PostTitle
                                    title={title}
                                    mainImage={mainImage}
                                    tags={post.tags}
                                />
                            </header>
                        </div>
                        <RenderSlices allSlices={post.data.body}/>
                        <div className="col-md-8 mx-auto">
                            <footer>
                                <PostFooter/>
                            </footer>
                        </div>
                    </article>
                </main>
            </div>
            <InstallButton/>
        </StandardLayout>
    )
}

export async function getServerSideProps({ params }) {
    const { results } = await PrismicApi().query(
        Prismic.Predicates.at('my.blog-post.uid', params.uid)
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

    return {
        props: {
            post
        }
    }
}

export default BlogPost