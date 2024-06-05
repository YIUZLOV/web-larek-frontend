import {  
    Product,
    AddedProduct,
    PaymentMethod,
    Contacts,
    Order,
    OrderResult,
    IProductApi
} from "./Index";

export type ProductData = {
    title: string;
    price: number;
}

export type BasketProducts = ProductData & {
    title: string;
    price: number;
}

export enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
    paymentMethod = 'modal:paymentMethod',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

export enum AppStateChanges {
	product = 'change:product',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	selectedProduct = 'change:selectedProduct',
	basket = 'change:basket',
	order = 'change:order',
}

export interface AppState {
    product: Product[];

    selectedProduct: Product | null;
    basket: BasketProducts[];
    basketTotalPrice: number;
    paymentMethod: PaymentMethod;
    contacts: Contacts;
    addedProducts: AddedProduct[];
    order: Order;

    openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

    loadProducts(): Promise<void>;
    orderProducts(): Promise<OrderResult[]>;

	selectProduct(id: string): void;
	removeProduct(id: string): void;
	fillContacts(contacts: Partial<Contacts & PaymentMethod>): void;
	isValidContacts(): boolean;

	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
}

// Настройки модели данных
export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new (api: IProductApi, settings: AppStateSettings): AppState;
}
