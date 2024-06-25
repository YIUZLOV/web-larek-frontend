import { IActions, IProduct } from "../../types";
import { IProductItem, Product } from "./Product";
import { IEvents } from "../base/events";

export class ProductPreview extends Product implements IProductItem {
    private _text: HTMLElement;
    private _button: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        super(template, events, actions);
        this._text = this._template.querySelector('.card__text');
        this._button = this._template.querySelector('.card__button');
        this._button.addEventListener('click', () => {
            this.events.emit('card:addBasket');
        });
    }

    productAvailable(data: IProduct): boolean {
        return !!data.price;
    }

    updateStateButton(data: IProduct, isInBasket: boolean): void {
        if (isInBasket) {
            this._button.setAttribute('disabled', 'true');
            this._button.textContent = 'Товар в корзине';
        } else if (this.productAvailable(data)) {
            this._button.removeAttribute('disabled');
            this._button.textContent = 'Купить';
        } else {
            this._button.setAttribute('disabled', 'true');
            this._button.textContent = 'Не продается';
        }
    }

    renderCardPreview({data, isInBasket}: {data: IProduct, isInBasket: boolean}): HTMLElement {
        this._category.textContent = data.category;
        this._title.textContent = data.title;
        this._image.src = data.image;
        this._price.textContent = this.setPrice(data.price);
        this._text.textContent = data.description;
        this.updateStateButton(data, isInBasket);
        return this._template;
    }
}
