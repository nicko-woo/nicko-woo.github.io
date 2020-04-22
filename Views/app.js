var FedsAppView = function($scope){
	
    var self = this;
    $scope.InventoryItemId = '';
    $scope.lwServer = '';
    $scope.Token = ''; 
    $scope.SKU = [];
    $scope.QTY = [];
    
    function getStockItemIdFromDataObject(data) {                                
          if (typeof (data) === "function") {
              var fromParent = data();
              if (fromParent != null && fromParent.stockItemId != null) {
                  return fromParent.stockItemId;
              }
          }
  
          return null;
      } 
    self.onMessage = function(msg) {												
          switch (msg.key) {
              case Core.Messenger.MESSAGE_TYPES.INITIALIZE:
              $scope.lwServer = msg.data.session.server;
              $scope.Token = msg.data.session.token;
              $scope.InventoryItemId = getStockItemIdFromDataObject(msg.data.data);    
              $scope.ItemDetails();
                  break;
          }
      };
    $scope.ItemDetails = function() {                                                      
          $.ajax({
              type: 'POST',
          url: $scope.lwServer + '/api/Macro/Run',       
          data: {pkStockItemId: $scope.InventoryItemId,
          applicationName:'FedsApp1',macroName:'FedorMacro'},
          headers: {'Authorization': $scope.Token, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept-Language': 'application/json'}
        }).done(function( data )
        {
          for (var i = 0; i < data.length; i++)
          {           
                 $scope.SKU.push(data[i].SKU);
                 $scope.QTY.push(data[i].Quantity);
          }
          var ctx = document.getElementById("myBarChart").getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: $scope.SKU,																
              datasets: [{
                label: [],
                data: $scope.QTY,
                backgroundColor: "rgba(255,153,0,0.6)"
              }]},
              options: { legend: { display: false }} 
          });  
        });  
      };
  };