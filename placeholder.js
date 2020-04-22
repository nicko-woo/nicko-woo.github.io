var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "FedsApp",
            key: "FedsApp",
            icon: "fa fa-car",
            content: {
                moduleName: "FedsApp",
                controlName: "FedsApp"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }
}

Core.PlaceHolderManager.register("SuppliersRegister_RightTopButtons", PlaceHolder)


// var PlaceHolder = function ($scope, $element) {
// 	this.currentPendingCalls = 0;
// 	this._scope = $scope;
// 	this._element = $element;
// 	this._interval = null;
// 	this._columnsToRemove = [10,9,8,7,3,2];
// 	this._columnsNewOrder = [0,1,3,2,4];
// 	this._intervalTries = 0;
// 	this._processPressed = false;
// 	this._isInitializedFirstTime = false;
// 	this._currentOrderOldValue = undefined;
//     this.getItems = function () {
//         var items = [{
//             text: "Auto Process",
//             key: "AutoProcessCustomButton",
//             icon: "fa fa-check",
//             content: {
//                 moduleName: "AutoProcessOrderOnScan",
//                 controlName: "AutoProcessOrderOnScan"
//             }
//         }];
//         return items;
//     }
	
// 	this.onClick = function() {
// 		this.module.$scope.process();
// 	}
	
// 	Core.Dialogs.BusyWorker.showBusy(this._element);
// 	setTimeout(() => {
// 		Core.Dialogs.BusyWorker.hideBusy(this._element);
// 	}, 5000);
	
// 	$scope.$parent.$watch('currentOrder', currentOrder => {
// 		if(!this._currentOrderOldValue && currentOrder){
// 			this._interval = setInterval(() => {
// 			var wind = document.querySelectorAll('[ng-controller="OpenOrders_ProcessOrdersView"]');
// 			if(!wind || !wind.length) {
// 				console.log('Window closed, stop processing');
// 				clearInterval(this._interval);
// 				return;
// 			}
// 			console.log(this._intervalTries + ' try!');
// 			this._intervalTries++;
// 			var el = document.querySelector('[key="AutoProcessCustomButton"]');
// 			if(el && this._scope.$parent.scanRequiredNotPerformed()) {
// 				Core.Dialogs.BusyWorker.hideBusy(this._element);
// 				try {
// 					var gridScope = this._element.find(".slickgrid").scope();
// 					if(gridScope && gridScope.getColumns().length == 11) {						
// 						this._columnsToRemove.forEach(function(val) {
// 						  gridScope.deleteColumnByIndex(val);
// 						});
						
// 						var imageColumn = gridScope.getColumnByIndex(1); 
// 						imageColumn.maxWidth = 40;
// 						imageColumn.width = 40; 
// 						gridScope.updateColumnByIndex(1, imageColumn);
						
// 						var oldColumns = gridScope.getColumns();
// 						var newColumns = [oldColumns[0],oldColumns[1],oldColumns[3],oldColumns[2],oldColumns[4]];
// 						newColumns[2].maxWidth = 100;
// 						newColumns[2].width = 100;
// 						newColumns[4].maxWidth = 100;
// 						newColumns[4].width = 100;
// 						gridScope.setColumns(newColumns);
// 					}
// 				}
// 				catch(error) {
// 					console.log(error);
// 				}
// 				clearInterval(this._interval);
// 				this._scope.$parent.process();
// 			}
// 			if(this._intervalTries > 20) {
// 				console.log('sorry your connection is too slow.');
// 				clearInterval(this._interval);
// 			}
// 		}, 500);
// 		}
// 		this._currentOrderOldValue = currentOrder;
// 	});		   
		   
//     this.isEnabled = function (itemKey) {
//         return true;
//     }
// }

// Core.PlaceHolderManager.register("OpenOrders_ProcessOrders_RightBottomButtons", PlaceHolder);