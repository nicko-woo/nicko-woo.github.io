var SpecSheetView = function ($scope, $element, $filter, $compile, $q, $http) {
  var self = this;
  $scope.stockItemId = $scope.$parent.$parent.$parent.$parent.itemId;

  let plkrFrame = document.getElementById("plkrFrame");
  let url_string = "https://application.doodle-products.com/";

  let frameUrl = url_string + "?itemGuid=" + $scope.stockItemId;
  plkrFrame.src = frameUrl;

  self.onMessage = function (msg) {
    switch (msg.key) {
      case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
        $scope.Initialize();
    }
  };

  $scope.Initialize = function () {
    // $scope.inventoryService = new Services.InventoryService(self.options);
    // $scope.stockService = new Services.StockService();
    // $scope.getProperties();
  };

  // $scope.getProperties = function () {
  //   Core.Dialogs.BusyWorker.showBusy($element);
  //   $scope.inventoryService.GetInventoryItemExtendedProperties(
  //     $scope.stockItemId,
  //     function (event) {
  //       if (event.hasErrors()) {
  //         showErrorAndClose(event.error.errorMessage);
  //         Core.Dialogs.addNotify("ERROR", "ERROR");
  //       } else {
  //         $scope.itemExtProps = event.result;

  //         $scope.productDetails = $scope.itemExtProps.find(
  //           (x) => x.ProperyName === "Product Details"
  //         );
  //         $scope.artwork = $scope.itemExtProps.find(
  //           (x) => x.ProperyName === "Artwork"
  //         );
  //         $scope.packagingDetails = $scope.itemExtProps.find(
  //           (x) => x.ProperyName === "Packaging Details"
  //         );
  //         $scope.innerCarton = $scope.itemExtProps.find(
  //           (x) => x.ProperyName === "Inner Carton"
  //         );
  //         $scope.generalComments = $scope.itemExtProps.find(
  //           (x) => x.ProperyName === "General Comments"
  //         );
  //       }
  //       Core.Dialogs.BusyWorker.hideBusy($element);
  //     }
  //   );
  // };

  // $scope.saveProperties = function () {
  //   var updatedProperties = [];

  //   updatedProperties.push($scope.productDetails);
  //   updatedProperties.push($scope.artwork);
  //   updatedProperties.push($scope.packagingDetails);
  //   updatedProperties.push($scope.innerCarton);
  //   updatedProperties.push($scope.generalComments);

  //   if (updatedProperties.length) {
  //     $scope.inventoryService.UpdateInventoryItemExtendedProperties(
  //       updatedProperties,
  //       function (event) {
  //         if (event.hasErrors()) {
  //           showErrorAndClose(event.error.errorMessage);
  //           Core.Dialogs.addNotify("ERROR", "ERROR");
  //         } else {
  //           Core.Dialogs.addNotify("Properties were updated", "SUCCESS");
  //         }
  //       }
  //     );
  //   }
  // };

  // $scope.generateSpecSheet = function () {
  //   var docDefinition = {
  //     content: "This is an sample PDF printed with pdfMake",
  //   };
  //   var date = new Date();
  //   // date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');
  //   pdfMake.createPdf(docDefinition).download("PDF_" + ".pdf");

  //   var promises = [];
  //   promises.push($scope.GetPayments());
  //   promises.push($scope.GetBalance());

  //   $q.all(promises).then(
  //     function (resolved) {},
  //     function (reason) {
  //       Core.Dialogs.BusyWorker.hideBusy($element);
  //       $scope.ShowError = true;
  //     }
  //   );
  // };

  // $scope.GetPDF = function () {
  //   var deferred = $q.defer();
  //   $http({
  //     method: "GET",
  //     url:
  //       "http://application.doodle-products.com/api/PurchaseProps/getPurchaseOrdersWithProps",
  //     params: {},
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //       Authorization: $scope.userId,
  //     },
  //   }).then(
  //     function success(response) {
  //       $scope.payments = response.data;

  //       deferred.resolve();
  //     },
  //     function error(response) {
  //       deferred.reject();
  //     }
  //   );

  //   return deferred.promise;
  // };

  // $scope.saveAs = function (blob, fileName) {
  //   var url = window.URL.createObjectURL(blob);

  //   var anchorElem = document.createElement("a");
  //   anchorElem.style = "display: none";
  //   anchorElem.href = url;
  //   anchorElem.download = fileName;

  //   document.body.appendChild(anchorElem);
  //   anchorElem.click();

  //   document.body.removeChild(anchorElem);

  //   setTimeout(function () {
  //     window.URL.revokeObjectURL(url);
  //   }, 1000);
  // };
};
