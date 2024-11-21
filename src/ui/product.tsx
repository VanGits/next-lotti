import Image from "next/image";
import React, { useState } from "react";
import ProductModal from "./product-modal";
import { Products } from "@/lib/types";

type Props = Products & {
  isFirst: boolean;
};

const Product = ({ _id, name, image, price, description, isFirst }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={`product ${isFirst ? "first-product" : ""}`}>
      <div className="image-wrapper">
        <button onClick={() => setIsModalOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <Image
          src={image}
          alt={name}
          height={isFirst ? 670 : 300}
          width={isFirst ? 670 : 300}
        />
      </div>

      <div className="product-details">
        <p>{name}</p>
        <p id="price">${price.toFixed(2)}</p>
      </div>
      {isModalOpen && (
        <ProductModal
          _id={_id}
          name={name}
          image={image}
          price={price}
          description={description}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Product;
