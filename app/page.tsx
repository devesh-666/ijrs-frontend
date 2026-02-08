"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL!
        );

        if (!res.ok) {
          throw new Error("API not reachable");
        }

        const text = await res.text();

        // Safety check
        if (text.startsWith("<")) {
          throw new Error("HTML received instead of JSON");
        }

        const data = JSON.parse(text);
        setPosts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>IJRS Posts</h1>

      {posts.length === 0 && <p>No posts loaded</p>}

      {posts.map((post) => (
        <div key={post.id}>
          <h3
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
        </div>
      ))}
    </main>
  );
}
