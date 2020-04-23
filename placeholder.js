var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Pay Using Payoneer",
            key: "PayUsingPayoneerButton",
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

    const wind = require('core/Window');

    this.onClick = function ($scope) {
        var win = new wind({
            moduleName: "PayUsingPayoneer",
            windowName: "PayUsingPayoneerView",
            width: "950px",
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: {}
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