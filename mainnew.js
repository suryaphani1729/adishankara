var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
	var request = indexedDB.open("library");
	$scope.db;
	request.onsuccess = function() {
	   $scope.db = request.result;
	   $scope.getData();
	}
	
    $scope.getData = function(){ 
  			var tx = $scope.db.transaction("itemlist", "readwrite");
			var store = tx.objectStore("itemlist");
			var index = store.index("by_title");
			var request = index.getAll();
                  
	              
    };
			
	
	
	
	



});  
