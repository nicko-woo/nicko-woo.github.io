var PayWithPayoneerView = function($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService){
    console.log('pay with payoneer works!')

    $scope = $scope.$parent;
    $scope.items = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    
    $scope.supplierList = [];
    

    var grid;
  var columns = [
    {id: "title", name: "Title", field: "title"},
    {id: "duration", name: "Duration", field: "duration"},
    {id: "%", name: "% Complete", field: "percentComplete"},
    {id: "start", name: "Start", field: "start"},
    {id: "finish", name: "Finish", field: "finish"},
    {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
  ];

  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false
  };

  $(function () {
    var data = [];
    for (var i = 0; i < 500; i++) {
      data[i] = {
        title: "Task " + i,
        duration: "5 days",
        percentComplete: Math.round(Math.random() * 100),
        start: "01/01/2009",
        finish: "01/05/2009",
        effortDriven: (i % 5 == 0)
      };
    }

    grid = new Slick.Grid("#myGrid", data, columns, options);
  })
    


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