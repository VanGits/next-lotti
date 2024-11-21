import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default async function BlogPost({ params }: { params: { id: string } }) {
  const options = { next: { revalidate: 3 } };
  const post = await client.fetch(
    `*[_type == "post" && _id == $id][0]{
      title,
      "image": mainImage.asset->url,
      body,
      publishedAt,
      "author": author->name
    }`,
    { id: params.id },
    options
  );
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="blog-post">
      <div className="blog-content">
        <Link href="/">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-big-left"
          >
            <path d="M18 15h-6v4l-7-7 7-7v4h6v6z" />
          </svg>{" "}
          Back
        </Link>
        <div className="blog-image-wrapper">
          <Image
            src={post.image}
            alt={post.title}
            objectFit="cover"
            fill
            className="blog-image"
          />
        </div>
        <h1>{post.title}</h1>
        <div className="profile">
          <Image
            src="/assets/sample-pic.png"
            width={50}
            height={50}
            alt="pfp"
          />
          <p>By Lotti</p>
          <p> / </p>
          {post.publishedAt && (
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          )}
        </div>
       
        <div className="content">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
