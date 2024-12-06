# Lotti's Playground Documentation

⚠️ DEVELOPMENT STATUS: NOT PRODUCTION READY ⚠

This project is currently in active development and is **not** ready for production use. Several critical features are still being implemented or refined.

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Key Features](#key-features)
5. [Setup & Installation](#setup--installation)
6. [Content Management](#content-management)
7. [Components & Features](#components--features)
8. [Styling](#styling)
9. [Data Models](#data-models)

## Overview
Lotti's Playground is a Next.js-based web application for a music artist named Lotti. The application serves as a platform to showcase music, merchandise, shows, and blog posts. It features a modern, interactive design with a content management system powered by Sanity.io.

## Project Structure
```
src/
├── app/
│   ├── (home)/
│   ├── blog/
│   ├── studio/
│   └── context/
├── components/
├── lib/
├── sanity/
│   ├── lib/
│   └── schemaTypes/
└── ui/
```

## Tech Stack
- **Frontend**: Next.js 14
- **Content Management**: Sanity.io
- **Styling**: CSS Modules
- **TypeScript**: For type safety
- **State Management**: React Context API
- **Payment Processing**: Stripe (integrated)

## Key Features

### 1. Content Management
The project uses Sanity.io for content management with defined schemas for:
- Blog posts
- Products
- Shows
- Authors
- Customers
- Orders

Reference schema example:

```4:65:src/sanity/schemaTypes/postType.ts
export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
```


### 2. Shopping Cart
Implements a full-featured shopping cart system using Context API:

```1:78:src/app/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Products } from "@/lib/types";

interface CartItem extends Products {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Products) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Products) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
```


Features include:
- Add/remove items
- Quantity management
- Persistent cart state
- Sliding cart sidebar

### 3. Dynamic Routing
Blog posts and other content use dynamic routing for SEO-friendly URLs:

```1:4:src/app/blog/[id]/page.tsx
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
```


## Setup & Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server:
```bash
npm run dev
```

## Content Management

### Sanity Studio Integration
The project includes a built-in Sanity Studio at `/studio` route:

```1:19:src/app/studio/[[...tool]]/page.tsx
/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```


### Content Validation
Products and shows have built-in validation rules:

```29:37:src/sanity/schemaTypes/product.ts
  validation: (Rule) => 
    Rule.custom(async (_, context) => {
      const client = context.getClient({apiVersion: '2023-05-03'})
      const count = await client.fetch('count(*[_type == "product"])')
      return count > 7 
        ? 'Only 7 products are allowed. Please delete an existing product before adding a new one.'
        : true
    })
});
```


## Components & Features

### 1. Layout System
Uses a custom layout system with font optimization:

```1:62:src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";


const Courgette = localFont({
  src: "./fonts/Courgette-Regular.ttf",
  variable: "--font-courgette",
});
const Halant = localFont({
  src: [
    {
      path: './fonts/Halant-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Halant-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Halant-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Halant-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Halant-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-halant',
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});
export const metadata: Metadata = {
  title: "Lotti's Playground",
  description: "Music, Videos, Shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Courgette.variable} ${Halant.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
```


### 2. Home Page
The home page features:
- Music player
- Show calendar
- Product showcase
- Blog posts grid

### 3. Cart System
Implements a full shopping cart with:
- Real-time updates
- Quantity controls
- Total calculation
- Checkout integration

## Styling

### Global Styles
The project uses a comprehensive CSS system:

```1:50:src/app/globals.css
/* ----------------------------------------------------- GENERAL  ----------------------------------------------------- */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

body {
  /* 72a275 */
  background: #72a275;
  overflow: hidden;
  height: 100vh;
  /* cursor: none; */
}
main{
  overflow: hidden;
}
.cursor {
  position: absolute;
  pointer-events: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(235, 147, 16, 0.8);
  transition: transform 0.1s ease;
  z-index: 1000;
}


.Navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9999 !important;
  position: absolute;
  gap: 1rem;
  top: 1rem;
  left: 1rem;
  font-family: var(--font-halant);
}

.Navigation button,
#section button {
  color: white;
```


Key features:
- Responsive design
- Custom cursor
- Animations
- Mobile optimization

## Data Models

### Product Type
```typescript
type Product = {
  _type: "product";
  _id: string;     
  name: string;
  image: string;
  price: number;
  description: string; 
};
```

### Show Type
```typescript
type Show = {
  _type: "show";
  _id: string;
  _updatedAt: string;
  title: string;
  image: string;
  showDate: string;
  location: string;
  createdAt: string;
};
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
This project is private and all rights are reserved.

For more detailed information about specific components or features, please refer to the inline documentation within the code files.
