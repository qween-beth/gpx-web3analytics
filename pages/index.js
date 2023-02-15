import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Subsocial Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Subsocial Posts
        </h1>

        <p className={styles.description}>
          Latest posts from Subsocial
        </p>

        <div className={styles.grid}>
          {posts.map(post => {
            return (
              <a key={post.id} href={post.space.id} className={styles.card}>
                <h3>{ post.title }</h3>
                <p><strong>Reactions Count:</strong> { post.reactionsCount }</p>
              </a>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://squid.subsquid.io/subsocial/graphql',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query myQuery {
        post (orderBy: reactionsCount_DESC, limit: 3, where: {createdAtTime_gt: "2022-01-01T00:00:00.000000Z"}) {
            id
            content
            title
            reactionsCount
            createdAtTime
            space {
              id
              name
              summary
            }
          }
        }
        `
  });

  return {
    props: {
      posts: data.post
    }
  }
}
