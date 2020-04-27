var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Pay With Payoneer",
            key: "PayWithPayoneerButton",
            icon: "fa fa-credit-card",
            content: {
                moduleName: "PayWithPayoneer",
                controlName: "PayWithPayoneer"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    const wind = require('core/Window');

    this.onClick = function () {
        var win = new wind({
            moduleName: "PayWithPayoneer",
            windowName: "PayWithPayoneerView",
            title: "Pay with Payoneer - Order Test",
            width: "900px",
            height: "600px",
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: {},
            moduleDefinition: {selector: "PayWithPayoneer"},
            isSystem: false
        });
        
        win.open();
    }
}

Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)