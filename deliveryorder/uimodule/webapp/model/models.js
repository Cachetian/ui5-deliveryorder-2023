sap.ui.define(
    ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     *
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     *
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                const oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            createDataModel: function () {
                const oModel = new JSONModel("./model/data/data.json");
                oModel.dataLoaded().then((data) => {
                    // DeliveryOrders
                    let DeliveryOrders = oModel.getProperty("/DeliveryOrders");
                    DeliveryOrders.forEach((it, i) => {
                        it._num = i + 1;
                    });
                    oModel.setProperty("/DeliveryOrders", DeliveryOrders);
                    // OrderItems
                    let OrderItems = oModel.getProperty("/OrderItems");
                    let OrderItemsTemplate = OrderItems[0];
                    for (let i = 0; i < 11; i++) {
                        const item = Object.assign({}, OrderItemsTemplate);
                        for (const key in item) {
                            if (Object.hasOwnProperty.call(item, key)) {
                                item[key] = "";
                            }
                        }
                        OrderItems.push(item);
                    }
                    OrderItems.forEach((it, i) => {
                        it.num = (i + 1) * 10;
                    });
                    oModel.setProperty("/OrderItems", OrderItems);

                    // ProductPrices
                    let ProductPrices = oModel.getProperty("/ProductPrices");
                    ProductPrices.forEach((it, i) => {
                        it._num = i + 1;
                    });
                    oModel.setProperty("/ProductPrices", ProductPrices);
                });
                return oModel;
            },
        };
    },
);
