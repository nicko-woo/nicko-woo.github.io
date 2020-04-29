var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works118!')

    $scope.gridScope = null;

    $scope = $scope.$parent;
    $scope.items = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];
    $scope.supplierList = [];


    // // // var dataView = new Slick.Data.DataView();

    // // // var containerEl = "#myGrid123";

    // // // //Create columns
    // // // var columns = [
    // // //     { id: "column1", name: "ID", field: "id" },
    // // //     { id: "column2", name: "Language", field: "lang" },
    // // //     { id: "column3", name: "Year", field: "year" }
    // // // ];

    // // // var options = {
    // // //     enableCellNavigation: true,
    // // //     enableColumnReorder: false
    // // // };

    // // // // Pass it as a data provider to SlickGrid.
    // // // var grid = new Slick.Grid(containerEl, dataView, columns, options);

    // // // // Make the grid respond to DataView change events.
    // // // dataView.onRowCountChanged.subscribe(function (e, args) {
    // // //     grid.updateRowCount();
    // // //     grid.render();
    // // // });

    // // // dataView.onRowsChanged.subscribe(function (e, args) {
    // // //     grid.invalidateRows(args.rows);
    // // //     grid.render();
    // // // });

    // // // var data = [
    // // //     {'id': 'l1', 'lang': 'Java', 'year': 1995},
    // // //     {'id': 'l2', 'lang': 'JavaScript', 'year': 1995},
    // // //     {'id': 'l3', 'lang': 'C#', 'year': 2000},
    // // //     {'id': 'l4', 'lang': 'Python', 'year': 1991}];

    // // //   // This will fire the change events and update the grid.
    // // //   dataView.setItems(data);

    // // //   $scope.init = function () {
    // // //     dataView.beginUpdate();
    // // //     grid.invalidateAllRows();
    // // //     dataView.setItems(data);
    // // //     dataView.endUpdate();
    // // //     grid.render();
    // // //   };

    // // //   $scope.init();

    // // //   $scope.refreshData = function() {
    // // //     dataView.beginUpdate();
    // // //     grid.invalidateAllRows();
    // // //     dataView.setItems(data);
    // // //     dataView.endUpdate();
    // // //     grid.render();
    // // //   }


    // var grid;
    // var columns = [{
    //     id: "column",
    //     name: "",
    //     field: "column",
    //     //selectable: false,
    //     focusable: false
    // },
    // {
    //     id: "data",
    //     name: "Data",
    //     field: "data"
    // }
    // ];

    // var options = {
    //     enableCellNavigation: true,
    //     enableColumnReorder: false
    // };

    // $(function () {
    //     var data = [];
    //     for (var i = 0; i < 100; i++)
    //         data[i] = {
    //             column: "Column " + i,
    //             data: i

    //         };

    //     grid = new Slick.Grid("#myGrid123", data, columns, options);
    //     $(".l0").addClass("slick-header-column")

    //     grid.onScroll.subscribe(function () {
    //         $(".l0").addClass("slick-header-column")
    //     })
    // })

    var grid;
    var columns = [
        { id: "column1", name: "SKU", field: "SKU" },
        { id: "column2", name: "Quantity", field: "Quantity" },
        { id: "column3", name: "Price", field: "UnitCost" }
    ];

    var options = {
        enableCellNavigation: true,
        enableColumnReorder: false
    };

    $(function () {
        var data = $scope.items;
        grid = new Slick.Grid("#pwpByItemGrid", data, columns, options);
        $(".l0").addClass("slick-header-column")

        grid.onScroll.subscribe(function () {
            $(".l0").addClass("slick-header-column")
        })
    })


};