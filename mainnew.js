var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
   $scope.getData = function(){ 
	   
   firebase.database().ref('/ShankaraProject').once('value').then(function(snapshot) {
       $scope.data = snapshot.val();
        
		$scope.slokas = $scope.data.data1;
		
	   
	caches.open('slokaData-v1').then(function(cache) {
		cache.add('https://test-250316.firebaseio.com/ShankaraProject',snapshot);
	});


	   
	   
	   
		$scope.$apply();
		
		
   });
      
	   
	   
    
   }

   
   
	
	
  $scope.getData();


});  
