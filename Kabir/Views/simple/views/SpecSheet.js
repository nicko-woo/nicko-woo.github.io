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

    $scope.inventoryService = new Services.InventoryService(self.options);
    $scope.stockService = new Services.StockService();

    $scope.getProperties();
    
    

    
  };

  $scope.getProperties = function () {
    Core.Dialogs.BusyWorker.showBusy($element);
    $scope.inventoryService.GetInventoryItemExtendedProperties(
      $scope.stockItemId,
      function (event) {
        if (event.hasErrors()) {
          showErrorAndClose(event.error.errorMessage);
          Core.Dialogs.addNotify("ERROR", "ERROR");
        } else {
          $scope.itemExtProps = event.result;

          $scope.productDetails = $scope.itemExtProps.find(x => x.ProperyName === "Product Details");
          $scope.artwork = $scope.itemExtProps.find(x => x.ProperyName === "Artwork");
          $scope.packagingDetails = $scope.itemExtProps.find(x => x.ProperyName === "Packaging Details");
          $scope.innerCarton = $scope.itemExtProps.find(x => x.ProperyName === "Inner Carton");
          $scope.generalComments = $scope.itemExtProps.find(x => x.ProperyName === "General Comments");
        }
        Core.Dialogs.BusyWorker.hideBusy($element);

      }
    );
  };



  $scope.saveProperties = function () {

// IsChanged: true
// PropertyType: "Attribute"
// PropertyValue: "20"
// ProperyName: "CTN QTY"
// fkStockItemId: "e78d959f-a663-40be-bb40-237482d92571"
// id: "e36f5f0a-286f-dfbf-2e16-4dc82a8bf5ee"
// pkRowId: "ea16e0fd-6963-4479-81de-3eeb0173ec4d"


// PropertyType: "Attribute"
// PropertyValue: "40063811187444"
// ProperyName: "GTIN"
// fkStockItemId: "403c94eb-103f-4b4e-9190-2479e06c7f03"
// pkRowId: "f368905e-d3f7-450c-877a-3535c1a573f7"

    var updatedProperties = [];

    updatedProperties.push($scope.productDetails);
    updatedProperties.push($scope.artwork);
    updatedProperties.push($scope.packagingDetails);
    updatedProperties.push($scope.innerCarton);
    updatedProperties.push($scope.generalComments);


    if (updatedProperties.length) {
      $scope.inventoryService.UpdateInventoryItemExtendedProperties(updatedProperties, function (event) {
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
