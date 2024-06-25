import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface IModal {
    open(): void;
    close(): void;
    render(): HTMLElement;
}

export class Modal implements IModal {
    protected _container: HTMLElement;
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        this._closeButton = container.querySelector('.modal__close');
        this._content = container.querySelector('.modal__content');
        this._container = container

        this._closeButton.addEventListener('click', this.close.bind(this));
        this._container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation()); 
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this._container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this._container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(): HTMLElement {
        this._content;
        this.open();
        return this._container;
    }
}