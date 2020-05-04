var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {
    console.log('pay with payoneer works 268!')

    self.onMessage = function(msg) {
        switch (msg.key) {
            case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
                Core.Dialogs.BusyWorker.showBusy($element);
                $scope.PurchaseOrder = msg.data.data.PurchaseOrder;
                // $scope.Initialize();
        }
    };


    $scope.Initialize = function()
    {

        // var promises = [];
        // promises.push($scope.GetStockLevels());
        
        // $q.all(promises).then(function (resolved) {
        //     Core.Dialogs.BusyWorker.hideBusy($element);
        //     $scope.Loaded = true;
        //     $scope.$apply();
        //     $scope.LoadCharts();
        // }, function (reason) {
        //     Core.Dialogs.BusyWorker.hideBusy($element);
        //     $scope.ShowError = true;
        // });        
    }

    $scope = $scope.$parent;

    var self = this;

    const apiUrl = "https://test-app-lp.azurewebsites.net/";

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

    $scope.gridByItems = null;
    $scope.gridByAmount = null;
    $scope.gridPayments = null;

    $scope.GetPayments = function () {
        $http({
            method: 'GET',
            url: apiUrl + '/api/Linnworks/Payments/getPayments/' + $scope.purchaseOrder.pkPurchaseID,
            params: { }
        }).then(function (response) {
            $scope.payments = response.data;
        });
    }

    $scope.GetBalance = function () {
        $http({
            method: 'GET',
            url: apiUrl + '/api/Payoneer/Balance/getBalance/' + $scope.userId,
            params: { }
        }).then(function (response) {
            $scope.balance = response.data;
        });
    }

    $scope.GetDataForGrid = function () {
        let data = [];
        $scope.orderItems.forEach(function (orderItem) {
            var poItem = {
                id: orderItem.fkStockItemId,
                SKU: orderItem.SKU,
                OrderedQuantity: orderItem.Quantity,
                PaidQuantity: 0,
                Price: orderItem.UnitCost,
                ToPayQuantity: 0,
                Total: orderItem.Quantity * orderItem.UnitCost
            }
            data.push(poItem);
        })
        return data;
    }
    $scope.poItems = $scope.GetDataForGrid();

    $scope.GetGridByItems = function () {
        let dataViewByItems = new Slick.Data.DataView();

        let columnsByItems = [
            { id: "column1", name: "SKU", field: "SKU", width: 220, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 160, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column3", name: "Paid Quantity", field: "PaidQuantity", width: 140, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column4", name: "Price", field: "Price", width: 100, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: Slick.Editors.Text, cssClass: "slick-cell slickgrid-text-editor-icon slickgrid-align-center" }
        ];

        let optionsByItems = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            enableAutoResize: true,
            editable: true,
            asyncEditorLoading: false,
            autoEdit: false
        };

        let data = $scope.poItems;

        dataViewByItems.setItems(data);

        return new Slick.Grid("#pwpByItemGrid", dataViewByItems, columnsByItems, optionsByItems);
    }

    $scope.gridByItems = $scope.GetGridByItems();

    $scope.PayByItems = function () {
        console.log("button works");
    }

    $scope.GetSumSelected = function (items, propA, propB) {
        return items.reduce(function (a, b) {
            return (a + (b[propA] * b[propB]));
        }, 0);
    };

    $scope.gridByItems.onCellChange.subscribe(
        function (e, args) {
            var tempSelectedToPay = 0;
            console.log('row: ' + args.row + ' cell: ' + args.cell);
            tempSelectedToPay = $scope.GetSumSelected($scope.poItems, 'Price', 'ToPayQuantity').toFixed(2);
            $scope.selectedToPay = tempSelectedToPay;
        });


    $scope.GetGridByAmount = function () {
        let dataViewByAmount = new Slick.Data.DataView();

        let columnsByAmount = [
            { id: "column1", name: "SKU", field: "SKU", width: 220, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 200, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column3", name: "Price", field: "Price", width: 200, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column4", name: "Total", field: "Total", width: 200, cssClass: "slick-cell slickgrid-align-center" }
        ];

        let optionsByAmount = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            enableAutoResize: true,
            editable: true,
            asyncEditorLoading: false,
            autoEdit: false
        };

        dataViewByAmount.setItems($scope.poItems);

        return new Slick.Grid("#pwpByAmountGrid", dataViewByAmount, columnsByAmount, optionsByAmount);

    }

    $scope.gridByAmount = $scope.GetGridByAmount();

    $scope.init = function () {
        // $scope.gridByItems.resetActiveCell();
        // dataViewByItems.beginUpdate();
        // $scope.gridByItems.invalidateAllRows();
        // dataViewByItems.setItems($scope.dataByItems);
        // dataViewByItems.endUpdate();
        // $scope.gridByItems.render();
        // $scope.gridByItems.updateRowCount();
        // $scope.gridByItems.resizeCanvas();
        // $scope.gridByItems.invalidate();
        // $("#pwpByItemGrid").children(".slick-viewport").css("height", "300px");

        $scope.selectedToPay = $scope.GetSumSelected($scope.poItems, 'Price', 'ToPayQuantity').toFixed(2);

        $scope.$apply();

        $scope.gridByItems.resizeCanvas();

        $scope.gridByAmount.resizeCanvas();
        
    };

    $scope.init();

    $scope.showTabByAmount = function () {
        setTimeout(function () {
            $scope.gridByAmount.resizeCanvas();
        }, 200);
    };

    $('#pwpByItemGrid').on('shown', setTimeout(function () {
        $scope.gridByItems.resizeCanvas();
        console.log("dataview refreshed after timeout")
    }, 500));

    
    $scope.Close = function()
    {
        self.close();
    }

};