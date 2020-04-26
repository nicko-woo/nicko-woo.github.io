var PayWithPayoneerView = function($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService){
    console.log('pay with payoneer works!')
    var self = this;
    var purchaseOrderService = new Services.PurchaseOrderService(self.options);
    var gridScope = null;
    $scope.items = [];
    $scope.payments = [];
    
    const permissionManager = require("core/permissionManager");
    
    var inventoryService = new Services.InventoryService(self.options);
    
    $scope.supplierList = [];
    console.log($scope.myOrder);
    $scope.testVar = "test_87";
    
    var items = $scope.$parent.gridScope.getItems();

    inventoryService.GetSuppliers(function (event) {
        if (!event.hasErrors()) {

            var permissionsSuppliers = permissionManager.GetList("GlobalPermissions.PurchaseOrder.SearchPurchaseOrder.SupplierList");
            if (permissionsSuppliers.length === 0) {
                $scope.supplierList = event.result;
                console.log($scope.supplierList[5].ContactName);
            }
            else {
                for (var i = 0; i < event.result.length; i++) {
                    if (permissionsSuppliers.contains(event.result[i].pkSupplierID)) {
                        $scope.supplierList.push(event.result[i]);
                    }
                }
            }
        }
    });


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