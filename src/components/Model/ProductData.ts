import { IProduct } from "../../types";
import { IEvents } from "../base/events";
export interface IProductData {
    products: IProduct[];
    preview: IProduct;
    setPreview(item: IProduct): void;
}

export class ProductData implements IProductData {
    protected _products: IProduct[];
    preview: IProduct;

    constructor(protected events: IEvents) {
        this._products = [];
    }
    
    set products(items: IProduct[]) {
        this._products = items;
        this.events.emit('products:get')
    }

    get products() {
        return this._products;
    }

    setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('card:open', this.preview);
	}
}