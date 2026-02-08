"use client";

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>International Journal of Research</h1>

      {posts.map((post: any) => (
        <article key={post.id} style={{ marginBottom: "2rem" }}>
          <h2
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </article>
      ))}
    </main>
  );
}
