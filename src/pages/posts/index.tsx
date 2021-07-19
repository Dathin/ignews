import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'
import styles from './styles.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

interface PostsProps {
    posts: {
        slug: string;
        title: string;
        excerpt: string;
        updatedAt: string;
    }[]
}

export default function Posts({posts}: PostsProps){
    const [session] = useSession() as any;

    const postLinkPrefix = session?.activeSubscription ? '/posts/' : '/posts/preview/'

    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>

                {posts.map(post => (
                    <Link key={post.slug} href={`${postLinkPrefix}${post.slug}`}>
                        <a key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    </Link>

                ))}

                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication'),
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100
    })

    const posts = response.results.map(post => ({
        slug: post.uid,
        title: RichText.asText(post.data.title),
        excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }))

    return {
        props: {
            posts
        }
    }
}