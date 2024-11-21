// {
//     _rev: 'DZt27G7rSpmkiNQ4NDaBt5',
//     _type: 'show',
//     _id: '3e1f91aa-6a94-4955-b5d5-3d310a7592b1',
//     title: 'great',
//     _updatedAt: '2024-10-14T10:18:00Z',
//     showDate: '2024-10-17T10:17:00.000Z',
//     image: { _type: 'image', asset: [Object] },
//     _createdAt: '2024-10-14T10:17:28Z'
//   }
export interface Shows {
  _id: string;
  title: string;
  _updatedAt: string;
  showDate: string;
  location: string;
  createdAt: string;
}

export interface Products {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isFirst?: boolean;
}

export interface Posts {
  _id: string,
  title: string,
  body: [],
  image: string,
  mainImage: string
  publishedAt: string

}

export interface CartContextType {
  cartItems: Products[];
  addToCart: (product: Products) => void;
  removeFromCart: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;

}

export type Show = {
  _type: "show";
  _id: string;
  _updatedAt: string;
  title: string;
  image: string;
  showDate: string;
  location: string;
  createdAt: string;
};

export type Product = {
  _type: "product";
  _id: string;     
  name: string;
  image: string;
  price: number;
  description: string; 
};

export type Post = {
  _type: "post";
  title: string;
  mainImage: { asset: { url: string } };
};