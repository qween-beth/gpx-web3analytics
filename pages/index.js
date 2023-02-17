import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import {useEffect, useState} from "react";

export default function Home() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        client.query({query: explorePosts})
            .then((response) => {
                console.log(response.data?.posts)
                setPosts(response.data?.posts)
            })
            .catch((err) => {
                console.log(err)
            })

    });

    return (
        <div className={styles.container}>
            <Head>
                <title>GPX Analytis For Subsocial</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
            <h1 className={styles.title}>
                     GPX Analytis For Subsocial
                </h1>
            <div className={styles.grid}>
                    {posts && posts.map(post => {
                        return (
                            <a key={post.content} href={post.space.id} className={styles.card}>
                                <div className="page-list">
                                    <div className="data-card">
                                        <h2>Post Count</h2>
                                        <h3>{post.reactionsCount}</h3>
                                    </div>
                                    
                                    </div>
                                        
                                </a>
                        );
                    })}
                </div> 
                <h1 className={styles.title}>
                    Popular Posts & Spaces
                </h1>

                <p className={styles.description}>
                    Latest posts from Subsocial
                </p>

                <div className={styles.grid}>
                    {posts && posts.map(post => {
                        return (
                            <a key={post.content} href={post.space.id} className={styles.card}>
                                <h3>{post.title}</h3>
                                <p>{post.space?.summary}</p>
                                <br/>
                                <p><strong>Space Name: </strong> {post.space?.name}</p>
                                
                                <p><strong>posts Count:</strong> {post.space?.postsCount}</p>
                                <p><strong>Reactions Count:</strong> {post.reactionsCount}</p>
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
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
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
  posts(orderBy: reactionsCount_DESC, limit: 4)
 {
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
      postsCount
    }
  }
}
`



