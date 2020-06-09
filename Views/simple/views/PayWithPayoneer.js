var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {
    console.log('pay with payoneer works 444!')

    const apiUrl = "https://test-app-lp.azurewebsites.net/";

    var moment = require('moment');

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
        promises.push($scope.GetBalance());

        $q.all(promises).then(function (resolved) {
            Core.Dialogs.BusyWorker.hideBusy($element);

            $scope.outstanding = 0;
            $scope.paid = 0;
            $scope.selectedToPay = 0;
            $scope.amountToPay = 0;
            $scope.topupAccount = false;
            $scope.paymentsExist = false;

            $scope.showTabByItems = true;
            $scope.showTabByAmount = true;

            $scope.paymentsType = 0;


            $scope.gridItems = [];
            $scope.gridItems = $scope.GetDataForGrid();

            if ($scope.payments && $scope.payments.length > 0)  {
                $scope.GetGridPayments();
                $scope.paymentsExist = true;

                $scope.paymentsType = $scope.payments[0].type;

                // $('.tabset').scope().setActive(0);

                if ($scope.paymentsType == 0) {
                    $scope.showTabByItems = true;
                    $scope.showTabByAmount = false;
                }

                if ($scope.paymentsType == 1) {
                    $scope.showTabByItems = false;
                    $scope.showTabByAmount = true;
                }
            };

            if ($scope.showTabByItems) {
                $scope.GetGridByItems();
            }

            if ($scope.showTabByAmount) {
                $scope.GetGridByAmount();
            }

            $scope.GetGridByItems();
            $scope.GetGridByAmount();

            $scope.paid = $scope.GetSumSelected($scope.gridItems, 'Quantity', 'Price').toFixed(2);
            $scope.outstanding = $scope.GetSumOutstanding($scope.gridItems, 'OrderedQuantity', 'Quantity', 'Price').toFixed(2);

            $scope.gridByItems.onCellChange.subscribe(
                function (e, args) {
                    var tempSelectedToPay = 0;
                    tempSelectedToPay = $scope.GetSumSelected($scope.gridItems, 'Price', 'ToPayQuantity').toFixed(2);
                    $scope.selectedToPay = tempSelectedToPay;
                });

            $scope.Loaded = true;
            Core.Dialogs.BusyWorker.hideBusy($element);
            // $scope.$apply();

        }, function (reason) {
            Core.Dialogs.BusyWorker.hideBusy($element);
            $scope.ShowError = true;
        });
    };

    $scope.GetPayments = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: apiUrl + 'api/Linnworks/getPayments',
            params: {},
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': $scope.userId,
                'PurchaseId': $scope.purchaseOrder.pkPurchaseID
            },
        }).then(function success(response) {
            $scope.payments = response.data;
            deferred.resolve();

        }, function error(response) {
            deferred.reject();
        });

        return deferred.promise;
    };

    $scope.GetBalance = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: apiUrl + 'api/Payoneer/getBalance/' + $scope.userId,
            params: {}
        }).then(function (response) {
            $scope.balance = response.data.balance;
            deferred.resolve();

        }, function error(response) {
            deferred.reject();
        });

        return deferred.promise;
    };

    $scope.GetDataForGrid = function () {
        let data = [];
        if ($scope.orderItems && $scope.orderItems.length) {
            $scope.orderItems.forEach(function (orderItem) {
                var totalPaidPerItem = 0;

                var items = [];
                $scope.payments.forEach(function (payment) {
                    var tempPaymentItem = payment.items.find(i => i.sku === orderItem.SKU);
                    if (tempPaymentItem) {
                        items.push(tempPaymentItem);
                    }
                });

                if (items && items.length > 0) {
                    totalPaidPerItem = $scope.GetPaidPerItem(items, "quantity");
                } else {
                    totalPaidPerItem = 0;
                }

                var gridItem = {
                    id: orderItem.fkStockItemId,
                    SKU: orderItem.SKU,
                    OrderedQuantity: orderItem.Quantity,
                    Quantity: totalPaidPerItem,
                    Price: orderItem.UnitCost,
                    ToPayQuantity: 0,
                    Total: orderItem.Quantity * orderItem.UnitCost
                };

                data.push(gridItem);
            })
        }

        return data;
    };

    $scope.GetGridByItems = function () {
        let dataViewByItems = new Slick.Data.DataView();

        let columnsByItems = [
            { id: "column1", name: "SKU", field: "SKU", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column2", name: "Ordered Quantity", field: "OrderedQuantity", width: 160, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column3", name: "Paid Quantity", field: "Quantity", width: 140, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column4", name: "Price", field: "Price", width: 100, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            // { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: Slick.Editors.Float, cssClass: "slick-cell slickgrid-text-editor-icon slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center", formatter: roundOffValuesFormatter}
            { id: "column5", name: "Quantity To Pay", field: "ToPayQuantity", width: 160, editor: CustomFloatPositiveEditor, cssClass: "slick-cell slickgrid-text-editor-icon slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center"}
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

        let data = $scope.gridItems;

        dataViewByItems.setItems(data);
        $scope.gridByItems = new Slick.Grid("#pwpByItemGrid", dataViewByItems, columnsByItems, optionsByItems);
        $scope.gridByItems.setColumns(columnsByItems);
        $scope.gridByItems.setSelectionModel(new Slick.RowSelectionModel({ selectActiveRow: true }));

    };

    $scope.GetGridPayments = function () {
        let dataViewPayments = new Slick.Data.DataView();

        let columnsPayments = [
            { id: "column1", name: "Date", field: "paymentDate", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column2", name: "Paid " + $scope.orderCurrency, field: "paidAmount", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
            // { id: "column3", name: "Items paid", field: "paidItemsQuantity", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
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

        data.forEach(function (payment) {
            payment.paymentDate = moment(payment.paymentDate).format('MM/DD/YYYY, HH:mm:ss');
        })

        if (data && data.length) {
            dataViewPayments.setItems(data);
        }

        $scope.gridPayments = new Slick.Grid("#pwpPaymentsGrid", dataViewPayments, columnsPayments, optionsPayments);
        $scope.gridPayments.setColumns(columnsPayments);
    };

    $scope.PayByItems = function () {
        console.log("pay by item");

        if (parseFloat($scope.selectedToPay) <= 0) {
            Core.Dialogs.addNotify("You need to select at least one item to pay", "WARNING");
            return;
        };

        if (parseFloat($scope.selectedToPay) > $scope.balance) {
            Core.Dialogs.addNotify("You need to top-up your balance before payment processing", "WARNING");
            return;
        }

        if (parseFloat($scope.selectedToPay) > $scope.outstanding) {
            Core.Dialogs.addNotify("You have selected more items than you need to pay", "WARNING");
            return;
        }

        Core.Dialogs.BusyWorker.showBusy($element);

        let paymentItems = [];
        $scope.gridItems.forEach(function (gridItem) {

            if (gridItem.ToPayQuantity > 0) {
                let paymentItem = {
                    Id: gridItem.id,
                    SKU: gridItem.SKU,
                    Price: gridItem.Price,
                    Quantity: gridItem.ToPayQuantity
                }
                paymentItems.push(paymentItem);
            }
        })

        let payByItemRequest = {
            // userId: $scope.userId,
            // supplierId: $scope.purchaseOrder.fkSupplierId,
            // orderId: $scope.purchaseOrder.pkPurchaseID,
            paidAmount: parseFloat($scope.selectedToPay),
            type: 0,
            currency: $scope.orderCurrency,
            items: paymentItems
        };

        $http({
            method: 'POST',
            url: apiUrl + 'api/Payoneer/payByItem/',
            // params: {},
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': $scope.userId,
                'PurchaseId': $scope.purchaseOrder.pkPurchaseID
            },

            data: payByItemRequest

        }).then(function (response) {
            $scope.GetPayments()
                .then(function () {
                    $scope.gridItems = $scope.GetDataForGrid();
                    $scope.GetGridByItems();
                    $scope.GetGridByAmount();
                    $scope.GetGridPayments();
                    $scope.paid = $scope.GetSumSelected($scope.gridItems, 'Quantity', 'Price').toFixed(2);
                    $scope.outstanding = $scope.GetSumOutstanding($scope.gridItems, 'OrderedQuantity', 'Quantity', 'Price').toFixed(2);
                    $scope.selectedToPay = $scope.GetSumSelected($scope.gridItems, 'Price', 'ToPayQuantity').toFixed(2);

                    $scope.gridByItems.onCellChange.subscribe(
                        function (e, args) {
                            var tempSelectedToPay = 0;
                            tempSelectedToPay = $scope.GetSumSelected($scope.gridItems, 'Price', 'ToPayQuantity').toFixed(2);
                            $scope.selectedToPay = tempSelectedToPay;
                        });

                    Core.Dialogs.BusyWorker.hideBusy($element);
                    Core.Dialogs.addNotify("Congrats, your payment was handled successfully :)", "SUCCESS");
                    return;
                })

        }, function error(response) {
            Core.Dialogs.BusyWorker.hideBusy($element);

            if (response.status === 401) {
                Core.Dialogs.addNotify("You need to log-in in Pay with Payoneer app before payment processing", "WARNING");
                return;
            };

            Core.Dialogs.addNotify("Sorry, but something went wrong :(", "ERROR");
            return;
        });
    };

    $scope.payByAmount = function () {
        if (parseFloat($scope.amountToPay) <= 0) {
            Core.Dialogs.addNotify("The value of the amount cannot be less than zero", "WARNING");
            return;
        }

        if(!$scope.form.$valid) {
            Core.Dialogs.addNotify("Enter valid value", "WARNING");
            return;
          }

        Core.Dialogs.BusyWorker.showBusy($element);

        let payByAmountRequest = {
            // userId: $scope.userId,
            // supplierId: $scope.purchaseOrder.fkSupplierId,
            // orderId: $scope.purchaseOrder.pkPurchaseID,
            paidAmount: parseFloat($scope.amountToPay),
            type: 1,
            currency: $scope.orderCurrency
        };

        $http({
            method: 'POST',
            url: apiUrl + 'api/Payoneer/payByAmount/',
            // params: {},
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': $scope.userId,
                'PurchaseId': $scope.purchaseOrder.pkPurchaseID
            },
            data: payByAmountRequest

        }).then(function (response) {
            $scope.GetPayments()
                .then(function () {
                    $scope.gridItems = $scope.GetDataForGrid();
                    $scope.GetGridByItems();
                    $scope.GetGridByAmount();
                    $scope.GetGridPayments();
                    $scope.paid = $scope.GetSumSelected($scope.gridItems, 'Quantity', 'Price').toFixed(2);
                    $scope.outstanding = $scope.GetSumOutstanding($scope.gridItems, 'OrderedQuantity', 'Quantity', 'Price').toFixed(2);
                    $scope.selectedToPay = $scope.GetSumSelected($scope.gridItems, 'Price', 'ToPayQuantity').toFixed(2);

                    $scope.gridByItems.onCellChange.subscribe(
                        function (e, args) {
                            var tempSelectedToPay = 0;
                            tempSelectedToPay = $scope.GetSumSelected($scope.gridItems, 'Price', 'ToPayQuantity').toFixed(2);
                            $scope.selectedToPay = tempSelectedToPay;
                        });

                    Core.Dialogs.BusyWorker.hideBusy($element);
                    Core.Dialogs.addNotify("Congrats, your payment was handled successfully :)", "SUCCESS");
                    return;
                })

        }, function error(response) {
            Core.Dialogs.BusyWorker.hideBusy($element);

            if (response.status === 401) {
                Core.Dialogs.addNotify("You need to log-in in Pay with Payoneer app before payment processing", "WARNING");
                return;
            };

            Core.Dialogs.addNotify("Sorry, but something went wrong :(", "ERROR");
            return;
        });
    }

    $scope.GetSumSelected = function (items, propA, propB) {
        return items.reduce(function (a, b) {
            return (a + (b[propA] * b[propB]));
        }, 0);
    };

    $scope.GetPaidPerItem = function (items, propA) {
        return items.reduce(function (a, b) {
            return (a + (b[propA]));
        }, 0);
    };

    $scope.GetSumOutstanding = function (items, propA, propB, propC) {
        return items.reduce(function (a, b) {
            return (a + ((b[propA] - b[propB]) * b[propC]));
        }, 0);
    };

    $scope.showTabByAmount = function () {
        setTimeout(() => $scope.gridByAmount.resizeCanvas(), 300);
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

        dataViewByAmount.setItems($scope.gridItems);
        $scope.gridByAmount = new Slick.Grid("#pwpByAmountGrid", dataViewByAmount, columnsByAmount, optionsByAmount);
        $scope.gridByAmount.setColumns(columnsByAmount);

    }

    function CustomFloatPositiveEditor(args) {
        var $element,
            defaultValue,
            scope = this,
            decimalPlaces = parseInt(args.column.editorArg) || 20, //20 max supported by toFixed
            loadSource = function(source) {
                $element.empty();
                $element.val(defaultValue);
            }

        this.init = function() {
            $element = $('<input type="text" class="editor-text" />');

            $element.bind("keydown.nav", function(e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });

            $element.appendTo(args.container);
            $element.focus().select();
        };

        this.destroy = function() {
            $element.remove();
        };

        this.focus = function() {
            $element.focus();
        };

        this.loadValue = function(item) {
            defaultValue = item[args.column.field];
            $element.val(defaultValue);
            $element[0].defaultValue = defaultValue;
            $element.select();

            if (typeof args.column.editorSource == "function") {
                args.callback = loadSource;
                args.column.editorSource(args);
            }
        };

        this.serializeValue = function() {
            return parseFloat($element.val(), 10) || 0;
        };

        this.applyValue = function(item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function() {
            return (!($element.val() == "" && defaultValue == null)) && ($element.val() != defaultValue);
        };

        this.validate = function() {

            var row = args.grid.getDataItem(args.row);
            var fieldPaid = args.grid.getColumns()[2].field;
            var fieldOrdered = args.grid.getColumns()[1].field;
            var outstandingPerItem = row[fieldOrdered] - row[fieldPaid];

            if (isNaN($element.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid number"
                };
            }

            if ($element.val() < 0) {
                return {
                    valid: false,
                    msg: "Please enter a positive number"
                };
            }

            // console.log('row: ' + args.row + ' cell: ' + args.cell);

            if ($element.val() > outstandingPerItem) {
                Core.Dialogs.addNotify("You cannot select more than you need to pay for this SKU", "WARNING");
                return {
                    valid: false,
                    msg: "Please enter a positive number"
                };
            }

            if (new RegExp('^\\d*\\.?\\d{0,' + decimalPlaces + '}$').test($element.val()) === false) {
                return {
                    valid: false,
                    msg: "Please round to " + decimalPlaces + " decimal place" + (decimalPlaces > 1 ? "s" : "")
                };
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }


    $scope.Close = function () {
        $scope.$destroy();
        self.close();
    }

};