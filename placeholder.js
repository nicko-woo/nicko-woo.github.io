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

    this.onClick = function ($scope) {
        var win = new wind({
            moduleName: "PayWithPayoneer",
            windowName: "PayWithPayoneerView",
            width: "900px",
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: {},
            content: '<div class="window"><div class="header-buttons pull-right"><button type="button" class="btn btn-primary header-button modal-close" key="CLOSE" handle-click="true" lw-tst="closeDialog"><i class="fa fa-times"></i></button></div><div class="title" handle-dblclick="true" key="FULLSCREEN"><h3 title="Purchase Order Extended Properties">Purchase Order Extended Properties</h3></div><div class="content"></div></div>'
        });
        // win.onWindowClosed = function (event) {
        //     switch (event.action) {
        //         case "OK":
        //             $scope.ExtendedProperties = event.result;
        //             $scope.CheckHasChanged();
        //             if (!$scope.$$phase) {
        //                 $scope.$apply();
        //             }
        //             break;
        //         case "CLOSE":
        //             if (event.result) {
        //                 $scope.ExtendedProperties = event.result;
        //                 $scope.CheckHasChanged();
        //                 if (!$scope.$$phase) {
        //                     $scope.$apply();
        //                 }
        //             }
        //             break;
        //     }
        // };
        win.open();
    }
}
// Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder)
Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)