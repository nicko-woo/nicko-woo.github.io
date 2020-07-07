var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "Remove Out Of Stock",
            key: "RemoveOutOfStockButton",
            icon: "fa fa-minus-circle"
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    const wind = require('core/Window');

    this.onClick = function () {

            dialogs.question({
                message: msg,
                title: "Delete?",
                callback: function (event) {
                    switch (event.action) {
                        case "YES":
                            $scope.itemChangedAskRecalculation(
                                function () {
                                    $scope.removeItemConfirmed(item, true);
                                },
                                function () {
                                    $scope.removeItemConfirmed(item, false);
                                }
                            );
                            break;
                    }
                }
            }, self.options);
        }

        // var win = new wind({
        //     moduleName: "RemoveOutOfStock",
        //     windowName: "RemoveOutOfStock",
        //     title: "123",
        //     closeOnEscape: false,
        //     closeOnBackDrop: false,
        //     data: {
        //     },
        //     onWindowClosed: function (event) {
        //         switch (event.action) {
        //             case "OK":
        //                 $scope.CheckHasChanged();
        //                 if (!$scope.$$phase) {
        //                     $scope.$apply();
        //                 }
        //                 break;
        //             case "CLOSE":
        //                 if (event.result) {
        //                     $scope.CheckHasChanged();
        //                     if (!$scope.$$phase) {
        //                         $scope.$apply();
        //                     }
        //                 }
        //                 break;
        //         }
        //     },
        //     width: "400px",
        //     ngScope: $scope

        // });
        
        // win.open();
    }

    $scope.removeOutOfStock = function() {
        $scope.order.Items.forEach(item => {
            console.log(item.SKU);
        });
    };

    $scope.removeItem = function (item) {
        //$scope.selectedItem = item;
        if (item != null) {
            var msg = "Are you sure you want to delete item \"{0} - {1}\"?".replace("{0}", item.SKU).replace("{1}", item.Title);
            if (item.IsService)
                msg = "Are you sure you want to delete \"{0}\"?".replace("{0}", item.Title);

            dialogs.question({
                message: msg,
                title: "Delete?",
                callback: function (event) {
                    switch (event.action) {
                        case "YES":
                            $scope.itemChangedAskRecalculation(
                                function () {
                                    $scope.removeItemConfirmed1(item, true);
                                },
                                function () {
                                    $scope.removeItemConfirmed1(item, false);
                                }
                            );
                            break;
                    }
                }
            }, self.options);
        }
    };

    $scope.removeItemConfirmed1 = function (item, recalculatePackaging) {
        var service = new Services.OrdersService(self.options);
        busyWorker.showBusy($element.find(".itemsTableContainer"), "Updating");
        service.removeOrderItem($scope.order.OrderId, item.RowId, $scope.locationId, function (event) {
            if (event.hasErrors() == false) {
                for (var i = 0 ; i < $scope.order.Items.length ; i++) {
                    if ($scope.order.Items[i].RowId == item.RowId) {
                        $scope.order.Items.splice(i, 1);
                        item = null;
                        break;
                    }
                }
                if (recalculatePackaging) {
                    $scope.saveOrderPackagingCalculation(true, false, function () {
                        $scope.updateTotalsInfo(event.result);
                    });
                }
                else
                    $scope.updateTotalsInfo(event.result);

            } else {
                dialogs.addNotify(event.error.errorMessage, "ERROR");
            }
            $scope.$apply();
            busyWorker.hideBusy($element.find(".itemsTableContainer"));
        });
    };

}

Core.PlaceHolderManager.register("OpenOrder_EditOrder_ItemsButtons", PlaceHolder)

Core.PlaceHolderManager.register("OpenOrder_EditOrder_OrderControlButtons", PlaceHolder);