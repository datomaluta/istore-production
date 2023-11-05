import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [
    {
      id: 3,
      brand: "lenovo",
      price: 3000,
      image:
        "https://assets.ee.ge/elit-product-mobile-images/IMG-000056327_11-1.jpg",
      category_id: 2,
      category_name: "pc",
      created_at: "2023-11-02T17:27:18.000000Z",
      updated_at: "2023-11-02T17:27:18.000000Z",
      label: "ULTRA PC Intel G6405 Asus PRIME H510M-K SSD 120GB 8GB",
      stock: 120,
      cpu: "i5",
      ram: "12",
      ssd: "12",
      hdd: "12",
      gpu: "gtx 1080",
      motherboard: "atx",
    },
    {
      id: 4,
      brand: "Dell",
      price: 5000,
      image:
        "https://assets.ee.ge/elit-product-mobile-images/IMG-000029355_18-1.jpg",
      category_id: 2,
      category_name: "pc",
      created_at: "2023-11-02T17:27:18.000000Z",
      updated_at: "2023-11-02T17:27:18.000000Z",
      label:
        "Dell Vostro 3710 Intel I3-12100 8GB 256GB SSD DVD-RW - 210-BCUE_5406",
      stock: 90,
      cpu: "i7",
      ram: "12",
      ssd: "12",
      hdd: "12",
      gpu: "gtx 1080",
      motherboard: "atx",
    },
    {
      id: 1,
      brand: "asus",
      price: 2000,
      image: "https://assets.ee.ge/product_mobile_images/IMG-23889643-1.jpg",
      category_id: 3,
      category_name: "laptop",
      created_at: "2023-11-02T17:27:18.000000Z",
      updated_at: "2023-11-02T17:27:18.000000Z",
      label: "Asus Rogtrix i5-12000 500SSD",
      stock: 100,
      model: "rogtrix",
      cpu: "i5",
      ram: "12",
      ssd: "12",
      hdd: "12",
      gpu: "gtx",
      screen_size: "didi",
      resolution: "1920x1080",
    },
    {
      id: 2,
      brand: "acer",
      price: 4000,
      image: "https://assets.ee.ge/product_mobile_images/IMG-09699183-1.jpg",
      category_id: 3,
      category_name: "laptop",
      created_at: "2023-11-02T17:27:18.000000Z",
      updated_at: "2023-11-02T17:27:18.000000Z",
      label: "Apple Mackbook M1 i9-10500 266SSD",
      stock: 40,

      model: "colemon",
      cpu: "i5",
      ram: "12",
      ssd: "12",
      hdd: "12",
      gpu: "gtx",
      screen_size: "didi",
      resolution: "1920x1080",
    },
    {
      id: 5,
      brand: "samsung",
      price: 7000,
      image:
        "https://assets.ee.ge/product_mobile_images/IMG-000048250_85-1.jpg",
      category_id: 4,
      category_name: "all_in_one",
      created_at: "2023-11-02T17:27:18.000000Z",
      updated_at: "2023-11-02T17:27:18.000000Z",
      label:
        'HP Pavilion 24 23.8" FHD AMD Ryzen 3 5300U 8GB 512GB SSD Win11 Home - 5D247EA',
      stock: 66,
      cpu: "i5",
      ram: "12",
      ssd: "12",
      hdd: "12",
      gpu: "gtx",
      screen_size: "didi",
      resolution: "1920x1080",

      model: "rogtrix",
    },
    {
      id: 6,
      brand: "LG",
      price: 8000,
      image:
        "https://assets.ee.ge/elit-product-mobile-images/IMG-000034461_12-1.jpg",
      category_id: 4,
      category_name: "all_in_one",
      label:
        'HP ProOne 240 G9 23.8" FHD Intel I3-1215U 8GB 256GB SSD - 6D447EA',
      stock: 55,
      cpu: "i3",
      ram: "16",
      ssd: "12",
      hdd: "12",
      gpu: "gtx",
      screen_size: "didi",
      resolution: "1920x1080",
      model: "rogtrix",
    },
  ],
  categoryInfo: [
    {
      id: 2,
      name: "pc",
      parent_id: 1,
    },
    {
      id: 3,
      name: "laptop",
      parent_id: 1,
    },
    {
      id: 4,
      name: "all_in_one",
      parent_id: 1,
    },
  ],
};

export const dummySlice: any = createSlice({
  name: "dummy",
  initialState,
  reducers: {
    addProductToDummy: (state, { payload }) => {
      state.productList.push(payload);
      console.log("this happens");
    },
    editProductInDummy: (state, { payload }) => {
      const products = state.productList.filter(
        (item) => +item.id !== +payload.id
      );
      state.productList = [
        ...products,
        {
          ...payload.data,
          id: payload.id,
          category_id: payload.data.category_id.value,
          category_name: payload.data.category_id.label,
        },
      ];
    },
    deleteProductFromDummy: (state, { payload }) => {
      console.log(payload);
      state.productList = state.productList.filter(
        (item) => +item.id !== +payload
      );
    },
  },
});

export const { addProductToDummy, editProductInDummy, deleteProductFromDummy } =
  dummySlice.actions;

export default dummySlice.reducer;
