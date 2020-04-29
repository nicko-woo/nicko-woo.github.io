var PayWithPayoneerView = function ($scope, $element, $filter, $compile, $q, controlService, stockService, purchaseorderService) {
    console.log('pay with payoneer works142!')

    // $scope.gridScope = null;

    $scope = $scope.$parent;
    $scope.items = $scope.$parent.gridScope.getItems();

    $scope.testVar = $scope.$parent.purchaseOrder.pkPurchaseID;
    $scope.payments = [];

    // var pwpByItemsGrid;
    // var columns = [
    //     { id: "column1", name: "SKU", field: "SKU" },
    //     { id: "column2", name: "Ordered Quantity", field: "Quantity" },
    //     { id: "column3", name: "Paid Quantity", field: "Quantity" },
    //     { id: "column4", name: "Price", field: "UnitCost" },
    //     { id: "column5", name: "Quantity To Pay", field: "Quantity" }
    // ];

    // var options = {
    //     enableCellNavigation: true,
    //     enableColumnReorder: false,
    //     enableAutoResize: true,

    // };

    // $(function () {
    //     var data = $scope.items;
    //     pwpByItemsGrid = new Slick.Grid("#pwpByItemGrid", data, columns, options);
    //     // $(".l0").addClass("slick-header-column")

    //     // pwpByItemsGrid.onScroll.subscribe(function () {
    //     //     $(".l0").addClass("slick-header-column")
    //     // })
    // })

    //   $scope.onInit = function () {
    //     pwpByItemsGrid.invalidateAllRows();
    //     pwpByItemsGrid.render();
    //   };

    //   $scope.onInit();

    function requiredFieldValidator(value) {
        if (value == null || value == undefined || !value.length) {
          return {valid: false, msg: "This is a required field"};
        } else {
          return {valid: true, msg: null};
        }
      }
    
      var grid;
      var data = [];
      var columns = [
        {id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", editor: Slick.Editors.Text, validator: requiredFieldValidator},
        {id: "desc", name: "Description", field: "description", width: 100, editor: Slick.Editors.LongText},
        {id: "duration", name: "Duration", field: "duration", editor: Slick.Editors.Text},
        {id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Slick.Formatters.PercentCompleteBar, editor: Slick.Editors.PercentComplete},
        {id: "start", name: "Start", field: "start", minWidth: 60, editor: Slick.Editors.Date},
        {id: "finish", name: "Finish", field: "finish", minWidth: 60, editor: Slick.Editors.Date},
        {id: "effort-driven", name: "Effort Driven", width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox}
      ];
      var options = {
        editable: true,
        enableAddRow: true,
        enableCellNavigation: true,
        asyncEditorLoading: false,
        autoEdit: false
      };
    
      $(function () {
        for (var i = 0; i < 11; i++) {
          var d = (data[i] = {});
    
          d["title"] = "Task " + i;
          d["description"] = "This is a sample task description.\n  It can be multiline";
          d["duration"] = "5 days";
          d["percentComplete"] = Math.round(Math.random() * 100);
          d["start"] = "01/01/2009";
          d["finish"] = "01/05/2009";
          d["effortDriven"] = (i % 5 == 0);
        }
    
        grid = new Slick.Grid("#pwpByItemGrid", data, columns, options);
    
        grid.setSelectionModel(new Slick.CellSelectionModel());
    
        grid.onAddNewRow.subscribe(function (e, args) {
          var item = args.item;
          grid.invalidateRow(data.length);
          data.push(item);
          grid.updateRowCount();
          grid.render();
        });
      })

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
};