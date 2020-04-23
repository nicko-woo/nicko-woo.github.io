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

    // this.onClick = function ($scope, $dialog) {
    //     $dialog.dialog({}).open('app.html');
    //     console.log('click-click');
    // }

    $scope.onClick = function () {
        var win = new wind({
            moduleName: "PurchaseOrder",
            windowName: "PurchaseOrderExtendedProperties",
            width: "950px",
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: {
                pkPurchaseId: $scope.purchaseOrder.pkPurchaseID,
                ExtendedProperties: $scope.ExtendedProperties
            }
        }, self.options);
        win.onWindowClosed = function (event) {
            switch (event.action) {
                case "OK":
                    $scope.ExtendedProperties = event.result;
                    $scope.CheckHasChanged();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    break;
                case "CLOSE":
                    if (event.result) {
                        $scope.ExtendedProperties = event.result;
                        $scope.CheckHasChanged();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                    break;
            }
        };
        win.open();
    }
}

Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)