var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "App",
            key: "App",
            icon: "fa fa-car",
            content: {
                moduleName: "App",
                controlName: "App"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }
}

Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder)