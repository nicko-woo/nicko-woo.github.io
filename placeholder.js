var PlaceHolder = function ($scope, $element) {
    this.getItems = function () {
        var items = [{
            text: "PayUsingPayoneer",
            key: "PayUsingPayoneer",
            icon: "fa fa-credit-card",
            content: {
                moduleName: "PayUsingPayoneer",
                controlName: "PayUsingPayoneer"
            }
        }];

        return items;
    }

    this.isEnabled = function (itemKey) {
        return true;
    }

    // this.onClick = function () {
    //     console.log('click-click');
    //     modal.style.display = "block";
    // }

    // this.onClick = function ($scope, $dialog) {
    //     $dialog.dialog({}).open('app.html');
    //     console.log('click-click');
    // }

    // this.onClick = function ($scope) {
    //     var win = new wind({
    //         moduleName: "PurchaseOrder",
    //         windowName: "PurchaseOrderExtendedProperties",
    //         width: "950px",
    //         closeOnEscape: false,
    //         closeOnBackDrop: false,
    //         data: {
    //             pkPurchaseId: $scope.purchaseOrder.pkPurchaseID,
    //             ExtendedProperties: $scope.ExtendedProperties
    //         }
    //     }, self.options);
    //     win.onWindowClosed = function (event) {
    //         switch (event.action) {
    //             case "OK":
    //                 $scope.ExtendedProperties = event.result;
    //                 $scope.CheckHasChanged();
    //                 if (!$scope.$$phase) {
    //                     $scope.$apply();
    //                 }
    //                 break;
    //             case "CLOSE":
    //                 if (event.result) {
    //                     $scope.ExtendedProperties = event.result;
    //                     $scope.CheckHasChanged();
    //                     if (!$scope.$$phase) {
    //                         $scope.$apply();
    //                     }
    //                 }
    //                 break;
    //         }
    //     };
    //     win.open();
    // }

    this.onClick = function() {
		this.module.$scope.process();
	}
	
	Core.Dialogs.BusyWorker.showBusy(this._element);
	setTimeout(() => {
		Core.Dialogs.BusyWorker.hideBusy(this._element);
	}, 5000);
	
	$scope.$parent.$watch('currentOrder', currentOrder => {
		if(!this._currentOrderOldValue && currentOrder){
			this._interval = setInterval(() => {
			var wind = document.querySelectorAll('[ng-controller="PayUsingPayoneerView"]');
			if(!wind || !wind.length) {
				console.log('Window closed, stop processing');
				clearInterval(this._interval);
				return;
			}
			console.log(this._intervalTries + ' try!');
			this._intervalTries++;
			var el = document.querySelector('[key="AutoProcessCustomButton"]');
			if(el && this._scope.$parent.scanRequiredNotPerformed()) {
				Core.Dialogs.BusyWorker.hideBusy(this._element);
				try {
					var gridScope = this._element.find(".slickgrid").scope();
					if(gridScope && gridScope.getColumns().length == 11) {						
						this._columnsToRemove.forEach(function(val) {
						  gridScope.deleteColumnByIndex(val);
						});
						
						var imageColumn = gridScope.getColumnByIndex(1); 
						imageColumn.maxWidth = 40;
						imageColumn.width = 40; 
						gridScope.updateColumnByIndex(1, imageColumn);
						
						var oldColumns = gridScope.getColumns();
						var newColumns = [oldColumns[0],oldColumns[1],oldColumns[3],oldColumns[2],oldColumns[4]];
						newColumns[2].maxWidth = 100;
						newColumns[2].width = 100;
						newColumns[4].maxWidth = 100;
						newColumns[4].width = 100;
						gridScope.setColumns(newColumns);
					}
				}
				catch(error) {
					console.log(error);
				}
				clearInterval(this._interval);
				this._scope.$parent.process();
			}
			if(this._intervalTries > 20) {
				console.log('sorry your connection is too slow.');
				clearInterval(this._interval);
			}
		}, 500);
		}
		this._currentOrderOldValue = currentOrder;
	});		   
		   
    this.isEnabled = function (itemKey) {
        return true;
    }
}

Core.PlaceHolderManager.register("EditPurchaseOrder_RightTopButtons", PlaceHolder)