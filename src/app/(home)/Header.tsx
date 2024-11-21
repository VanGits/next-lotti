import { navigateToPage } from "@/lib/utils";
import React from "react";
import { useCart } from "../context/CartContext";

type Props = {
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
};

const Header = ({ currentPageIndex, setCurrentPageIndex }: Props) => {
  const { setIsCartOpen, cartItems } = useCart();
  return (
    <nav className="Navigation">
      {/* // Home */}
      <button
        onClick={
          // '0' is home
          0 !== currentPageIndex
            ? () => navigateToPage(0, currentPageIndex, setCurrentPageIndex)
            : () => console.log("test")
        }
      >
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
          className="lucide lucide-house"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <p>Home</p>
      </button>
      {/* // Songs */}
      <button
        onClick={
          // '1' is songs
          1 !== currentPageIndex
            ? () => navigateToPage(1, currentPageIndex, setCurrentPageIndex)
            : () => console.log("test")
        }
      >
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
          className="lucide lucide-music-2"
        >
          <circle cx="8" cy="18" r="4" />
          <path d="M12 18V2l7 4" />
        </svg>
        <p>Songs</p>
      </button>
      {/* // Shop */}
      <button
        onClick={
          // '2' is shop
          2 !== currentPageIndex
            ? () => navigateToPage(2, currentPageIndex, setCurrentPageIndex)
            : () => console.log("test")
        }
      >
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
          className="lucide lucide-shopping-basket"
        >
          <path d="m15 11-1 9" />
          <path d="m19 11-4-7" />
          <path d="M2 11h20" />
          <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
          <path d="M4.5 15.5h15" />
          <path d="m5 11 4-7" />
          <path d="m9 11 1 9" />
        </svg>
        <p>Shop</p>
      </button>
      {/* Blogs */}
      <button
        onClick={
          // '3' is blogs
          3 !== currentPageIndex
            ? () => navigateToPage(3, currentPageIndex, setCurrentPageIndex)
            : () => console.log("test")
        }
      >
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
          className="lucide lucide-newspaper"
        >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
        <p>Blogs</p>
      </button>
      <button onClick={() => setIsCartOpen(true)} className="cart-button">
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
        className="lucide lucide-shopping-cart"
      >
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
      <p>Cart</p>
      {cartItems.length > 0&& <span className="cart-item-count">{cartItems.length > 0 && cartItems.length}</span>}
    </button>
    </nav>
  );
};

export default Header;
