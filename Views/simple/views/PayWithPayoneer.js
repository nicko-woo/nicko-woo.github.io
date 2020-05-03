var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works 227!')

    $scope = $scope.$parent;
    $scope.orderItems = $scope.$parent.gridScope.getItems();

    $scope.purchaseOrder = $scope.$parent.purchaseOrder;
    $scope.payments = [];
    $scope.outstanding = "0.00";
    $scope.paid = "0.00";
    $scope.selectedToPay = "0.00";
    $scope.amountToPay = 0;
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

    var dataViewByItems = new Slick.Data.DataView();

    // Create columnsByItems
    var columnsByItems = [
        { id: "column1", name: "SKU", field: "SKU", width: 220, cssClass: "slick-cell slickgrid-align-center" },
        { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 160, cssClass: "slick-cell slickgrid-align-center" },
        { id: "column3", name: "Paid Quantity", field: "PaidQuantity", width: 140, cssClass: "slick-cell slickgrid-align-center" },
        { id: "column4", name: "Price", field: "Price", width: 100, cssClass: "slick-cell slickgrid-align-center" },
        { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: Slick.Editors.Text, cssClass: "slick-cell slickgrid-text-editor-icon slickgrid-align-center" }
    ];

    // var columnsByItems = [
    //     { id: "column1", name: "SKU", field: "SKU", width: 160 },
    //     { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 160 },
    //     { id: "column3", name: "Paid Quantity", field: "PaidQuantity", width: 140 },
    //     { id: "column4", name: "Price", field: "Price", width: 100 },
    //     { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: Slick.Editors.Text, cssClass: "slick-cell slickgrid-text-editor-icon slickgrid-align-center" }
    // ];

    // for (var i in columnsByItems) {
    //     if (i == 0) {
    //         columnsByItems[i].cssClass = "slick-header-column slickgrid-align-center";
    //     }
    //     else {
    //         if (!columnsByItems[i].editor) {
    //             columnsByItems[i].cssClass = "slick-cell slickgrid-align-center";
    //         }
    //     }
    // }

    var optionsByItems = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        enableAutoResize: true,
        editable: true,
        asyncEditorLoading: false,
        autoEdit: false
    };

    $scope.dataByItems = $scope.poItems;

    dataViewByItems.setItems($scope.dataByItems);

    var gridByItems = new Slick.Grid("#pwpByItemGrid", dataViewByItems, columnsByItems, optionsByItems);

    // gridByItems.setSelectionModel(new Slick.CellSelectionModel());

    // dataViewByItems.onRowCountChanged.subscribe(function (e, args) {
    //     gridByItems.updateRowCount();
    //     gridByItems.render();
    // });

    // dataViewByItems.onRowsChanged.subscribe(function (e, args) {
    //     gridByItems.invalidateRows(args.rows);
    //     gridByItems.render();
    // });

    $scope.payByItems = function () {
        console.log("button works");
        gridByItems.invalidate();
        gridByItems.render();
    }

    $scope.sumSelected = function (items, propA, propB) {
        return items.reduce(function (a, b) {
            return (a + (b[propA] * b[propB]));
        }, 0);
    };

    gridByItems.onCellChange.subscribe(
        function (e, args) {
            var tempSelectedToPay = 0;
            console.log('row: ' + args.row + ' cell: ' + args.cell);
            tempSelectedToPay = $scope.sumSelected($scope.poItems, 'Price', 'ToPayQuantity').toFixed(2);
            $scope.selectedToPay = tempSelectedToPay;
        });

    $scope.init = function () {
        gridByItems.resetActiveCell();
        dataViewByItems.beginUpdate();
        gridByItems.invalidateAllRows();
        dataViewByItems.setItems($scope.dataByItems);
        dataViewByItems.endUpdate();
        gridByItems.render();
        gridByItems.updateRowCount();
        gridByItems.render();
        gridByItems.resizeCanvas();
        gridByItems.invalidate();
        $('#pwpByItemGrid').on('shown', gridByItems.resizeCanvas());
        $("#pwpByItemGrid").children(".slick-viewport").css( "height", "300px" );

        

        $scope.selectedToPay = $scope.sumSelected($scope.poItems, 'Price', 'ToPayQuantity');

        // setTimeout(function () {
        //     dataViewByItems.beginUpdate();
        //     gridByItems.invalidateAllRows();
        //     dataViewByItems.setItems(data);
        //     dataViewByItems.endUpdate();
        //     gridByItems.render();

        //     console.log("gridByItems re-rendered after timeout")
        // }, 3000);
    };

    $scope.init();

    setTimeout(function () {
        dataViewByItems.refresh();
        gridByItems = new Slick.Grid("#pwpByItemGrid", dataViewByItems, columnsByItems, optionsByItems);

        console.log("dataview refreshed after timeout")
    }, 300);

    // function requiredFieldValidator(value) {
    //     if (value == null || value == undefined || !value.length) {
    //       return {valid: false, msg: "This is a required field"};
    //     } else {
    //       return {valid: true, msg: null};
    //     }
    //   }
    
    //   var testGrid;
    //   var testData = [];
    //   var testColumns = [
    //     {id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", editor: Slick.Editors.Text, validator: requiredFieldValidator},
    //     {id: "desc", name: "Description", field: "description", width: 100, editor: Slick.Editors.LongText},
    //     {id: "duration", name: "Duration", field: "duration", editor: Slick.Editors.Text},
    //     {id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Slick.Formatters.PercentCompleteBar, editor: Slick.Editors.PercentComplete},
    //     {id: "start", name: "Start", field: "start", minWidth: 60, editor: Slick.Editors.Date},
    //     {id: "finish", name: "Finish", field: "finish", minWidth: 60, editor: Slick.Editors.Date},
    //     {id: "effort-driven", name: "Effort Driven", width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox}
    //   ];
    //   var testOptions = {
    //     editable: true,
    //     enableAddRow: true,
    //     enableCellNavigation: true,
    //     asyncEditorLoading: false,
    //     autoEdit: false
    //   };
    
    //   $(function () {
    //     for (var i = 0; i < 500; i++) {
    //       var d = (testData[i] = {});
    
    //       d["title"] = "Task " + i;
    //       d["description"] = "This is a sample task description.\n  It can be multiline";
    //       d["duration"] = "5 days";
    //       d["percentComplete"] = Math.round(Math.random() * 100);
    //       d["start"] = "01/01/2009";
    //       d["finish"] = "01/05/2009";
    //       d["effortDriven"] = (i % 5 == 0);
    //     }

    //     setTimeout(function () {
    //         testGrid = new Slick.Grid("#byAmountGrid", testData, testColumns, testOptions);

    //         console.log("gridByItems re-rendered after timeout")
    //     }, 500);
    
    //     setTimeout(function () {
    //         testGrid = new Slick.Grid("#byAmountGrid", testData, testColumns, testOptions);

    //         console.log("gridByItems re-rendered after timeout")
    //     }, 500);

    //     setTimeout(function () {
    //         testGrid.invalidate();

    //         console.log("gridByItems refreshed after timeout")
    //     }, 500);


    //   })

};