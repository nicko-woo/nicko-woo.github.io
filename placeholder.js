var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "PayUsingPayoneer",
            key: "PayUsingPayoneer",
            icon: "fa fa-credit-card",
            content: {
                moduleName: "PayUsingPayoneer",
                controlName: "PayUsingPayoneer"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    // this.onClick = function () {
    //     console.log('click-click');
    //     modal.style.display = "block";
    // }

    this.onClick = function ($scope, $timeout, $dialog) {
        $timeout(function () {
            $dialog.dialog({}).open('app.html');
            console.log('click-click');
        }, 3000);
    }
}

// Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder)
Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)