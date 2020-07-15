var RemoveOutOfStockView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService, $http, $timeout) {

    $scope.itemsToRemove = $scope.$parent.$parent.$parent.order.Items;
    

    // $scope.removeOutOfStock = function () {
    //     console.log("items removed (test)");
    // };


    

    // $scope.GetGridItemsToRemove = function () {

    //     let dataViewItemsToRemove = new Slick.Data.DataView();

    //     let columnsItemsToRemove = [
    //         { id: "column1", name: "SKU", field: "ChannelSKU", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
    //         { id: "column2", name: "Quantity", field: "Quantity", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" },
    //         { id: "column3", name: "Unit Cost", field: "Cost", width: 220, cssClass: "slick-cell slickgrid-align-center", headerCssClass: "slick-header-column slickgrid-align-center" }
    //     ];

    //     let optionsItemsToRemove = {
    //         enableCellNavigation: true,
    //         enableColumnReorder: false,
    //         enableAutoResize: true,
    //         forceFitColumns: true,
    //         asyncEditorLoading: false,
    //         autoEdit: false
    //     };

    //     let data = $scope.data1;

    //     if (data && data.length) {
    //         dataViewItemsToRemove.setItems(data);
    //     }

    //     $scope.gridItemsToRemove = new Slick.Grid("#roosItemsGrid", dataViewItemsToRemove, columnsItemsToRemove, optionsItemsToRemove);
    //     $scope.gridItemsToRemove.setColumns(columnsItemsToRemove);
    // }

};