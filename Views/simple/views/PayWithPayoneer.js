var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works164!')

    $scope = $scope.$parent;
    $scope.orderItems = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    $scope.outstanding = "0.00";
    $scope.paid = "0.00";
    $scope.selectedToPay = "0.00";
    $scope.balance = null;
    $scope.orderCurrency = '$';

    // // pay by orderItems data grid

    //   $scope.onInit = function () {
    //     pwpByItemsGrid.invalidateAllRows();
    //     pwpByItemsGrid.render();
    //   };

    //   $scope.onInit();

    var dataView = new Slick.Data.DataView();

    var containerEl = "#pwpByItemGrid";

    //Create columns
    var columns = [
        { id: "column1", name: "SKU", field: "SKU", width: 160 },
        { id: "column2", name: "Ordered Quantity", field: "Quantity", width: 160 },
        { id: "column3", name: "Paid Quantity", field: "Quantity", width: 140 },
        { id: "column4", name: "Price", field: "UnitCost", width: 100 },
        { id: "column5", name: "Quantity To Pay", field: "Quantity", width: 160, editor: Slick.Editors.Text }
    ];

    var options = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        enableAutoResize: true,
        editable: true
        // enableAddRow: true,
        // enableCellNavigation: true,
        // asyncEditorLoading: false,
        // autoEdit: false
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

    var data = $scope.orderItems;

    // This will fire the change events and update the grid.
    dataView.setItems(data);

    $scope.init = function () {
        // grid.resetActiveCell();
        dataView.beginUpdate();
        grid.invalidateAllRows();
        dataView.setItems(data);
        dataView.endUpdate();
        grid.render();
        // grid.resizeCanvas();
        // grid.invalidate();
    };

    $scope.payByItems = function () {
        console.log("button works");
        $scope.init();
    }

    $scope.init();

    grid.onCellChange.subscribe(
        function (e,args) {
            console.log('row: ' + args.row + ' cell: ' + args.cell);
            var tempUnits = $scope.orderItems.slice();
            for (let i = 0; i <= tempUnits.length; i++) {
                $scope.selectedToPay += tempUnits[i].Cost * tempUnits[i].Quantity;
                
            }

            $scope.apply();


        });

    // var grid = $element.find(".slickgrid.pwpGrid");
    // gridScope = grid.scope();
    // $scope.gridScope = gridScope;
    // $scope.gridScope.setItems($scope.orderItems);

};