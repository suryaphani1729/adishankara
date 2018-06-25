var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
	var request = indexedDB.open("library");
	var db;
	request.onsuccess = function() {
	   db = request.result;
	   $scope.getData();
	}
	
 
			
	
	
	
	



});  
