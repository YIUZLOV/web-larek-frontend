import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketData {
    basketProducts: IProduct[];
    getCounter: () => number;
    getSumTotal: () => number;
    setSelectProduct(product: IProduct): void;
    deleteProduct(product: IProduct): void;
    clearBasket(): void;
    isProductInBasket(id: string): boolean;
}

export class BasketData implements IBasketData {
    basketProducts: IProduct[];

    constructor() {
        this.basketProducts = [];
    }

    getCounter() {
        return this.basketProducts.length;
    }

    getSumTotal() {
        return this.basketProducts.reduce((sum, product) => sum + product.price, 0)
    }

    setSelectProduct(product: IProduct) {
        this.basketProducts.push(product)
    }

    deleteProduct(product: IProduct) {
        this.basketProducts = this.basketProducts.filter(item => item !== product)
    }

    clearBasket() {
        this.basketProducts = [];
    }

    isProductInBasket(id: string): boolean {
        return this.basketProducts.some(product => product.id === id)
    }
}