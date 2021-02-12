var InstructionsView = function ($scope, $element, $filter, $compile, $q, $http) {
  var self = this;
  $scope.stockItemId = $scope.$parent.$parent.$parent.$parent.itemId;
  $scope.headerInfo = $scope.$parent.$parent.$parent.$parent.headerInfo;
  let plkrFrame = document.getElementById("plkrFrameInstructions");
  let url_string = "https://application.doodle-products.com/";

  let frameUrl = url_string + "?itemGuidInstruction=" + $scope.stockItemId;
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
