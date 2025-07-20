import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";
import themeSlice from "./slices/themeSlice";
import blogSlice from "./slices/blogSlice";
import authSlice from "./slices/authSlice";
import contactSlice from "./slices/contactSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import categorySlice from "./slices/categorySlice";
import vnpaySlice from "./slices/vnpaySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    book: bookSlice,
    theme: themeSlice,
    blog: blogSlice,
    contact: contactSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    category: categorySlice,
    vnpay: vnpaySlice,
  },
});
