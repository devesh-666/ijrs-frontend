"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!posts.length) return <p>Loading...</p>;

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      ))}
    </div>
  );
}
