var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Packaging",
            key: "Packaging",
            icon: "fa fa-minus-circle",
            content: {
                moduleName: "Packaging",
                controlName: "Packaging"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    
}

Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder);
