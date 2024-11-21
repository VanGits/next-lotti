import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

type ProductModalProps = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductModal: React.FC<ProductModalProps> = ({
  _id,
  name,
  image,
  price,
  description,
  setIsModalOpen,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsModalOpen]);
  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={() => setIsModalOpen(false)}>
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
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div className="modal-img-wrapper">
          <Image src={image} alt={name} width={400} height={400} />
        </div>
        <div className="modal-details-wrapper">
          <h2>{name}</h2>
          <p className="price">${price.toFixed(2)}</p>
          <p className="description">{description}</p>
          <button
            className="add-to-cart-button"
            onClick={() => addToCart({ _id, name, image, price, description })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
