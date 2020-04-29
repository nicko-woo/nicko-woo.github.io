var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works145!')

    $scope = $scope.$parent;
    $scope.items = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    $scope.outstanding = null;
    $scope.paid = null;
    $scope.selectedToPay = null;
    $scope.balance = null;

    // // pay by items data grid

    // var pwpByItemsGrid;
    // var columns = [
    //     { id: "column1", name: "SKU", field: "SKU" },
    //     { id: "column2", name: "Ordered Quantity", field: "Quantity" },
    //     { id: "column3", name: "Paid Quantity", field: "Quantity" },
    //     { id: "column4", name: "Price", field: "UnitCost" },
    //     { id: "column5", name: "Quantity To Pay", field: "Quantity" }
    // ];

    // var options = {
    //     enableCellNavigation: true,
    //     enableColumnReorder: false,
    //     enableAutoResize: true,

    // };

    // $(function () {
    //     var data = $scope.items;
    //     pwpByItemsGrid = new Slick.Grid("#pwpByItemGrid", data, columns, options);
    //     // $(".l0").addClass("slick-header-column")

    //     // pwpByItemsGrid.onScroll.subscribe(function () {
    //     //     $(".l0").addClass("slick-header-column")
    //     // })
    // })

    //   $scope.onInit = function () {
    //     pwpByItemsGrid.invalidateAllRows();
    //     pwpByItemsGrid.render();
    //   };

    //   $scope.onInit();

    var dataView = new Slick.Data.DataView();

    var containerEl = "#pwpByItemGrid";

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

};