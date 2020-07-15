var RemoveOutOfStockView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {

    $scope.Initialize = function () {
        $scope.GetGridItemsToRemove();
    };

    $scope.Initialize();

    $scope.removeOutOfStock = function () {
        console.log("items removed (test)");
    };
    

    $scope.GetGridItemsToRemove = function () {

        let dataViewItemsToRemove = new Slick.Data.DataView();

        let columnsItemsToRemove = [
            { id: "column1", name: "SKU", field: "paymentDate", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column2", name: "Quantity", field: "paidAmount", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
            { id: "column3", name: "Unit Cost", field: "paidAmount", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }

            // { id: "column3", name: "Items paid", field: "paidItemsQuantity", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
        ];

        let optionsItemsToRemove = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            enableAutoResize: true,
            forceFitColumns: true,
            asyncEditorLoading: false,
            autoEdit: false
        };

        let data = $scope.$parent.order.Items;

        if (data && data.length) {
            dataViewItemsToRemove.setItems(data);
        }

        $scope.gridItemsToRemove = new Slick.Grid("#roosItemsGrid", dataViewItemsToRemove, columnsItemsToRemove, optionsItemsToRemove);
        $scope.gridItemsToRemove.setColumns(columnsItemsToRemove);
    }

};