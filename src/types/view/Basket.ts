import { AddedProductData } from "./AddedProduct";

export interface BasketData {
    pooducts: AddedProductData[];
    totalPrice: number;
}

export interface BasketSettings {
    pooducts: AddedProductData[];
    totalPrice: number;
}