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
          {posts.map(posts => {
            return (
              <a key={posts.id} href={posts.space.id} className={styles.card}>
                <h3>{ posts.title }</h3>
                <p><strong>Reactions Count:</strong> { posts.reactionsCount }</p>
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

const API_URL = 'https://squid.subsquid.io/subsocial/graphql'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
});

  
/* define a GraphQL query  */
export const explorePosts = gql`
query MyQuery {
  posts(orderBy: reactionsCount_DESC, limit: 3, where: {createdAtTime_gt: "2023-01-01T00:00:00.000000Z"}) {
    content
    title
    reactionsCount
    sharedPost {
      id
    }
    createdAtTime
    space {
      id
      name
      summary
    }
  }
}
`



