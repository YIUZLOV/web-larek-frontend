import { ApiPostMethods } from "../components/base/api";

export interface IProduct {
    id?: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
	checkItemInBasket?: (itemId: string) => boolean;
}

export interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export interface IOrderLot {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	id?: string;
	total: number;
}

// тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}