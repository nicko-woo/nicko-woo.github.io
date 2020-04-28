var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works!')

    $scope.gridScope = null;

    $scope = $scope.$parent;
    $scope.items = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    $scope.supplierList = [];

    // $scope.$parent.gridScope.setItems($scope.items);


    // function Initialize() {
    //     // $scope.gridScope.subscribe("onDblClick", onDoubleClick);
    //     // $scope.radioOnChanged($scope.buttons[0]);
    //     let items = $scope.$parent.gridScope.getItems();
    //     $scope.gridScope.setItems($scope.items);
    //     $scope.$apply();
    // }


    // $scope.init = function () {

    //     // $scope.gridScope.setItems($scope.items);

    //     var grid;
    //     var columns = [
    //         { id: "title", name: "Title", field: "title" },
    //         { id: "duration", name: "Duration", field: "duration" },
    //         { id: "%", name: "% Complete", field: "percentComplete" },
    //         { id: "start", name: "Start", field: "start" },
    //         { id: "finish", name: "Finish", field: "finish" },
    //         { id: "effort-driven", name: "Effort Driven", field: "effortDriven" }
    //     ];

    //     var options = {
    //         enableCellNavigation: true,
    //         enableColumnReorder: false
    //     };

    //     $(function () {
    //         var data = [];
    //         for (var i = 0; i < 5; i++) {
    //             data[i] = {
    //                 title: "Task " + i,
    //                 duration: "5 days",
    //                 percentComplete: Math.round(Math.random() * 100),
    //                 start: "01/01/2009",
    //                 finish: "01/05/2009",
    //                 effortDriven: (i % 5 == 0)
    //             };
    //         }

    //         grid = new Slick.Grid("#myGrid123", data, columns, options);
    //     })

    //     var gridScope = $element.find(".slickgrid").scope();

    //     $('#myGrid123').on('shown', grid.resizeCanvas);
    //     $("#myGrid123").children(".slick-viewport").css("height", "300px");
    // };

    // $scope.init();

    var dataView = new Slick.Data.DataView();

    var containerEl = "#myGrid123";

    //Create columns
    var columns = [
        { id: "column1", name: "ID", field: "id" },
        { id: "column2", name: "Language", field: "lang" },
        { id: "column3", name: "Year", field: "year" }
    ];
    
    var options = {
        enableCellNavigation: true,
        enableColumnReorder: false
    };

    // Pass it as a data provider to SlickGrid.
    var grid = new Slick.Grid(containerEl, dataView, columns, options);

    // Make the grid respond to DataView change events.
    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });

    var data = [
        {'id': 'l1', 'lang': 'Java', 'year': 1995},
        {'id': 'l2', 'lang': 'JavaScript', 'year': 1995},
        {'id': 'l3', 'lang': 'C#', 'year': 2000},
        {'id': 'l4', 'lang': 'Python', 'year': 1991}];
      
      // This will fire the change events and update the grid.
      dataView.setItems(data);

      $scope.init = function () {
        dataView.beginUpdate();
        grid.invalidateAllRows();
        dataView.setItems(data);
        dataView.endUpdate();
        grid.render();
      };

      $scope.init();

      $scope.refreshData = function() {
        dataView.beginUpdate();
        grid.invalidateAllRows();
        dataView.setItems(data);
        dataView.endUpdate();
        grid.render();
      }


};