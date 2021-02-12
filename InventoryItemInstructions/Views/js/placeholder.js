var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Instructions",
            key: "Instructions",
            icon: "fa fa-minus-circle",
            content: {
                moduleName: "Instructions",
                controlName: "Instructions"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    
}

Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder);
