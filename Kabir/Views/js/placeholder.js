var PlaceHolder = function ($scope, $element) {

    this.getItems = function () {
        var items = [{
            text: "CustomImages",
            key: "CustomImages",
            icon: "fa fa-minus-circle",
            content: {
                moduleName: "CustomImagesView",
                controlName: "CustomImagesView"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    
}

Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder);
