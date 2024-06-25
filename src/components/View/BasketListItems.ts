import { IActions, IProduct } from "../../types";
import { IEvents } from "../base/events";

interface IBasketListItem {
    basketItem: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    deleteButton: HTMLButtonElement;
    render(data: IProduct, item: number): HTMLElement;
}

export class BasketListItem implements IBasketListItem {
    basketItem: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    deleteButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events:IEvents, actions?: IActions) {
        const content = template.content;
        this.basketItem = content.querySelector('.basket__item'). cloneNode(true) as HTMLElement;
        this.index = this.basketItem.querySelector('.basket__item-index');
        this.title = this.basketItem.querySelector('.card__title');
        this.price = this.basketItem.querySelector('.card__price');
        this.deleteButton = this.basketItem.querySelector('.basket__item-delete');

        if (actions?.onClick) {
            this.deleteButton.addEventListener('click', actions.onClick)
        }
    }

    setPrice(value: number): string {
        if (value === null) {
           return 'Бесценно'; 
        } else {
           return `${String(value)} синапсов`; 
        }
    }

    render(data: IProduct, item: number): HTMLElement {
        this.index.textContent = String(item);
        this.title.textContent = data.title;
        this.price.textContent = this.setPrice(data.price);
        return this.basketItem;
    }
}