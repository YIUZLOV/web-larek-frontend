export interface PaymentData {
    paymentMethod: string;
    address: string;
    isCorrected: boolean;
}

export interface PaymentSettings {
    paymentMethod: string;
    address: string;
}