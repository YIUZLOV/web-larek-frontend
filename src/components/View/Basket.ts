import { IActions } from "../../types";
import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketTotalSum: HTMLElement;
    pageBasketButton: HTMLButtonElement;
    pageBasketCounter: HTMLElement;
    renderPageBasketCounter(value: number): void;
    renderTotalSum(sumTotal: number): void;
    render(): HTMLElement;
}

export class Basket implements IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketTotalSum: HTMLElement;
    pageBasketButton: HTMLButtonElement;
    pageBasketCounter: HTMLElement;

    constructor(template: HTMLElement, protected events: IEvents, actions?: IActions) {
        this.basket = template;
        this.title = this.basket.querySelector('.modal__title');
        this.basketList = this.basket.querySelector('.basket__list');
        this.button = this.basket.querySelector('.button');
        this.basketTotalSum = this.basket.querySelector('.basket__price');
        this.pageBasketButton = document.querySelector('.header__basket');
        this.pageBasketCounter = document.querySelector('.header__basket-counter');

        this.button.addEventListener('click', () => {
            events.emit('formPayment:open');
        })

        this.pageBasketButton.addEventListener('click', () => {
            events.emit('basket:open');
        })
    }

    set items(items: HTMLElement[]) {
        this.basketList.replaceChildren(...items);
        this.button.disabled = !items.length;
        if (!items.length) {
            this.basketList.replaceChildren(
                createElement<HTMLParagraphElement>('p', {
                    textContent: 'Корзина пуста',
                })
            );
        }
    }

    renderPageBasketCounter(value: number) {
        this.pageBasketCounter.textContent = String(value);
    }

    renderTotalSum(sumTotal: number): void {
        this.basketTotalSum.textContent = String(`${sumTotal} синапсов`);
    }

    render() {
        this.title.textContent = 'Корзина';
        this.events.emit('basket:update');
        return this.basket;
    }
}