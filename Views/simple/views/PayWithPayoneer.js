var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works180!')

    $scope = $scope.$parent;
    $scope.orderItems = $scope.$parent.gridScope.getItems();

    $scope.purchaseOrder = $scope.$parent.purchaseOrder;
    $scope.payments = [];
    $scope.outstanding = "0.00";
    $scope.paid = "0.00";
    $scope.selectedToPay = "0.00";
    $scope.balance = null;
    $scope.orderCurrency = $scope.purchaseOrder.Currency;
    $scope.userId = $scope.$parent.$root.session.userId;

    $scope.poItems = [];

    $scope.orderItems.forEach(function (orderItem) {
        var poItem = {
            id: orderItem.fkStockItemId,
            SKU: orderItem.SKU,
            OrderedQuantity: orderItem.Quantity,
            PaidQuantity: 0,
            Price: orderItem.UnitCost,
            ToPayQuantity: 0
        }
        $scope.poItems.push(poItem);
    })

    // pay by orderItems data grid

    var dataView = new Slick.Data.DataView();
    var containerEl = "#pwpByItemGrid";

    //Create columns
    var columns = [
        { id: "column1", name: "SKU", field: "SKU", width: 160 },
        { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 160 },
        { id: "column3", name: "Paid Quantity", field: "PaidQuantity", width: 140 },
        { id: "column4", name: "Price", field: "Price", width: 100 },
        { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: Slick.Editors.Text }
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

    var data = $scope.poItems;

    // This will fire the change events and update the grid.
    dataView.setItems(data);

    $scope.payByItems = function () {
        console.log("button works");
        $scope.init();
    }

    $scope.sumSelected = function (items, propA, propB) {
        return items.reduce(function (a, b) {
            return (a + b[propA]) * b[propB];
        }, 0);
    };

    grid.onCellChange.subscribe(
        function (e, args) {
            var tempSelectedToPay = 0;
            console.log('row: ' + args.row + ' cell: ' + args.cell);
            tempSelectedToPay = $scope.sumSelected($scope.poItems, 'Price', 'ToPayQuantity').toFixed(2);
            $scope.selectedToPay = tempSelectedToPay;
        });

    $scope.init = function () {
        // grid.resetActiveCell();
        dataView.beginUpdate();
        grid.invalidateAllRows();
        dataView.setItems(data);
        dataView.endUpdate();
        grid.render();
        // grid.resizeCanvas();
        // grid.invalidate();
        // $('#pwpByItemGrid').on('shown', grid.resizeCanvas);

        $scope.selectedToPay = $scope.sumSelected;
    };

    $scope.init();

    // var grid = $element.find(".slickgrid.pwpGrid");
    // gridScope = grid.scope();
    // $scope.gridScope = gridScope;
    // $scope.gridScope.setItems($scope.orderItems);

};