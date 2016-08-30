/**
 * 
 */

//service for storage 
angular.module("FishTank").service("BaseService", function($http, $state){
	
	var bs = this;
	
	bs.user;
	bs.projects;
	bs.searchType;
	bs.searchedProjects;
	bs.projectCreated;
	bs.investments;
	bs.projTitle;
	bs.project;
	bs.allProjs;
	bs.imageLink;
	bs.loggedin = true;
	bs.logout4j;
	
	bs.teachmelog4j = function(){
		//bs.logout4j="steve";
		//$state.go('loginState');
		location.reload(true);
	}
	
	bs.logout = function(){
		bs.user = null;
		
		bs.loggedin = true;
		$state.go('loginState');

	}
	
});

angular.module("FishTank").service("SearchService", function($http, $state){
	
	var ss = this;
	ss.searchType = function(type){
		ss.type = type;
		ss.resultType;
	
		if(ss.type == "1" || ss.type == "2" || ss.type == "3"|| ss.type == "4"){
		var promise = $http({
			method: "GET",
			url: "http://localhost:8087/buisnessStartUpProj/project/category/" + ss.type
		});
		}
		else{
			var promise = $http({
				method: "GET",
				url: "http://localhost:8087/buisnessStartUpProj/project/" + ss.type
			});
		}
		
		promise.then(
		function(response){
			console.log("here");
			if(ss.type=="1"){ss.resultType = "Technology";}
			else if(ss.type=="2"){ss.resultType = "Entertainment";}
			else if(ss.type=="3"){ss.resultType = "Business";}
			else if(ss.type=="4"){ss.resultType = "Food";}
			else if(ss.type == "currentAmount"){ss.resultType = "Current Investment";}
			else if(ss.type == "ratio"){ss.resultType = "Stock Cost";}
			else if(ss.type == "rating"){ss.resultType = "Rating";}
			console.log("ss.resultType1: "+ ss.resultType);
			ss.resultType0 = "Top search results by:  ";
			console.log("ss.resultType2: " + ss.resultType);
			ss.projects = response.data;
			if(!ss.projects[0]){
				ss.resultType0 ="No Search Results";
				ss.resultType ="";
			}
			$state.go('searchState');
		},
		function(response){
			console.log(response);
		});
		
		
		//return ss.projects;
	
	}
	
});

