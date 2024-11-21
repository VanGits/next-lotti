import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Props = {
  _id: string;
  title: string;
  image: string;
  date: string;
};

const PostItem = ({ _id, title, image, date }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check window size when component mounts
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <Link href={`/blog/${_id}`} className="post-item">
      <div className="post-item">
        <Image
          src={image}
          width={500}
          height={350}
          alt={title}
          layout={isMobile ? "responsive" : ""}
        />
        <h2>{title}</h2>
        <div className="profile">
          <Image
            src="/assets/sample-pic.png"
            width={30}
            height={30}
            alt="pfp"
          />
          <p>By Lotti</p>
          <p> / </p>
          {date && <p>{new Date(date).toLocaleDateString()}</p>}
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
