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

          $scope.productDetails = $scope.itemExtProps.find(
            (x) => x.ProperyName === "Product Details"
          );
          $scope.artwork = $scope.itemExtProps.find(
            (x) => x.ProperyName === "Artwork"
          );
          $scope.packagingDetails = $scope.itemExtProps.find(
            (x) => x.ProperyName === "Packaging Details"
          );
          $scope.innerCarton = $scope.itemExtProps.find(
            (x) => x.ProperyName === "Inner Carton"
          );
          $scope.generalComments = $scope.itemExtProps.find(
            (x) => x.ProperyName === "General Comments"
          );
        }
        Core.Dialogs.BusyWorker.hideBusy($element);
      }
    );
  };

  $scope.saveProperties = function () {
    var updatedProperties = [];

    updatedProperties.push($scope.productDetails);
    updatedProperties.push($scope.artwork);
    updatedProperties.push($scope.packagingDetails);
    updatedProperties.push($scope.innerCarton);
    updatedProperties.push($scope.generalComments);

    if (updatedProperties.length) {
      $scope.inventoryService.UpdateInventoryItemExtendedProperties(
        updatedProperties,
        function (event) {
          if (event.hasErrors()) {
            showErrorAndClose(event.error.errorMessage);
            Core.Dialogs.addNotify("ERROR", "ERROR");
          } else {
            Core.Dialogs.addNotify("Properties were updated", "SUCCESS");
          }
        }
      );
    }
  };

  $scope.generateSpecSheet = function () {

    var docDefinition = { content: 'This is an sample PDF printed with pdfMake' } ;
    var date = new Date();  
            // date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');  
            pdfMake.createPdf(docDefinition).download('PDF_' + '.pdf');  
            
//pdfMake.createPdf(docDefinition).open(); //to open pdf in new window 
    // // require dependencies
    // const PDFDocument = require(["pdfkit"]);
    // const blobStream = require(["blob-stream"]);
    // // create a document the same way as above
    // const doc = new PDFDocument();
    // // pipe the document to a blob
    // const stream = doc.pipe(blobStream());
    // // add your content to the document here, as usual
    // // get a blob when you're done
    // doc.end();
    // stream.on("finish", function () {
    //   // get a blob you can do whatever you like with
    //   const blob = stream.toBlob("application/pdf");

    //   $scope.saveAs(blob, "SpecSheet.pdf");
    //   // or get a blob URL for display in the browser
    //   const url = stream.toBlobURL("application/pdf");
    //   iframe.src = url;
    // });

    ////------------------------------------------

    // var PdfPrinter = require(["pdfMake"]);
    // var printer = new PdfPrinter(fonts);
    // var fs = require(["fs"]);

    // var docDefinition = {
    //   content: [
    //     "First paragraph",
    //     "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    //   ],
    // };

    // var pdfDoc = printer.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(fs.createWriteStream("pdfs/basics.pdf"));
    // pdfDoc.end();

    ////---------------------------------------

    // const { jsPDF } = require("jspdf"); 
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");
  };

  $scope.saveAs = function (blob, fileName) {
    var url = window.URL.createObjectURL(blob);

    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);

    setTimeout(function () {
      window.URL.revokeObjectURL(url);
    }, 1000);
  };
};
