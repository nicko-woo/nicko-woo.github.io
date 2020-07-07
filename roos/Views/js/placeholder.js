var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Remove Out Of Stock",
            key: "RemoveOutOfStockButton",
            icon: "fa fa-credit-card"
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    const wind = require('core/Window');

    this.onClick = function () {

        var win = new wind({
            moduleName: "RemoveOutOfStock",
            windowName: "RemoveOutOfStock",
            title: "",
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: {
            },
            onWindowClosed: function (event) {
                switch (event.action) {
                    case "OK":
                        $scope.CheckHasChanged();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        break;
                    case "CLOSE":
                        if (event.result) {
                            $scope.CheckHasChanged();
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                        break;
                }
            },
            width: "300px",
            ngScope: $scope

        });
        
        win.open();
    }
}

Core.PlaceHolderManager.register("EditOpenOrder_RightTopButtons", PlaceHolder)