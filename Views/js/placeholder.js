var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Pay With Payoneer",
            key: "PayWithPayoneerButton",
            icon: "fa fa-credit-card"
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    const wind = require('core/Window');

    this.onClick = function () {
        var gridScope = $element.find(".itemsGrid").scope();

        var win = new wind({
            moduleName: "PayWithPayoneer",
            windowName: "PayWithPayoneer",
            title: "Pay with Payoneer - " + $scope.purchaseOrder.ExternalInvoiceNumber,
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: {},
            width: "800px",
            ngScope: $scope

        });
        
        win.open();
    }
}

Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)