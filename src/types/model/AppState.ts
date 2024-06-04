import {  
    Product,
    AddedProduct,
    PaymentMethod,
    Contacts,
    Order,
    OrderResult
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

export interface AppSate {
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