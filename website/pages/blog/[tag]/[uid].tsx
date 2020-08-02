import React from "react";
import ErrorPage from 'next/error'
import Prismic from "prismic-javascript"
import PrismicApi from "utils/prismic-api";
import { StandardLayout } from "components/layouts/StandardLayout"
import InstallButton from "components/InstallButton";
import RenderSlices from "components/blog/RenderSlices";
 

interface Props {
    post?: any
    error?: {
        statusCode: number
    }
}

const BlogPost: React.FC<Props> = ({ error, post }) => {
    if (error) {
        return <ErrorPage statusCode={error.statusCode} />
    }

    return (
        <StandardLayout>
            <div className="container blog__post-wrapper pt-4 fill-height">
                <main className="row">
                    <article id={post.uid}>
                        <div className="col-md-8 mx-auto">
                            <header></header>
                        </div>
                        <RenderSlices allSlices={post.data.body}/>
                        <div className="col-md-8 mx-auto">
                            <footer></footer>
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
    ); 

    const post = results[0];
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

export default BlogPost;