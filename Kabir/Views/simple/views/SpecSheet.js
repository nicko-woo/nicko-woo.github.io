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
    
    var inventoryService = new Services.InventoryService(self.options);
    var stockService = new Services.StockService();

    // $scope.extPropsNames = InventoryService.getExtendedPropertyNames();
    // $scope.extPropsTypes = InventoryService.GetExtendedPropertyTypes();
    // $scope.extPropsAllNames = InventoryService.getAllExtendedPropertyNames();

    Core.Dialogs.BusyWorker.showBusy($element);
    InventoryService.GetInventoryItemExtendedProperties(
      $scope.stockItemId,
      function (event) {
        if (event.hasErrors()) {
          showErrorAndClose(event.error.errorMessage);
          Core.Dialogs.addNotify("ERROR", "ERROR");
        } else {
          $scope.itemExtProps = event.result;
        }
        Core.Dialogs.BusyWorker.hideBusy($element);

      }
    );

    //UpdateInventoryItemExtendedProperties
  };

  $scope.saveProperties = function () {

//     IsChanged: true
// PropertyType: "Attribute"
// PropertyValue: "20"
// ProperyName: "CTN QTY"
// fkStockItemId: "e78d959f-a663-40be-bb40-237482d92571"
// id: "e36f5f0a-286f-dfbf-2e16-4dc82a8bf5ee"
// pkRowId: "ea16e0fd-6963-4479-81de-3eeb0173ec4d"
    var updatedProperties = [];
    if (updatedProperties.length) {
      inventoryService.UpdateInventoryItemExtendedProperties(updatedProperties, function (event) {
          if (event.hasErrors()) {
            showErrorAndClose(event.error.errorMessage);
            Core.Dialogs.addNotify("ERROR", "ERROR");
          } else {
            Core.Dialogs.addNotify("Properties were updated", "SUCCESS");
          }
      });
  }
  };

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
