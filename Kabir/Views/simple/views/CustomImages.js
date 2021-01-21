var CustomImagesView = function ($scope, $element, $filter, $compile, $q) {

    var self = this;
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
    }

    $scope.isExists=function(type){
        var obj = $scope.articles.find(function(x){ return x.type == type ; });
        return obj !== null;
      }

};