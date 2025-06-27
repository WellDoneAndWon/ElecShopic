import { makeAutoObservable } from "mobx";

export default class BasketStore {
    constructor() {
        this._items = [];
        this._userId = null; // Добавляем ID пользователя
        makeAutoObservable(this);
    }

    setUserId(userId) {
        this._userId = userId;
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        if (!this._userId) {
            this._items = [];
            return;
        }
        const savedBasket = localStorage.getItem(`basket_${this._userId}`);
        if (savedBasket) {
            this._items = JSON.parse(savedBasket);
        }
    }

    saveToLocalStorage() {
        if (!this._userId) return;
        localStorage.setItem(`basket_${this._userId}`, JSON.stringify(this._items));
    }

    addToBasket(device) {
        if (!this._userId) return;
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

    increaseQuantity(id) {
        const item = this._items.find(item => item.device.id === id);
        if (item) {
            item.quantity += 1;
            this.saveToLocalStorage();
        }
    }

    decreaseQuantity(id) {
        const item = this._items.find(item => item.device.id === id);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.removeFromBasket(id);
            }
            this.saveToLocalStorage();
        }
    }

    clearBasket() {
        this._items = [];
        // Не очищаем localStorage здесь!
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
