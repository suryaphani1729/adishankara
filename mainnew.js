var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
	var request = indexedDB.open("library");
	$scope.db;
	request.onsuccess = function() {
	   $scope.db = request.result;
	   $scope.getData();
	}
	request.onupgradeneeded = function() {
		  // The database did not previously exist, so create object stores and indexes.
		  var db = request.result;
		  var store = db.createObjectStore("itemlist", {keyPath: "isbn"});
		  var titleIndex = store.createIndex("by_title", ["title","description"], {unique: true});
		var descIndex = store.createIndex("by_desc", "description", {unique: false});
		
		  // Populate with initial data.
		//  store.put({title: "Quarry Memories",isbn:1});
		//  store.put({title: "Water Buffaloes",isbn:2});
		//  store.put({title: "Bedrock Nights",isbn:3});
	};
    $scope.getData = function(){ 
  			var tx = $scope.db.transaction("itemlist", "readwrite");
			var store = tx.objectStore("itemlist");
			var index = store.index("by_title");
			var request = index.getAll();
                      request.onsuccess = function() {
			  var matching = request.result;
			  if (matching !== undefined) {
			    // A match was found.
			   $scope.data = matching;
				  if($scope.data.length)
			                $scope.renderHTML();
			         else {
			   
				  firebase.database().ref('/ShankaraProject').once('value').then(function(snapshot) {
      						 $scope.data = snapshot.val();
        
						$scope.slokas = $scope.data.data1;
	                                          
					       angular.forEach($scope.slokas,function(slokam){
						  
						       $scope.saveLocal(slokam.title,slokam.descr);
						       
					       });
					  
					   $scope.getData();
						$scope.$apply();
		
		
  					 });
			         }
			  }
			};
	              
    };
	 $scope.renderHTML = function(){
		 console.log("=---------------------");
		
		 $scope.$apply(function(){ console.log($scope.data);   });
		 
	 }
	
	$scope.newId = 0;
   $scope.saveLocal = function(title,description){
		 var db = request.result;
		var tx = db.transaction("itemlist", "readwrite");
		var store = tx.objectStore("itemlist");
		store.put({title:title,description: description, isbn: (++$scope.newId) });
		tx.oncomplete = function() {
		    console.log(db);
		   // $scope.getData();
		 //   $("#key").val("");
		};	 	   
	   
   };
	
	



});  
