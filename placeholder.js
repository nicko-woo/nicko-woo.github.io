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

    this.onClick = function () {
        console.log('click-click');
        modal.style.display = "block";
    }

    var modal = document.getElementById("myModal");


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Core.PlaceHolderManager.register("MyInventory_EditInventoryItem_Tabs", PlaceHolder)
Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)