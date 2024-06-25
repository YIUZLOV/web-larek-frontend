import { IActions, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IProductItem {
    render(data: IProduct): HTMLElement;
}

export class Product implements IProductItem {
    protected _template: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        this._template = template;
        this._category = template.querySelector('.card__category');
        this._title = template.querySelector('.card__title');
        this._image = template.querySelector('.card__image');
        this._price = template.querySelector('.card__price');

        if (actions?.onClick) {
            this._template.addEventListener('click', actions.onClick)
        }
    }

    set category(category: string) {
        if (category === 'софт-скил'){
            this._category.classList.add('card__category_soft')
        }else if (category === 'хард-скил') {
            this._category.classList.add('card__category_hard')
        }else if (category === 'другое') {
            this._category.classList.add('card__category_other')
        }else if (category === 'дополнительное') {
            this._category.classList.add('card__category_additional')
        }else {
            this._category.classList.add('card__category_button')
        }
        this._category.textContent = category;
    }

    setPrice(value: number): string {
        if (value === null) {
           return 'Бесценно'; 
        } else {
           return `${String(value)} синапсов`; 
        }
    }

    render(data: IProduct): HTMLElement {
        this._category.textContent = data.category;
        this.category = data.category;
        this._title.textContent = data.title;
        this._image.src = data.image;
        this._price.textContent = this.setPrice(data.price);
        return this._template;
    }
}