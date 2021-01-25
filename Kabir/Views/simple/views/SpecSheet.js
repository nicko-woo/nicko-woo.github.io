var SpecSheetView = function ($scope, $element, $filter, $compile, $q) {
  var self = this;
  var sc = $scope.$parent.$parent.$parent.$parent;
  self.onMessage = function (msg) {
    switch (msg.key) {
      case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
        $scope.itemsToRemove = msg.data.data.ItemsToRemove;
    }
  };

  $scope.Close = function () {
    $scope.itemsToRemove = null;
    $scope.$destroy();
    self.close();
  };

  $scope.isExists = function (type) {
    var obj = $scope.articles.find(function (x) {
      return x.type == type;
    });
    return obj !== null;
  };

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