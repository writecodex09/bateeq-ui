import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    sources = [];
    hasFocus = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    async attached() {
        this.sumTotalQty = 0;
        this.sumPrice = 0;
        var storages = await this.service.getStorage();
        this.sources = storages;
        this.sources = this.sources.map(source => {
            source.toString = function () {
                return this.name;
            }
            return source;
        })
    }

    async barcodeChoose(e) {
        var itemData = e.target.value;
        this.price = 0;
        if (itemData && itemData.length >= 13) {
            var fgTemp = await this.service.getByCode(itemData);
            if (fgTemp != undefined) {
                if (Object.getOwnPropertyNames(fgTemp).length > 0) {
                    var fg = fgTemp[0];
                    this.price = fg.domesticSale;
                    if (fg != undefined && Object.getOwnPropertyNames(fg).length > 0) {
                        var newItem = {};
                        var _data = this.data.items.find((item) => item.code === fg.code);
                        if (!_data) {
                            this.qtyFg = 0;
                            this.price = 0;
                            newItem.itemId = fg._id;
                            newItem.availableQuantity = 0;
                            var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
                            if (result != undefined) {
                                newItem.availableQuantity = result.quantity;
                            }
                            newItem.name = fg.name;
                            newItem.code = fg.code;
                            this.qtyFg = this.qtyFg + 1;
                            newItem.quantity = 1;
                            newItem.price = parseFloat(fg.domesticSale)
                            newItem.remark = "";
                            this.data.items.push(newItem);
                        } else {
                            this.firstPrice = 0;
                            this.qtyFg = parseInt(_data.quantity) + 1;
                            this.firstPrice = this.qtyFg * this.price
                            _data.price = parseFloat(this.firstPrice)
                            _data.quantity = this.qtyFg;
                        }
                    }
                }
            }
            this.barcode = "";
        }
    }

    sourceChange(e) {
        this.data.items = [];
    }

    async nameChoose(e) {
        this.hasFocus = false;
        var itemData = e.detail;
        if (itemData != undefined) {
            if (Object.getOwnPropertyNames(itemData).length > 0) {
                var newItem = {};
                var _data = this.data.items.find((item) => item.code === itemData.code);
                if (!_data) {
                    this.qtyFg = 0;
                    this.price = 0;
                    newItem.itemId = itemData._id;
                    newItem.availableQuantity = 0;
                    var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
                    if (result != undefined) {
                        newItem.availableQuantity = result.quantity;
                    }
                    newItem.name = itemData.name;
                    newItem.code = itemData.code;
                    newItem.quantity = 1;
                    this.qtyFg = this.qtyFg + 1;
                    this.price = itemData.domesticSale;
                    newItem.price = parseFloat(itemData.domesticSale);
                    newItem.remark = "";
                    this.data.items.push(newItem);
                }
                this.item = null;
            }
        }
    }
    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
}
