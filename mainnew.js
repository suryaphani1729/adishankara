var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
	var request = indexedDB.open("library");
	var db;
	request.onsuccess = function() {
	   db = request.result;
	   $scope.getData();
	}
	
    $scope.getData = function(){ 
  			var tx = db.transaction("itemlist", "readwrite");
			var store = tx.objectStore("itemlist");
			var index = store.index("by_title");
			var request = index.getAll();
                  
	              
    };
			
	
	
	
	



});  
