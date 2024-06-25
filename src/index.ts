import { AppApi } from './components/Model/AppApi';
import { Product } from './components/View/Product';
import { ProductData } from './components/Model/ProductData';
import { ProductPreview } from './components/View/ProductPreview';
import { EventEmitter, IEvents } from './components/base/events';
import { Modal } from './components/View/Modal';
import './scss/styles.scss';
import { IOrderForm, IProduct } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { BasketData } from './components/Model/BasketData';
import { Basket } from './components/View/Basket';
import { BasketListItem } from './components/View/BasketListItems';
import { FormPayment } from './components/View/FormPayment';
import { FormData } from './components/Model/FormData';
import { FormContacts } from './components/View/FormContacts';
import { Confirm } from './components/View/Confirm';

const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const basketTemplateList: HTMLTemplateElement = document.querySelector('#card-basket');
const cardPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const paymentMethodTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const confirmTemplate: HTMLTemplateElement = document.querySelector('#success');

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

const productData = new ProductData(events);
const modal = new Modal(document.querySelector('.modal'), events);
const basketData = new BasketData();
const basket = new Basket(cloneTemplate(basketTemplate), events);
const formData = new FormData(events);
const paymentMethod = new FormPayment(cloneTemplate(paymentMethodTemplate), events);
const contacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const productsContainer = document.querySelector('.gallery');

events.onAll((event) => {
    console.log(event.eventName, event.data);
})

//назначаем события

// Вывод карточек на главную страницу и окно с превью
events.on('products:get', () => {
    productData.products.map((card) => {
        const cardInstant = new Product(cloneTemplate(cardTemplate), events, {
            onClick: () => events.emit('card:select', card),
        })
        productsContainer.append(cardInstant.render(card));
    })
})

events.on('card:select', (card: IProduct) => {
    productData.setPreview(card);
    events.emit('card:open', card);
})

events.on('card:open', (data: IProduct) => {
    const productPreview = new ProductPreview(cloneTemplate(cardPreviewTemplate), events);
    const isInBasket = basketData.isProductInBasket(data.id);
    modal.content = productPreview.renderCardPreview({data, isInBasket});
    modal.render()
})

//События для действий с корзиной товаров

events.on('basket:open', () => {
    basket.renderTotalSum(basketData.getSumTotal());
    modal.content = basket.render();
    modal.render();
})

events.on('card:addBasket', (product: IProduct) => {
    basketData.setSelectProduct(productData.preview);
    events.emit('basket:update');
    modal.close();
})

events.on('basket:update', () => {
    basket.renderPageBasketCounter(basketData.getCounter());
    basket.renderTotalSum(basketData.getSumTotal());
    let i = 0;
    basket.items = basketData.basketProducts.map((item) => {
        const basketListItem = new BasketListItem(basketTemplateList, events, {
            onClick: () => events.emit('basket:deleteProduct', item)
        })
        i = i + 1;
        return basketListItem.render(item, i);
    })
})

events.on('basket:deleteProduct', (item: IProduct) => {
	basketData.deleteProduct(item);
	events.emit('basket:update');
})

//События для действий с данными покупателя

events.on('formPayment:open', () => {
    formData.total = basketData.getSumTotal();
    modal.content = paymentMethod.render();
    modal.render();
    formData.items = basketData.basketProducts.map((item) => item.id);
})

events.on('formPayment:paymentChoice', (button: HTMLButtonElement) => {
    formData.payment = button.name;
})

events.on('formPayment:addressCheck', (data: {field: string, value: string}) => {
    formData.setOrderAddress(data.field, data.value);
})

events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
    const {address, payment} = errors;
    paymentMethod.valid = !address && !payment;
    paymentMethod.formErrors.textContent = Object.values({address, payment})
        .filter((i) => !!i)
        .join('; ');
})

events.on('open:formContacts', () => {
    modal.content = contacts.render();
    modal.render();
})

events.on('formContacts:changeInput', (data: {field: string, value: string}) => {
    formData.setOrderData(data.field, data.value);
})

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
    const {phone, email} = errors;
    contacts.valid = !phone && !email;
    contacts.formErrors.textContent = Object.values({phone, email})
        .filter((i) => !!i)
        .join('; ');
})

// Вывод окна с подтверждением покупки и отправка данных на сервер

events.on('open:confirm', async () => {
    try {
       const data = await api.postOrderLot(formData.getOrderLot());
		console.log(data);	
    } catch (err) {
        console.log((err));
    }
    const confirm = new Confirm(cloneTemplate(confirmTemplate), events);
    modal.content = confirm.render(basketData.getSumTotal());
    basketData.clearBasket();
    events.emit('basket:update');
    modal.render(); 
})

events.on('confirm:close', () => {
modal.close();
})

//запрос данных с сервера
const getData = async function() {
    try {
        const data = await api.getProduct();
        productData.products = data;
        console.log(productData.products);
    } catch (err) {
        console.log(err);
    }
}

getData();