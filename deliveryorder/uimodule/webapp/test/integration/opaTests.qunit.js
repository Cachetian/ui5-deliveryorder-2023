/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["custom/deliveryorder/deliveryorder/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
