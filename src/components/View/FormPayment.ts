import { IEvents } from "../base/events";

interface IFormPayment {
    formElement: HTMLElement;
    butttonChoice: HTMLButtonElement[];
    buttonSubmit: HTMLButtonElement;
    payment: string;
    formErrors: HTMLElement;
    render(): HTMLElement;
}

export class FormPayment implements IFormPayment {
    formElement: HTMLElement;
    butttonChoice: HTMLButtonElement[];
    buttonSubmit: HTMLButtonElement;
    payment: string;
    formErrors: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formElement = template;
        this.butttonChoice = Array.from(this.formElement.querySelectorAll('.button_alt'));
        this.buttonSubmit = this.formElement.querySelector('.order__button');
        this.formErrors = this.formElement.querySelector('.form__errors')

        // this.paymemtMethod = '';

        this.butttonChoice.forEach((button) => {
            button.addEventListener('click', () => {
                this.payment = button.name;
                events.emit('formPayment:paymentChoice', button);
            })
        })

        this.formElement.addEventListener('input', (evt) => {
            const target = evt.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            events.emit('formPayment:addressCheck', {field, value});
        })

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            events.emit('open:formContacts');
        })
    }

    set paymentChoice(payment: string) {
        this.payment = payment;
        this.butttonChoice.forEach((item) => {
            item.classList.toggle('button_alt-active', item.name === payment);
        });
    }

    get paymentChoice(): string {
        return this.payment;
    }

    set valid(value: boolean) {
        this.buttonSubmit.disabled = !value;
    }

    render(): HTMLElement {
        return this.formElement;
    }
}