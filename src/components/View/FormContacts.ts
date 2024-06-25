import { IEvents } from "../base/events";

interface IFormContacts {
    formElement: HTMLElement;
    inputAll: HTMLInputElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;
    render(): HTMLElement;
}

export class FormContacts implements IFormContacts {
    formElement: HTMLElement;
    inputAll: HTMLInputElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formElement = template;
        this.inputAll = Array.from(this.formElement.querySelectorAll('.form__input'))
        this.buttonSubmit = this.formElement.querySelector('.button');
        this.formErrors = this.formElement.querySelector('.form__errors');

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            events.emit('open:confirm');
        })

        this.inputAll.forEach((input) => {
            input.addEventListener('input', (evt) => {
                const target = evt.target as HTMLInputElement;
                const field = target.name;
                const value = target.value;
                events.emit('formContacts:changeInput', {field, value});
            })
        })
    }

    set valid(value: boolean) {
        this.buttonSubmit.disabled = !value;
    }

    render(): HTMLElement {
        return this.formElement;
    }
}