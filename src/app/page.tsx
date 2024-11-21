import { client } from "@/sanity/lib/client";
import HomeClient from "./(home)/Home";
import { Product, Show } from "@/lib/types";

export default async function Home() {
  const options = { next: { revalidate: 3 } };

  const query = `*[_type == "show" || _type == "product"]{
    ...,
    "image": image.asset->url
  }`;

  const blogQuery = `*[_type == "post"]{
    ...,
     "image": mainImage.asset->url
  }`;

  // Fetch data on the server
  const items = await client.fetch(query, {}, options);
  // BLOGS
  const posts = await client.fetch(blogQuery, {}, options);

  // Separate shows and products with proper types
  const shows: Show[] = items.filter((item: Show | Product) => item._type === "show");
  const products: Product[] = items.filter((item: Show | Product) => item._type === "product");

  return (
    <div className="wrapper">
      <HomeClient shows={shows} products={products} posts={posts} />
    </div>
  );
}
