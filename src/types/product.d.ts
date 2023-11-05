export interface Product {
  id: number;
  brand: string;
  price: number;
  image: string;
  label: string;
  stock: number;
  category_id: number | string;
  category_name: any;
}
