var PayWithPayoneerView = function($scope){
    console.log('script works!')

    // var cost = $purchaseOrderItem.Cost;
    // console.log(cost);


    // get payments
    $scope.paymentHistory = function () {
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