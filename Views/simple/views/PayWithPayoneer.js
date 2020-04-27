var PayWithPayoneerView = function($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService){
    console.log('pay with payoneer works!')

    $scope = $scope.$parent;
    $scope.items = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    
    $scope.supplierList = [];
    
    


    // get payments
    // let paymentHistory = function () {
    //     $.ajax({
    //         type: 'GET',
    //         url: sessionStorage.getItem('getPaymentHistoryUrl'),
    //         data: {},
    //         headers: { 'Authorization': $scope.Token, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept-Language': 'application/json' }
    //     }).done(function (data) {
    //         for (var i = 0; i < data.length; i++) {

    //         }
            
    //     });
    // };

    
};