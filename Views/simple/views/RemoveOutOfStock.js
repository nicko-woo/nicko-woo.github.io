var RemoveOutOfStockView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {

    $scope.itemsToRemove = $scope.$parent.$parent.$parent.order.Items;
    

    var self = this;
    self.onMessage = function (msg) {
        switch (msg.key) {
            case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
                $scope.itemsToRemove = msg.data.ItemsToRemove;
        }
    };

    

};