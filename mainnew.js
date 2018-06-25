var app = angular.module('devotionalApp', []).controller("appCtrl",function($scope){

	$scope.data = {};
	$scope.slokas = [{"title":"Loading...","descr" : "..."}];
	var request = indexedDB.open("library");
	var db;
	request.onsuccess = function() {
	   db = request.result;
	   $scope.getData();
	}
	
 
			
	
	
	
	request.onupgradeneeded = function() {
		  // The database did not previously exist, so create object stores and indexes.
		  var db = request.result;
		  var store = db.createObjectStore("itemlist", {keyPath: "isbn"});
		  var titleIndex = store.createIndex("by_title", "title", {unique: true});
		var titleIndex = store.createIndex("by_desc", "description", {unique: false});
		
		  // Populate with initial data.
		  store.put({title: "Quarry Memories",isbn:1});
		  store.put({title: "Water Buffaloes",isbn:2});
		  store.put({title: "Bedrock Nights",isbn:3});
	};
	
	
	
   $scope.getData = function(){ 
	   
	   var tx = db.transaction("itemlist", "readwrite");
			var store = tx.objectStore("itemlist");
			var index = store.index("by_title");
			var request = index.getAll();
			request.onsuccess = function() {
			  var matching = request.result;
			  if (matching !== undefined) {
			    // A match was found.
			   data = matching;
			   $scope.renderHTML();
			  } else {
			   
				  firebase.database().ref('/ShankaraProject').once('value').then(function(snapshot) {
      						 $scope.data = snapshot.val();
        
						$scope.slokas = $scope.data.data1;
	                                          
					       angular.foreach($scope.slokas,function(slokam){
						  
						       $scope.saveLocal(slokam.title,slokam.description);
						       
					       });
					  
					  
						$scope.$apply();
		
		
  					 });
			  }
			};
	   
    
   }
   
   $scope.renderHTML(){

	   var str="<ul>";
   for(var i=0;i<data.length;i++){
    if(data[i].isbn > newId)
       newId = data[i].isbn;
    
   str += "<li>"+data[i].title+"<button onClick='deleteRow("+data[i].isbn+")'>-</button></li>"
   }
   str+="</li>"
   $("#listItems").html(str);
	   
  
	   
   }
	 var newId = 0;
   $scope.saveLocal(title,description){
		 var db = request.result;
		var tx = db.transaction("itemlist", "readwrite");
		var store = tx.objectStore("itemlist");
		store.put({title:title,description:description, isbn: (newId+1) });
		tx.oncomplete = function() {
		    console.log(db);
		    getData();
		    $("#key").val("");
		};	 	   
	   
   }
	
	



});  
