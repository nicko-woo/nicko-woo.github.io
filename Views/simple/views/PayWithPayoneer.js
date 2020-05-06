var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {
    console.log('pay with payoneer works 320!')

    // const SlickGridExtended = require("./SlickGridExtended");

    const apiUrl = "https://test-app-lp.azurewebsites.net/";

    var self = this;
    self.onMessage = function (msg) {
        switch (msg.key) {
            case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
                Core.Dialogs.BusyWorker.showBusy($element);

                $scope.purchaseOrder = msg.data.data.PurchaseOrder;
                $scope.orderCurrency = $scope.purchaseOrder.Currency;
                $scope.orderItems = msg.data.data.OrderItems;
                $scope.userId = msg.data.session.userId;

                $scope.Initialize();
        }
    };

    $scope.Initialize = function () {
        var promises = [];
        promises.push($scope.GetPayments());

        $q.all(promises).then(function (resolved) {
            Core.Dialogs.BusyWorker.hideBusy($element);
            

            $scope.outstanding = "0.00";
            $scope.paid = "0.00";
            $scope.selectedToPay = "0.00";
            $scope.amountToPay = 0;
            // $scope.userId = $scope.$parent.$root.session.userId;

            $scope.poItems = [];
            $scope.payments = [];


            // $scope.payments = $scope.GetPayments($scope.purchaseOrder.pkPurchaseID);

            $scope.poItems = $scope.GetDataForGrid();
            // $scope.gridByItems = $scope.GetGridByItems();
            // $scope.gridByAmount = $scope.GetGridByAmount();
            // $scope.gridPayments = $scope.GetGridPayments();

            $scope.GetGridByItems();
            $scope.GetGridByAmount();
            $scope.GetGridPayments();

            $scope.gridByItems.onCellChange.subscribe(
                function (e, args) {
                    var tempSelectedToPay = 0;
                    console.log('row: ' + args.row + ' cell: ' + args.cell);
                    tempSelectedToPay = $scope.GetSumSelected($scope.poItems, 'Price', 'ToPayQuantity').toFixed(2);
                    $scope.selectedToPay = tempSelectedToPay;
                });

            $scope.Loaded = true;
            Core.Dialogs.BusyWorker.hideBusy($element);            // $scope.$apply();

        }, function (reason) {
            Core.Dialogs.BusyWorker.hideBusy($element);
            $scope.ShowError = true;
        });
    }

    $scope.GetPayments = function () {
        $http({
            method: 'GET',
            url: apiUrl + 'api/Linnworks/getPayments/' + $scope.purchaseOrder.pkPurchaseID,
            params: {}
        }).then(function (response) {
            $scope.payments = response.data.payments;
            $scope.balance = response.data.currentBalance;
            $scope.GetGridPayments();
            setTimeout(() => $scope.gridPayments.resizeCanvas(), 300);
            

        });
    }

    $scope.GetBalance = function () {
        $http({
            method: 'GET',
            url: apiUrl + 'api/Payoneer/getBalance/' + $scope.userId,
            params: {}
        }).then(function (response) {
            $scope.balance = response.data.balance;
        });
    }

    $scope.GetDataForGrid = function () {
        let data = [];
        if ($scope.orderItems && $scope.orderItems.length) {
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
        }

        return data;
    }

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

        $scope.gridByItems = new Slick.Grid("#pwpByItemGrid", dataViewByItems, columnsByItems, optionsByItems);

        $scope.gridByItems.setColumns(columnsByItems);

        $scope.gridByItems.onCellChange.subscribe(
            function (e, args) {
                var tempSelectedToPay = 0;
                console.log('row: ' + args.row + ' cell: ' + args.cell);
                tempSelectedToPay = $scope.GetSumSelected($scope.poItems, 'Price', 'ToPayQuantity').toFixed(2);
                $scope.selectedToPay = tempSelectedToPay;
            });
    }


    $scope.GetGridPayments = function () {
        let dataViewPayments = new Slick.Data.DataView();

        let columnsPayments = [
            { id: "column1", name: "Date", field: "pDate", width: 220, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column2", name: "Paid", field: "PaidAmount", width: 220, cssClass: "slick-cell slickgrid-align-center" },
            { id: "column3", name: "Items paid", field: "PaidItemsQuantity", width: 220, cssClass: "slick-cell slickgrid-align-center" }
        ];

        let optionsPayments = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            enableAutoResize: true,
            editable: true,
            asyncEditorLoading: false,
            autoEdit: false
        };

        let testData = [
            { id: "123", pDate: "30 Apr 2020", PaidAmount: 250, PaidItemsQuantity: 12 },
            { id: "124", pDate: "28 Apr 2020", PaidAmount: 100, PaidItemsQuantity: 5 }
        ];
        let data = testData;
        // let data = $scope.payments;

        if (data && data.length) {
            dataViewPayments.setItems(data);
        }

        $scope.gridPayments = new Slick.Grid("#pwpPaymentsGrid", dataViewPayments, columnsPayments, optionsPayments);
        $scope.gridPayments.setColumns(columnsPayments);
    }

    $scope.PayByItems = function () {
        console.log("button works");
    }

    $scope.GetSumSelected = function (items, propA, propB) {
        return items.reduce(function (a, b) {
            return (a + (b[propA] * b[propB]));
        }, 0);
    };
 
    $scope.showTabByAmount = function () {
        setTimeout(() => $scope.gridByAmount.resizeCanvas(), 200);
        // $scope.gridByAmount.resizeCanvas();
    }


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

        $scope.gridByAmount = new Slick.Grid("#pwpByAmountGrid", dataViewByAmount, columnsByAmount, optionsByAmount);
        $scope.gridByAmount.setColumns(columnsByAmount);

    }

    $scope.Close = function () {
        //$scope.$destroy();
        //self.close();
    }

};