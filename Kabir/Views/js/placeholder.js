var PlaceHolder = function ($scope, $element) {

    this.getItems = function () {
        var items = [{
            text: "Custom Images",
            key: "customImagesTab",
            icon: "fa fa-minus-circle"
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    
}

Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder);
