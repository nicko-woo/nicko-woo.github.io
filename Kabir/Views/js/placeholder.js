var PlaceHolder = function ($scope, $element) {

    console.log('new route param 1');
    this.getItems = function () {
        var items = [{
            text: "Spec Sheet",
            key: "SpecSheet",
            icon: "fa fa-minus-circle",
            content: {
                moduleName: "SpecSheet",
                controlName: "SpecSheet"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    
}

Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder);
