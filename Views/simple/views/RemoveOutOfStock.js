var RemoveOutOfStockView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {

    var self = this;
    self.onMessage = function (msg) {
        switch (msg.key) {
            case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
                $scope.itemsToRemove = msg.data.data.ItemsToRemove;
        }
    };

    // const busyWorker = require("core/busyWorker/busyWorker");

    // $scope.removeOutOfStock = function () {

    //     busyWorker.showBusy($element.find(".itemsTableContainer"), "Updating");

    //     $scope.amountProcessed = 0;

    //     if ($scope.itemsToRemove.length < 1){
    //         Core.Dialogs.addNotify("No items to remove", "WARNING");
    //     }

    //     $scope.itemsToRemove.forEach(item => {

    //         var service = new Services.OrdersService(self.options);

    //         if (item.AvailableStock <= 0 && item.OnOrder <= 0) {

    //             $scope.amountProcessed++;

    //             service.removeOrderItem($scope.order.OrderId, item.RowId, $scope.locationId, function (event) {
    //                 if (event.hasErrors() == false) {
    //                     for (var i = 0; i < $scope.order.Items.length; i++) {
    //                         if ($scope.order.Items[i].RowId == item.RowId) {
    //                             $scope.order.Items.splice(i, 1);
    //                             item = null;
    //                             break;
    //                         }
    //                     }
    //                     if (recalculatePackaging) {
    //                         $scope.saveOrderPackagingCalculation(true, false, function () {
    //                             $scope.updateTotalsInfo(event.result);
    //                         });
    //                     }
    //                     else
    //                         $scope.updateTotalsInfo(event.result);
    
    //                 } else {
    //                     dialogs.addNotify(event.error.errorMessage, "ERROR");
    //                 }
    //                 $scope.$apply();
    //             });


                
    //         }

    //     });

    //     if ($scope.amountProcessed > 0) {
    //         Core.Dialogs.addNotify("Items succesfully removed", "SUCCESS");
    //     }
    //     else {
    //         Core.Dialogs.addNotify("No items to remove", "WARNING");
    //     }

    //     busyWorker.hideBusy($element.find(".itemsTableContainer"));
    // };

    $scope.Close = function () {
        $scope.itemsToRemove = null;
        $scope.$destroy();
        self.close();
    }

    

};