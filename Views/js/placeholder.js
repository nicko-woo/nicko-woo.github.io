var PlaceHolder = function ($scope, $element) {

    console.log("roos placeholder works 129");
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

    const dialogs = require("core/dialogs");
    const busyWorker = require("core/busyWorker/busyWorker");
    const wind = require('core/Window');

    this.onClick = function () {

        // dialogs.question({
        //     message: "Are you sure? All unavailable items will be removed from order",
        //     title: "Delete?",
        //     callback: function (event) {
        //         switch (event.action) {
        //             case "YES":
        //                 $scope.itemChangedAskRecalculation(
        //                     function () {
        //                         $scope.removeOutOfStock();
        //                     }
        //                 );
        //                 break;
        //         }
        //     }
        // }, self.options);

        var win = new wind({
            moduleName: "RemoveOutOfStock",
            windowName: "RemoveOutOfStock",
            title: "Confirmation",
            closeOnEscape: false,
            closeOnBackDrop: false,
            data: { },
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
            width: "900px",
            ngScope: $scope

        });
        
        win.open();

    }

    $scope.removeOutOfStock = function () {

        busyWorker.showBusy($element.find(".itemsTableContainer"), "Updating");

        $scope.amountProcessed = 0;

        $scope.order.Items.forEach(item => {

            var service = new Services.OrdersService(self.options);

            if (item.AvailableStock <= 0 && item.OnOrder <= 0) {

                $scope.amountProcessed++;

                // service.removeOrderItem($scope.order.OrderId, item.RowId, $scope.locationId, function (event) {
                //     if (event.hasErrors() == false) {
                //         for (var i = 0; i < $scope.order.Items.length; i++) {
                //             if ($scope.order.Items[i].RowId == item.RowId) {
                //                 $scope.order.Items.splice(i, 1);
                //                 item = null;
                //                 break;
                //             }
                //         }
                //         if (recalculatePackaging) {
                //             $scope.saveOrderPackagingCalculation(true, false, function () {
                //                 $scope.updateTotalsInfo(event.result);
                //             });
                //         }
                //         else
                //             $scope.updateTotalsInfo(event.result);
    
                //     } else {
                //         dialogs.addNotify(event.error.errorMessage, "ERROR");
                //     }
                //     $scope.$apply();
                // });


                for (var i = 0; i < $scope.order.Items.length; i++) {
                    if ($scope.order.Items[i].RowId == item.RowId) {
                        $scope.order.Items.splice(i, 1);
                        item = null;
                        //break;
                    }
                }

                //$scope.$apply();
            }

        });

        if ($scope.amountProcessed > 0) {
            Core.Dialogs.addNotify("Items succesfully removed", "SUCCESS");
        }
        else {
            Core.Dialogs.addNotify("No items to remove", "WARNING");
        }

        busyWorker.hideBusy($element.find(".itemsTableContainer"));
    };

}

Core.PlaceHolderManager.register("OpenOrder_EditOrder_ItemsButtons", PlaceHolder)

Core.PlaceHolderManager.register("OpenOrder_EditOrder_OrderControlButtons", PlaceHolder);