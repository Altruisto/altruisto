import React from "react";
import ErrorPage from 'next/error'
import { RichText } from "prismic-reactjs"
import Prismic from "prismic-javascript"
import PrismicApi from "../../../utils/prismic-api";
import { WithFullCoverLayout } from "../../../components/layouts/WithFullCoverLayout"
 

interface Props {
    post?: any
    error?: {
        statusCode: number
    }
}

const BlogList: React.FC<Props> = ({ error, post }) => {
    if (error) {
        return <ErrorPage statusCode={error.statusCode} />
    }

    console.log(post);
    

    return (
        <WithFullCoverLayout
            backgroundImage="url(/images/blog-background.png)"
        >
        </WithFullCoverLayout>
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

export default BlogList;