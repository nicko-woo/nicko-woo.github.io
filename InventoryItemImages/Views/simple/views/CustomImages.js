var CustomImagesView = function ($scope, $element, $filter, $compile, $q, $http) {
  var self = this;
  $scope.stockItemId = $scope.$parent.$parent.$parent.$parent.itemId;
  $scope.headerInfo = $scope.$parent.$parent.$parent.$parent.headerInfo;
  let plkrFrame = document.getElementById("plkrFrameImages");
  let url_string = "https://application.doodle-products.com/inventory-images/";

  let frameUrl = url_string + "?itemGuid=" + $scope.stockItemId + + "?sku=" + $scope.headerInfo;
  plkrFrame.src = frameUrl;

  self.onMessage = function (msg) {
    switch (msg.key) {
      case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
        $scope.Initialize();
    }
  };

  $scope.Initialize = function () {
  };

  
};
