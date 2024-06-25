import { IEvents } from '../base/events';

enum FormField {
	Address = 'address',
	Email = 'email',
	Phone = 'phone',
	Payment = 'payment',
}
// Интерфейс для ошибок
interface FormError {
	[key: string]: string;
}
// регулярные выражения
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\-]{10}$/;

export class FormData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
	formErrors: FormError = {};
	constructor(protected events: IEvents) {
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.address = '';
		this.total = 0;
		this.items = [];
	}
	// Принимаем значение строки "address"
	setOrderAddress(field: string, value: string) {
		if (this.isAddressField(field)) {
			this.address = value;
			if (this.validateOrder()) {
				this.events.emit('order:ready', this.getOrderLot());
			}
		}
	}
	// Валидация формы данных строки "address"
	validateOrder() {
		const errors: FormError = {};
		if (!this.address) {
			errors.address = 'Необходимо указать адрес';
		} else if (!/^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/.test(this.address)) {
			errors.address = 'Укажите настоящий адрес';
		} else if (!this.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:address', this.formErrors);
		return Object.keys(errors).length === 0;
	}
	// Принимаем значение формы данных строк "Email" и "Телефон"
	setOrderData(field: string, value: string) {
		if (this.isContactField(field)) {
			if (field === FormField.Email) {
				this.email = value;
			} else if (field === FormField.Phone) {
				this.phone = value;
			}
			if (this.validateContacts()) {
				this.events.emit('order:ready', this.getOrderLot());
			}
		}
	}
	// Валидация данных строк "Email" и "Телефон"
	validateContacts() {
		const errors: FormError = {};
		if (!this.email) {
			errors.email = 'Необходимо указать email';
		} else if (!EMAIL_REGEX.test(this.email)) {
			errors.email = 'Некорректный адрес электронной почты';
		}
		if (this.phone.startsWith('8')) {
			this.phone = '+7' + this.phone.slice(1);
		}
		if (!this.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else if (!PHONE_REGEX.test(this.phone)) {
			errors.phone = 'Некорректный формат номера телефона';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
	getOrderLot() {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items,
		};
	}
	// валидация для полей формы
	private isAddressField(field: string): field is FormField.Address {
		return field === FormField.Address;
	}
	private isContactField(
		field: string
	): field is FormField.Email | FormField.Phone {
		return field === FormField.Email || field === FormField.Phone;
	}
}
