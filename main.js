var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
   $scope.getData = function(){ 
	   
   firebase.database().ref('/ShankaraProject').once('value').then(function(snapshot) {
       $scope.data = snapshot.val();
        
		$scope.slokas = $scope.data.data1;
		
	   
	


	   
	   
	   
		$scope.$apply();
		
		
   });
      
	   
	   
    
   }

   
   if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
	    console.log("************-yes cache");
      caches.match("https://test-250316.firebaseio.com").then(function(response) {
	      
	      console.log("************");
		console.log(response);
        if (response) {
		
		
          response.json().then(function updateFromCache(json) {
           
		  console.log("************"+json);
          });
        }
      });
    }
	
	
  $scope.getData();


});  
