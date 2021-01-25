var SpecSheetView = function ($scope, $element, $filter, $compile, $q) {
  var self = this;
  $scope.stockItemId = $scope.$parent.$parent.$parent.$parent.itemId;
  self.onMessage = function (msg) {
    switch (msg.key) {
      case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
        $scope.Initialize();
    }
  };

  $scope.Initialize = function () { 
    // $scope = $scope.$parent.$parent.$parent.$parent;
    // $scope.stockItemId = $scope.itemId;
    var InventoryService = require("services/InventoryService");
    var stockService = new Services.StockService();

    // $scope.extPropsNames = InventoryService.getExtendedPropertyNames();
    // $scope.extPropsTypes = InventoryService.GetExtendedPropertyTypes();
    // $scope.extPropsAllNames = InventoryService.getAllExtendedPropertyNames();

    worker.showBusy();
    InventoryService.GetInventoryItemExtendedProperties(
      $scope.stockItemId,
      function (event) {
        if (event.hasErrors()) {
          showErrorAndClose(event.error.errorMessage);
        } else {
          $scope.itemExtProps = event.result;
        }
        worker.hideBusy();
      }
    );

    //UpdateInventoryItemExtendedProperties
  }

  $scope.saveProperties = function () {

  }

  $scope.generateSpecSheet = function () {
    //   // require dependencies
    //   const PDFDocument = require("pdfkit");
    //   const blobStream = require("blob-stream");
    //   // create a document the same way as above
    //   const doc = new PDFDocument();
    //   // pipe the document to a blob
    //   const stream = doc.pipe(blobStream());
    //   // add your content to the document here, as usual
    //   // get a blob when you're done
    //   doc.end();
    //   stream.on("finish", function () {
    //     // get a blob you can do whatever you like with
    //     const blob = stream.toBlob("application/pdf");
    //     // or get a blob URL for display in the browser
    //     const url = stream.toBlobURL("application/pdf");
    //     iframe.src = url;
    //   });
  };
};
