import { makeAutoObservable } from "mobx";

export default class BasketStore {
    constructor() {
        this._items = [];
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const savedBasket = localStorage.getItem('basket');
        if (savedBasket) {
            this._items = JSON.parse(savedBasket);
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('basket', JSON.stringify(this._items));
    }

    addToBasket(device) {
        const existingItem = this._items.find(item => item.device.id === device.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this._items.push({ device, quantity: 1 });
        }
        this.saveToLocalStorage();
    }

    removeFromBasket(id) {
        this._items = this._items.filter(item => item.device.id !== id);
        this.saveToLocalStorage();
    }

    changeQuantity(id, quantity) {
        const item = this._items.find(item => item.device.id === id);
        if (item) {
            item.quantity = quantity;
            this.saveToLocalStorage();
        }
    }

    clearBasket() {
        this._items = [];
        localStorage.removeItem('basket');
    }

    get items() {
        return this._items;
    }

    get totalCount() {
        return this._items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get totalPrice() {
        return this._items.reduce((sum, item) => sum + item.device.price * item.quantity, 0);
    }
}
