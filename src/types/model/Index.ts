
export interface Product {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface AddedProduct {
    id: string;
    title: string;
    price: number;
}

export interface PaymentMethod {
    payment: string;
    address: string;
}

export interface Contacts {
    email: string;
    phone: string;
}

export interface Order extends Contacts, PaymentMethod {
    products: AddedProduct[];
}

export interface OrderResult extends AddedProduct {
    id: string
}

export interface IProductApi {
    getProducts: () => Promise<Product[]>
    getProduct: (id: string) => Promise<Product>
    orderProducts: (order: Order) => Promise<OrderResult[]>
}


