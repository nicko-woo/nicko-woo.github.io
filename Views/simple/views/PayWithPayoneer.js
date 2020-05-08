var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {
    console.log('pay with payoneer works 344!')

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
        promises.push($scope.GetPayments($scope.GetGridPayments));

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

    $scope.GetPayments = function (callback) {
        $http({
            method: 'GET',
            url: apiUrl + 'api/Linnworks/getPayments/' + $scope.purchaseOrder.pkPurchaseID,
            params: {}
        }).then(function (response) {
            $scope.payments = response.data.payments;
            $scope.balance = response.data.currentBalance;
            // response.data.payments.forEach(function(payment){
            //     $scope.payments.push(payment);
            // })
            
            const people = [{ id: 1, name: "John" }, { id: 2, name: "Alice" }];
            const address = [{ id: 1, peopleId: 1, address: 'Some street 1' }, { id: 2, peopleId: 2, address: 'Some street 2' }]

            let op = people.map((e, i) => {
                let temp = address.find(element => element.id === e.id)
                if (temp.address) {
                    e.address = temp.address;
                }
                return e;
            })

            const tempPayments = $scope.payments;
            const tempItems = $scope.orderItems;

            let gridData = tempPayments.map((e, i) => {
                let temp = tempItems.find(item => item.pkPurchaseItemId === e.id)

                if (temp.id) {
                    e.SKU = temp.SKU;
                    e.OrderedQuantity = temp.Quantity;
                    e.UnitCost = temp.UnitCost;
                    e.ItemTitle = temp.ItemTitle;
                }
                
                return e;
            })

            callback();
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
            { id: "column1", name: "SKU", field: "SKU", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 160, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column3", name: "Paid Quantity", field: "PaidQuantity", width: 140, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column4", name: "Price", field: "Price", width: 100, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: Slick.Editors.Float, cssClass: "slick-cell slickgrid-text-editor-icon slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
        ];

        let optionsByItems = {
            enableColumnReorder: false,
            enableAutoResize: true,
            editable: true,
            asyncEditorLoading: false,
            autoEdit: false,
            forceFitColumns: true,
            cssFormatter: null
        };

        let data = $scope.poItems;

        dataViewByItems.setItems(data);

        $scope.gridByItems = new Slick.Grid("#pwpByItemGrid", dataViewByItems, columnsByItems, optionsByItems);

        $scope.gridByItems.setColumns(columnsByItems);

        // $scope.gridByItems.setSelectionModel(new Slick.RowSelectionModel({ selectActiveRow: true }));

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
            { id: "column1", name: "Date", field: "pDate", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column2", name: "Paid", field: "paidAmount", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column3", name: "Items paid", field: "paidItemsQuantity", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
        ];

        let optionsPayments = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            enableAutoResize: true,
            forceFitColumns: true,
            asyncEditorLoading: false,
            autoEdit: false
        };

        let data = $scope.payments;

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
        setTimeout(() => $scope.gridByAmount.resizeCanvas(), 300);
        // $scope.gridByAmount.resizeCanvas();
    }


    $scope.GetGridByAmount = function () {
        let dataViewByAmount = new Slick.Data.DataView();

        let columnsByAmount = [
            { id: "column1", name: "SKU", field: "SKU", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 200, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column3", name: "Price", field: "Price", width: 200, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column4", name: "Total", field: "Total", width: 200, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
        ];

        let optionsByAmount = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            enableAutoResize: true,
            forceFitColumns: true,
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