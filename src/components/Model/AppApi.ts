import { IApi, IOrderLot, IOrderResult, IProduct } from "../../types";
import { Api, ApiListResponse } from "../base/api";


export interface IAppApi {
	cdn: string;
	items: IProduct[];
	getListProductCard: () => Promise<IProduct[]>;
	postOrderLot: (order: IOrderLot) => Promise<IOrderResult>;
}

export class AppApi extends Api {
	cdn: string;
	items: IProduct[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	// получаем массив карточек с сервера
	getProduct(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	// получаем ответ от сервера 
	postOrderLot(order: IOrderLot): Promise<IOrderResult> {
		return this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}
