export interface ProductCardPropsType {
  product: {
    id: number;
    brand: string;
    price: number;
    image: string;
    label: string;
    category_id: number | string;
    category_name: any;
  };
}

export type categoryType = {
  id: number;
  name: string;
  parent_id: number;
};
