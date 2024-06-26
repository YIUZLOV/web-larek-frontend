import { IProduct } from "../../types";

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
        this.basketProducts = []
    }
    getCounter() {
        return this.basketProducts.length;
    }

    getSumTotal() {
        return this.basketProducts.reduce((sum, product) => sum + product.price, 0)
    }

    setSelectProduct(product: IProduct) {
        localStorage.setItem(product.id, JSON.stringify(product));
        this.basketProducts.push(JSON.parse(localStorage.getItem((product.id))));
    }

    getLocalData() {{
        for (let i = 0; i < localStorage.length; i ++) {
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage.getItem((key)))
            this.basketProducts.push(value);
        };
    }}

    deleteProduct(product: IProduct) {
        this.basketProducts = this.basketProducts.filter(item => item !== product)
        localStorage.removeItem(product.id);
    }

    clearBasket() {
        this.basketProducts = [];
        localStorage.clear();
    }

    isProductInBasket(id: string): boolean {
        return this.basketProducts.some(product => product.id === id)
    }
}