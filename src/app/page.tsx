import React from 'react'
import Link from 'next/link'
import Button from './../../components/Button'
import styles from "./../../styles/Post.module.css"

export type Post = {
  id: number;
  content: string;
  user_id: number;
  agree_votes: number;
  disagree_votes: number;
}

const fetchData = async() => {
  const res = await fetch("http://localhost:3001/v1/posts", { cache: "no-store"})
  const result = await res.json()
  return result
}


const Page = async () => {
  const posts: Post[] = await fetchData();
  return (
    <div className={styles.wrapper}>
      <h2>投票アプリ</h2>

      <div className={styles.links}>
        <Link href="/sign_in">ログインフォームへ</Link>
        <Link href="/sign_up">新規登録フォームへ</Link>
        <Link href="/create">新しい質問を投稿</Link>
      </div>

      <div>
      {posts.map((post) => {
        return <article key={post.id} className={styles.post}>
         <h2>{post.content}</h2>
         <h3>同意した人の数は現在、{post.agree_votes}人です</h3>
         <h3>反対した人の数は現在、{post.disagree_votes}人です</h3>
         <Button post_id={post.id} />
        </article>
      })}
      </div>
    </div>
  );
}

export default Page