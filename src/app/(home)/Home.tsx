"use client";
import { useEffect, useRef, useState } from "react";
import Banner from "@/components/banner";
import Extras from "@/components/extras";
import LottiInfo from "@/components/lotti-info";
import LottiWho from "@/components/lotti-who";
import SongsGrid from "@/components/songs-grid";
import MusicPlayer from "@/ui/music-player";
import { emojis } from "@/lib/constants";
import { showNextPage, showPrevPage } from "@/lib/utils";
import Header from "./Header";
import Link from "next/link";
import { Posts, Products, Shows } from "@/lib/types";
import Show from "@/ui/show";
import Product from "@/ui/product";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "@/components/cart-sidebar";
import ShowCalendar from "@/components/show-calendar";
import Image from "next/image";
import PostItem from "@/components/post-item";
import MobilePlayer from "@/ui/mobile-player";

interface HomeClientProps {
  shows: Shows[];
  products: Products[];
  posts: Posts[];
}

export default function HomeClient({
  shows,
  products,
  posts,
}: HomeClientProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const bodyRef = useRef<HTMLElement>(null);
  // Displays first page
  useEffect(() => {
    const pages = document.querySelectorAll(".page");
    pages[currentPageIndex].classList.add("active-next");
  }, [currentPageIndex]);

  // Falling emoji effect
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const createFallingEmoji = () => {
      if (!bodyRef.current) return;

      // Create emoji element
      const emoji = document.createElement("div");
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.classList.add("falling-emoji");

      // Get precise container width
      const containerWidth = bodyRef.current.clientWidth;
      const emojiWidth = 32; // Approximate width of an emoji

      // Calculate safe horizontal placement
      const randomLeft = Math.max(
        0,
        Math.min(
          Math.random() * (containerWidth - emojiWidth),
          containerWidth - emojiWidth
        )
      );

      // Style the emoji
      emoji.style.position = "absolute";
      emoji.style.left = `${randomLeft}px`;
      emoji.style.top = `0px`;
      emoji.style.fontSize = "2rem";
      emoji.style.zIndex = "9999";
      emoji.style.pointerEvents = "none";
      emoji.style.willChange = "transform";

      // Append to container
      bodyRef.current.appendChild(emoji);

      // Randomize fall parameters
      const duration = Math.random() * 5 + 5;
      const rotation = Math.random() * 360;

      // Animate falling
      emoji.style.transition = `transform ${duration}s linear`;
      setTimeout(() => {
        emoji.style.transform = `translateY(${bodyRef?.current?.clientHeight}px) rotate(${rotation}deg)`;
      }, 600);

      // Remove emoji after animation
      setTimeout(() => {
        emoji.remove();
      }, duration * 1000);
    };

    const interval = setInterval(createFallingEmoji, 600);

    // Cleanup
    return () => clearInterval(interval);
  }, [emojis]);
  return (
    <CartProvider>
      <main ref={bodyRef}>
        <Header
          currentPageIndex={currentPageIndex}
          setCurrentPageIndex={setCurrentPageIndex}
        />
        <CartSidebar />
        <section id="section">
          <div id="page-1" className="page">
            <Banner />
            <LottiInfo />
            <ShowCalendar shows={shows} />
            {/* <Extras /> */}
          </div>
          {!isMobile ? (
            <div id="page-2" className="page">
              <LottiWho />

              <div className="lotti-songs">
                <MusicPlayer
                  image="/assets/songs/lemmegetthisstr8.jpg"
                  title="lemme get this str8"
                  id="lemme"
                  song="/assets/audios/lemme.mp3"
                />
                <SongsGrid />
              </div>
              <div className="lotti-songs-2">
                <MusicPlayer
                  image="/assets/songs/sino.jpg"
                  title="Sino"
                  song="/assets/audios/sino.mp3"
                  id="sino"
                />
                <MusicPlayer
                  image="/assets/songs/notbadafterall.jpg"
                  title="Not Bad"
                  song="/assets/audios/notbad.mp3"
                  id="notbad"
                />
              </div>
            </div>
          ) : (
            <div id="page-2" className="page">
              <MobilePlayer/>
            </div>
          )}
          <div id="page-3" className="page">
            <div className="products-wrapper">
              <h1>4. Shop</h1>
              <div className="products">
                {products?.[0] && (
                  <Product
                    _id={products[0]._id}
                    key={products[0]._id}
                    name={products[0].name}
                    image={products[0].image}
                    price={products[0].price}
                    description={products[0].description}
                    isFirst={true}
                  />
                )}
                <div className="products-grid">
                  {products.slice(1).map((product) => (
                    <Product
                      _id={product._id}
                      key={product._id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      description={product.description}
                      isFirst={false}
                    />
                  ))}
                </div>
              </div>
              <h4 className="shop-desc">
                Lotti’s eCommerce shop is a reflection of my journey. It’s a
                tapestry woven with pieces of my heart, infused with the essence
                of the women who have shaped me. My mother’s grace is in Lotti.
                My grandmother’s resilience lives in every product. Lotti
                carries the stories of the women who have inspired me—their
                triumphs, their struggles, their dreams. Lotti is more than a
                shop; it’s a celebration. | to create | to inspire | to connect
                | | to cherish | She’s vibrant. She’s whimsical. She’s strong.
                She’s vulnerable. She’s discovery. She’s joy. She’s connection.
                That’s Lotti.
              </h4>
            </div>
          </div>
          <div id="page-4" className="page">
            <h1>5. Blogs</h1>
            <div className="blogs-grid">
              {posts.map((post) => (
                <PostItem
                  key={post._id}
                  _id={post._id}
                  title={post.title}
                  image={post.image}
                  date={post.publishedAt}
                />
              ))}
            </div>
          </div>
          <Link href="/studio">
            <button id="login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-in"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
              <p>Log In</p>
            </button>
          </Link>
        </section>
      </main>
    </CartProvider>
  );
}
