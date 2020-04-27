var PayWithPayoneerView = function($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService){
    console.log('pay with payoneer works!')
    var self = this;
    var purchaseOrderService = new Services.PurchaseOrderService(self.options);
    var gridScope = null;

    $scope = $scope.$parent.$parent;
    $scope.items = $scope.gridScope.getItems();

    $scope.testVar = $scope.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    
    
    var inventoryService = new Services.InventoryService(self.options);
    
    $scope.supplierList = [];
    console.log($scope.myOrder);
    
    


    // get payments
    let paymentHistory = function () {
        $.ajax({
            type: 'GET',
            url: sessionStorage.getItem('getPaymentHistoryUrl'),
            data: {},
            headers: { 'Authorization': $scope.Token, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept-Language': 'application/json' }
        }).done(function (data) {
            for (var i = 0; i < data.length; i++) {

            }
            
        });
    };

    
};