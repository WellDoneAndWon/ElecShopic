import { makeAutoObservable } from "mobx";
import { deleteType, deleteBrand, deleteDevice } from "../http/deviceAPI";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }


    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setLimit(limit) {
        this._limit = limit
    }
    setTotalCount(count) {
        this._totalCount = count
    }


    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get totalCount() {
        return this._totalCount
    }

    deleteType = async (id) => {
        await deleteType(id);
        this._types = this._types.filter(type => type.id !== id);
    }

    deleteBrand = async (id) => {
        await deleteBrand(id);
        this._brands = this._brands.filter(brand => brand.id !== id);
    }

    deleteDevice = async (id) => {
        await deleteDevice(id);
        this._devices = this._devices.filter(device => device.id !== id);
    }
}
