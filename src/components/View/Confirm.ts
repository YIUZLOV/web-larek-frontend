import { IEvents } from "../base/events";

interface IConfirm {
    _template: HTMLElement;
    totalSum: HTMLElement;
    button: HTMLElement;
    render(totla: number): HTMLElement;
}

export class Confirm implements IConfirm {
    _template: HTMLElement;
    totalSum: HTMLElement;
    button: HTMLElement;

    constructor(template: HTMLElement, protected events: IEvents) {
        this._template = template;
        this.totalSum = this._template.querySelector('.order-success__description');
        this.button = this._template.querySelector('.order-success__close');

        this.button.addEventListener('click', () => {
            events.emit('confirm:close');
        })
    }

    render(total: number) {
        this.totalSum.textContent = String(`Списано ${total} синапсов`);
        return this._template;
    }
}