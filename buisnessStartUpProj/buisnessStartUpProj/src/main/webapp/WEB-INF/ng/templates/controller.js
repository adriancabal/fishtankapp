/**
 * 
 */
//inject angular file upload directives and service.
//angular.module('FishTank', ['angularFileUpload']);
//myApp = angular.module('myApp','ang-drag-drop');
//controller for login page
angular.module("FishTank").controller("loginCtrl", function($state, $http, BaseService){
	
	var lc = this;
	lc.username;
	lc.password;
	lc.error;
	lc.loggedin = BaseService.loggedin;
	
	
	
	lc.login = function(username, password){
		var promise = $http({
			method: "GET",
			url: "http://localhost:8087/buisnessStartUpProj/login/" + username + "+" + password
		})
		promise.then(
				function(response){
					if(response.data.username != null){
						$state.go('homeState');
						lc.loggedin = false;
						BaseService.loggedin = false;
						BaseService.user = response.data
					}
					else{
						lc.error = "Invalid Username or Password";
					}
				},
				function(response){console.log(response)})
	}
	console.log(lc.loggedin);
	
	lc.logout = function(){
		console.log("in lc.logout");
		BaseService.user = null;
		lc.loggedin = true;
		$state.go('loginState');
	}
//	if(BaseService.logout4j==="steve"){
//		console.log(BaseService.logout4j);
//		//lc.logout();
//		document.getElementById("steve").click();
//	}
	
});

//controller for home page
angular.module("FishTank").controller("homeCtrl", function($state, $http, BaseService, SearchService){
	
	var hc = this;
	hc.user = BaseService.user;

	hc.projects;
	hc.searchType = function(type){
		SearchService.searchType(type);
	}
	
	hc.logout = BaseService.logout;
	
	function logoutFunc(){
		location.reload(true);
		//BaseService.logout4j = "steve";
		//BaseService.teachmelog4j();
		//$state.go('loginState');
	}
	
	document.getElementById("logout").addEventListener("click", logoutFunc, false);
	
	$http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/project/goal"
	}).then(function(response){
		BaseService.allProjs = response.data;
	});
	
	//get updates by user investments
	
	var promise = $http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/investment/user/" + hc.user.username
	})
	promise.then(
		function(response){
			hc.investments = response.data;
			hc.updates = [];
			hc.updatesProjectTitle= [];
			var count = 0;
			var promise2;
			for(var index in hc.investments){
				promise2 = $http({
					method: "GET",
					url: "http://localhost:8087/buisnessStartUpProj/update/" + hc.investments[index].project.title
				})
				promise2.then(
					function(response2){
						/*if(count> 0){ //remove duplicates
							if(hc.investments[count].project.title!=hc.investments[count-1].project.title){
								hc.updates.push(response2.data);
							}
						}else{
							hc.updates.push(response2.data);
						}
						count++;*/
						
						//**** 7:37
						console.log("in 7:37");
						//console.log(hc.updatesProjectTitle.indexOf(response2.data[0].project.title));
						console.log(hc.updatesProjectTitle);
						if(response2.data[0]&&(hc.updatesProjectTitle.indexOf(response2.data[0].project.title) == -1)){
							console.log(response2.data[0].project.title);
							hc.updatesProjectTitle.push(response2.data[0].project.title);
							hc.updates.push(response2.data);
							
						}
							
						//**** 7:37
						
					},
					function(){console.log(response2)}
				);
			}
		},
		function(){console.log(response)}
	);
	
	//get investments and reviews by user projects
	
	var promise3 = $http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/project/user/" + hc.user.username
	})
	promise3.then(
		function(response){
			hc.projects = response.data;
			hc.investmentsForMyProjects = [];
			var promise4;
			for(var index in hc.projects){
				promise4 = $http({
					method: "GET",
					url: "http://localhost:8087/buisnessStartUpProj/investment/project/" + hc.projects[index].id
				})
				promise4.then(
						function(response2){
							if(response2.data.length>0){//if exists
								hc.investmentsForMyProjects.push(response2.data);
							}
						},
						function(){console.log(response2)}
				);
			}
			hc.reviewsByProject = [];
			var promise5;
			for(var index in hc.projects){
				promise5 = $http({
					method: "GET",
					url: "http://localhost:8087/buisnessStartUpProj/review/projectId/" + hc.projects[index].id
				})
				promise5.then(
						function(response3){
							if(response3.data.length>0){//if exists
								hc.reviewsByProject.push(response3.data);
							}
						},
						function(){console.log(response3)}
				);
			}
		},
		function(){console.log(response)}
	);

});


//controller for search pages
angular.module("FishTank").controller("searchCtrl", function($route, $state, $http, BaseService, SearchService){
	
	
	var sc = this;
	sc.user = BaseService.user;
	sc.type = BaseService.searchType;
	sc.projects = SearchService.projects;
	sc.resultType0 = SearchService.resultType0;
	sc.resultType = SearchService.resultType;
//	sc.searchType = function(type){
//		SearchService.searchType(type);
//		sc.projects = SearchService.projects;
//	
//	}
	
	sc.searchType = function(type){
		sc.type = type;
	
	
	if(sc.type == "1" || sc.type == "2" || sc.type == "3" || sc.type == "4"){ //***
		/*if(sc.type=="1"){sc.resultType = "Technology";}
		else if(sc.type=="2"){sc.resultType = "Entertainment";}
		else if(sc.type=="3"){sc.resultType = "Business";}
		else if(sc.type=="4"){sc.resultType = "Food";}*/
	var promise = $http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/project/category/" + sc.type
	});
	}
	else{
	/*	if(sc.type == "currentAmount"){sc.resultType = "Current Investment";}
		else if(sc.type == "ratio"){sc.resultType = "Stock Cost";}
		else if(sc.type == "rating"){sc.resultType = "Rating";}*/
		var promise = $http({
			method: "GET",
			url: "http://localhost:8087/buisnessStartUpProj/project/" + sc.type
		});
	}
	
	promise.then(
	function(response){
		sc.projects = response.data;
		if(sc.type=="1"){sc.resultType = "Technology";}
		else if(sc.type=="2"){sc.resultType = "Entertainment";}
		else if(sc.type=="3"){sc.resultType = "Business";}
		else if(sc.type=="4"){sc.resultType = "Food";}
		else if(sc.type == "currentAmount"){sc.resultType = "Current Investment";}
		else if(sc.type == "ratio"){sc.resultType = "Stock Cost";}
		else if(sc.type == "rating"){sc.resultType = "Rating";}
		sc.resultType0 = "Top search results by:  ";
		if(!sc.projects[0]){
			sc.resultType="";
			sc.resultType0 ="No Search Results";
		}
		
	},
	function(response){
		console.log(response);
	});
	}
	
	sc.project = function(projTitle){
		BaseService.projTitle = projTitle;
		console.log(projTitle);
	}
	
	function logoutFunc(){
		location.reload(true);
	}
	
	document.getElementById("logout").addEventListener("click", logoutFunc, false);
	
});


//controller for view page
angular.module("FishTank").controller("viewCtrl", function($state, $http, BaseService, SearchService){
	
	var vc = this;
	vc.user = BaseService.user;
	vc.message;
	
	vc.searchType = function(type){
		SearchService.searchType(type);
	}
	
	vc.updater = function(){
		$http({
			method: "PUT",
			url: "http://localhost:8087/buisnessStartUpProj/user/" + vc.user.username,
			data: vc.user
		})
		
		BaseService.user = vc.user;
		vc.message = "Profile Updated";
		
	};
	
	function logoutFunc(){
		location.reload(true);
	}
	
	document.getElementById("logout").addEventListener("click", logoutFunc, false);
	
});

//controller for investments page
angular.module("FishTank").controller("investCtrl", function($state, $http, BaseService, SearchService){
	
	var ic = this;
	ic.user = BaseService.user;
	ic.pageHeader;
	ic.searchType = function(type){
		SearchService.searchType(type);
	}
	
	var promise = $http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/investment/user/" + ic.user.username
	})
	promise.then(
		function(response){
			ic.investments = response.data;
			if(ic.investments[0]){ic.pageHeader="My Investments";}
			else{ic.pageHeader="No Investments, find some startups!";}
		},
		function(){console.log(response)}
	);
	
	ic.project = function(projTitle){
		BaseService.projTitle = projTitle;
	}
	
	function logoutFunc(){
		location.reload(true);
	}
	
	document.getElementById("logout").addEventListener("click", logoutFunc, false);
	
});


//controller for createProject page
angular.module("FishTank").controller("createProjectCtrl", function($state, $http, BaseService, SearchService){
	
	var cpc = this;
	cpc.user = BaseService.user;
	cpc.categoryId;
	cpc.duration;
	cpc.description;
	cpc.categories = ["Technology","Entertainment", "Business", "Food"];
	cpc.image;
	//cpc.imageKey = [];
	//cpc.base64string =[];
	cpc.base64string;
	cpc.imageKey;
	
	console.log("cpc.title = " + cpc.title);
	console.log("cpc.category = " + cpc.category);
	console.log("cpc.location= " + cpc.location);
	console.log("cpc.link= " + cpc.link);
	console.log("cpc.goal= " + cpc.goal);
	console.log("cpc.ratio= " + cpc.ratio);
	console.log("cpc.duration= " + cpc.duration);
	console.log("cpc.description= " + cpc.description);
	
	cpc.searchType = function(type){
		SearchService.searchType(type);
	}
	
	function EL(id) { return document.getElementById(id); } // Get el by ID helper function

	function readFile() {
	  if (this.files && this.files[0]) {
		  
		EL("filename").innerHTML = this.files[0].name;

		console.log("imageKey: "+this.files[0].name);
		//cpc.imageKey = this.files[0].name;
		//cpc.imageKey.push(this.files[0].name);
		cpc.imageKey = this.files[0].name;
		console.log(cpc.imageKey);
		
	    var FR= new FileReader();
	    FR.onload = function(e) {
	      EL("img").src = e.target.result;
	      document.getElementById("drop_zone").style.backgroundColor = '#80ffaa';
	      EL("dropzonetext").style.display = 'none';
	      cpc.dropzonefilled = true;
	      document.getElementById("dropzonetext").style.display = 'none';
	      cpc.base64string = e.target.result;
	     // cpc.base64string.push(e.target.result);
	      //console.log(document.getElementById("imageInput").value);
	    };       
	    FR.readAsDataURL( this.files[0] );
	  }
	}
	
	
	function dragleaveFunc(){
		if(cpc.dropzonefilled==true){
			document.getElementById("drop_zone").style.backgroundColor = '#80ffaa';
		}else{
			document.getElementById("drop_zone").style.backgroundColor = '#ffe6ff';
		}
		//document.getElementById("dropzonetext").innerHTML = 'Drag & Drop <br><br> (or click here to choose file)';
		document.getElementById("dropzonetext").style.color = '#0066ff';
	}
	
	function dragoverFunc(e){
		e.preventDefault();
		console.log("inside dragoverFunc");
		//document.getElementById("dropzonetext").innerHTML = 'Drop Image';
		document.getElementById("dropzonetext").style.color = 'white';
	}
	
	function hoverFunc(e){
		console.log("hoverFunc");
		console.log(document.getElementById("drop_zone").style.backgroundColor);
		if(document.getElementById("drop_zone").style.backgroundColor == 'rgb(255, 230, 255)'){
			console.log("in if hoverFunc");
			document.getElementById("drop_zone").style.backgroundColor = '#ccebff';
		}
	}
	
	function mouseOutFunc(e){
		if(document.getElementById("drop_zone").style.backgroundColor == 'rgb(204, 235, 255)'){
			document.getElementById("drop_zone").style.backgroundColor = '#ffe6ff';
		}
	}
	
	EL("imageInput").addEventListener("change", readFile, false);
	
	EL("drop_zone").addEventListener("dragover", dragoverFunc, false);
	EL("drop_zone").addEventListener("dragleave", dragleaveFunc, false);
	EL("drop_zone").addEventListener("drop", dragdrop, false);
	EL("drop_zone").addEventListener("mouseover", hoverFunc, false);
	EL("drop_zone").addEventListener("mouseout", mouseOutFunc, false);
	
	/*** DRAG AND DROP IMAGE FILE *****************************************/
	function dragdrop(event) {
	    event.preventDefault();
	    var imgFile = event.dataTransfer.files[0];

	    //console.log(event.dataTransfer);

	  
	    //var e = event.dataTransfer;
	    console.log("sup");
	    EL("filename").innerHTML = imgFile.name;
	   // cpc.imageKey.push(imgFile.name);
	    cpc.imageKey = imgFile.name;
	    console.log(cpc.imageKey);
	    var FR = new FileReader();
	    FR.onload = function(e){
	        console.log("hello");
	        cpc.dropzonefilled = true;
	        cpc.base64string = e.target.result;
	        //cpc.base64string.push(e.target.result);
	        console.log("cpc.base64string");
	        console.log(cpc.base64string);
	        console.log("goodbye");
	        document.getElementById("drop_zone").style.backgroundColor = '#80ffaa';
	        document.getElementById("drop_zone").style.border = "thick solid green";
	        document.getElementById("checkicon").style.display = "inherit";
	        EL("dropzonetext").style.display = 'none';
	        EL("img").src = e.target.result;
	         //EL("drop_zone")
	    }
	    FR.readAsDataURL(imgFile)
	    //console.log(URL.createObjectURL(imgFile));
	    //document.getElementById("img").src = imgFile.name;
	    //console.log(event.dataTransfer.target.result);
	    //console.log("imageFile: "+imgFile);
	    //console.log("imageFile.name: "+imgFile.name);
	}
	/******************************************************************/
	
	
	
	cpc.createProject = function(){
		
		
		if(cpc.title && cpc.category && cpc.location && cpc.link && cpc.goal && cpc.ratio && cpc.duration && cpc.description){
			
		
		
		if(cpc.category==="Technology"){cpc.categoryId=1;}
		else if(cpc.category==="Entertainment"){cpc.categoryId=2;}
		else if(cpc.category==="Business"){cpc.categoryId=3;}
		else if(cpc.category==="Food"){cpc.categoryId=4;}
		BaseService.projectCreated = {title : cpc.title, location : cpc.location, goal: cpc.goal, ratio: cpc.ratio, link : cpc.link};
		
		var promise = $http({
			method: "POST",
			url: "http://localhost:8087/buisnessStartUpProj/project/" + cpc.user.username + "+" + cpc.categoryId + "+" + cpc.duration, 
			data: {title : cpc.title, location : cpc.location, goal: cpc.goal, ratio: cpc.ratio, link : cpc.link}
		})
		promise.then(
			function(response){
				cpc.project = response.data;
				
				$http({
					method: "POST",
					url: "http://localhost:8087/buisnessStartUpProj/description/" + cpc.title,
					data: {text : cpc.description}
				});
				
				$http({
					method: "POST",
					url: "http://localhost:8087/buisnessStartUpProj/image/" + cpc.imageKey + "/" + cpc.title,
					data: cpc.base64string,
					dataType: "text"
				});
				
				
				$http({
					method: "GET",
					url: "http://localhost:8087/buisnessStartUpProj/project/goal"
				})
				.then(
				function(response){
				BaseService.allProjs = response.data;
				});
				
				$state.go('projectCreatedState'); // added 8-17-16
			},
			function(){console.log('error')}
		);
		//
		}else{
			if(!cpc.title){cpc.titleRequired= 1;} else{cpc.titleRequired= 0;}
			if(!cpc.category){cpc.categoryRequired= 1;} else{cpc.categoryRequired= 0;}
			if(!cpc.location){cpc.locationRequired= 1;} else{cpc.locationRequired= 0;}
			if(!cpc.link){cpc.linkRequired= 1;} else{cpc.linkRequired= 0;}
			if(!cpc.goal){cpc.goalRequired= 1;} else{cpc.goalRequired= 0;}
			if(!cpc.ratio){cpc.ratioRequired= 1;} else{cpc.ratioRequired= 0;}
			if(!cpc.duration){cpc.durationRequired= 1;} else{cpc.durationRequired= 0;}
			if(!cpc.description){cpc.descriptionRequired= 1;} else{cpc.descriptionRequired= 0;}
			cpc.requiredField = 1;
		}
	}
	
	function logoutFunc(){
		location.reload(true);
	}
	
	document.getElementById("logout").addEventListener("click", logoutFunc, false);
	
});


//controller for projectCreated page
angular.module("FishTank").controller("projectCreatedCtrl", function($state, $http, BaseService, SearchService){
	
	var pcc = this;
	pcc.user = BaseService.user;
	pcc.project = BaseService.projectCreated;
	pcc.saveProj = function(projTitle){
		
		BaseService.projTitle = projTitle;
	}
	
	pcc.searchType = function(type){
		SearchService.searchType(type);
	}
	
	function logoutFunc(){
		location.reload(true);
	}
	
	document.getElementById("logout").addEventListener("click", logoutFunc, false);
	
});


//controller for my projects
angular.module("FishTank").controller("projectsCtrl", function($state, $http, BaseService, SearchService, $scope, $uibModal, $log){
	var pc = this;
	
	pc.user = BaseService.user;
	
	pc.searchType = function(type){
		SearchService.searchType(type);
	}
	
	pc.myProjects = function(){
		
		$http({
			method: "GET",
			url: "http://localhost:8087/buisnessStartUpProj/project/user/" + pc.user.username
		})
		.then(
		function(response){
		BaseService.projects = response.data;
		pc.projects = BaseService.projects;
		if(pc.projects[0]){pc.pageHeader="My Projects";}
		else{pc.pageHeader="You Have No Projects";}
		});
	}
	
	pc.saveProj = function(projTitle){
		BaseService.projTitle = projTitle;
		console.log("inside pc.saveProj: " + projTitle);
		
		$http({
			method: "GET",
			url: "http://localhost:8087/buisnessStartUpProj/image/projectTitle/" + projTitle,
		}).then(function(response){
			pc.images = response.data;
			console.log("pc.images = " + pc.images);
			BaseService.imageLink = "https://s3-us-west-2.amazonaws.com/fishtankbucket/" + pc.images[0];
			console.log(BaseService.imageLink);
			console.log("pc.images: " + pc.images[0]);
		});
		
		
	}
	
	pc.myProjects();
	
	
	//MODAL CODE update
	  $scope.open = function (projTitle) {

		BaseService.projTitle = projTitle;
		  
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl'
	    });
	    
	    modalInstance.result.then(function(){});
	    
	  };
	  
	  //MODAL CODE project investments
	  $scope.open1 = function (projId) {

		BaseService.projId = projId;
		  
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: 'myModalContent3.html',
	      controller: 'ModalInstanceCtrl3'
	    });
	    
	    modalInstance.result.then(function(){});
	    
	  };
	  
	  function logoutFunc(){
			location.reload(true);
		}
		
	  document.getElementById("logout").addEventListener("click", logoutFunc, false);
	  
});


//control for a single project
angular.module("FishTank").controller("indProjCtrl", function($state, $http, BaseService, SearchService, $scope, $uibModal, $log){
	var ipc = this;
	
	ipc.username = BaseService.user.username;
	
	ipc.searchType = function(type){
		SearchService.searchType(type);
	}
	
	
	ipc.resetStars = function(){
		ipc.lock = 0;ipc.newReviewStars=0;
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		document.getElementById("star3e").style.display="inline";
		document.getElementById("star3").style.display="none";
		document.getElementById("star2e").style.display="inline";
		document.getElementById("star2").style.display="none";
		document.getElementById("star1e").style.display="inline";
		document.getElementById("star1").style.display="none";
	}
	
	function star1Over(){
		console.log("star1over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		document.getElementById("star3e").style.display="inline";
		document.getElementById("star3").style.display="none";
		document.getElementById("star2e").style.display="inline";
		document.getElementById("star2").style.display="none";
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	
	function star1eOver(){
		//ipc.star1=1;
		console.log(ipc.lock);
		console.log("star1over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		
		document.getElementById("star3e").style.display="inline";
		document.getElementById("star3").style.display="none";
		
		document.getElementById("star2e").style.display="inline";
		document.getElementById("star2").style.display="none";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star1Out(){
		console.log("star1out");
		ipc.newReviewStars=ipc.lock;
		if(ipc.lock===0){
		document.getElementById("star1e").style.display="inline";
		document.getElementById("star1").style.display="none";
		}
		else if(ipc.lock===1){star1eOver();}
		else if(ipc.lock===2){star2eOver();} 
		else if(ipc.lock===3){star3eOver();}
		else if(ipc.lock===4){star4eOver();}
		else if(ipc.lock===5){star5eOver();}
		console.log(ipc.newReviewStars);
	}
	
	function star2Over(){
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		
		document.getElementById("star3e").style.display="inline";
		document.getElementById("star3").style.display="none";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star2eOver(){
		console.log("star2over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		
		document.getElementById("star3e").style.display="inline";
		document.getElementById("star3").style.display="none";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star2Out(){
		console.log("star2out");
		ipc.newReviewStars=ipc.lock;
		if(ipc.lock===0){
			document.getElementById("star2e").style.display="inline";
			document.getElementById("star2").style.display="none";
			document.getElementById("star1e").style.display="inline";
			document.getElementById("star1").style.display="none";
		}
		else if(ipc.lock===1){star1eOver();}
		else if(ipc.lock===2){star2eOver();} 
		else if(ipc.lock===3){star3eOver();}
		else if(ipc.lock===4){star4eOver();}
		else if(ipc.lock===5){star5eOver();}
		console.log(ipc.newReviewStars);
	}
	
	function star3Over(){
		console.log("star3over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		
		document.getElementById("star3e").style.display="none";
		document.getElementById("star3").style.display="inline";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star3eOver(){
		console.log("star3over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		
		document.getElementById("star3e").style.display="none";
		document.getElementById("star3").style.display="inline";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star3Out(){
		console.log("star3out");
		ipc.newReviewStars=ipc.lock;
		if(ipc.lock===0){
			document.getElementById("star3e").style.display="inline";
			document.getElementById("star3").style.display="none";
			
			document.getElementById("star2e").style.display="inline";
			document.getElementById("star2").style.display="none";
			
			document.getElementById("star1e").style.display="inline";
			document.getElementById("star1").style.display="none";
		}
		else if(ipc.lock===1){star1eOver();}
		else if(ipc.lock===2){star2eOver();} 
		else if(ipc.lock===3){star3eOver();}
		else if(ipc.lock===4){star4eOver();}
		else if(ipc.lock===5){star5eOver();}
		console.log(ipc.newReviewStars);
	}
	function star4Over(){

		console.log("star4over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="none";
		document.getElementById("star4").style.display="inline";
		
		document.getElementById("star3e").style.display="none";
		document.getElementById("star3").style.display="inline";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star4eOver(){

		console.log("star4over");
		document.getElementById("star5e").style.display="inline";
		document.getElementById("star5").style.display="none";
		
		document.getElementById("star4e").style.display="none";
		document.getElementById("star4").style.display="inline";
		
		document.getElementById("star3e").style.display="none";
		document.getElementById("star3").style.display="inline";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star4Out(){
		console.log("star4out");
		ipc.newReviewStars=ipc.lock;
		if(ipc.lock===0){
		document.getElementById("star4e").style.display="inline";
		document.getElementById("star4").style.display="none";
		
		document.getElementById("star3e").style.display="inline";
		document.getElementById("star3").style.display="none";
		
		document.getElementById("star2e").style.display="inline";
		document.getElementById("star2").style.display="none";
		
		document.getElementById("star1e").style.display="inline";
		document.getElementById("star1").style.display="none";
		}
		else if(ipc.lock===1){star1eOver();}
		else if(ipc.lock===2){star2eOver();} 
		else if(ipc.lock===3){star3eOver();}
		else if(ipc.lock===4){star4eOver();}
		else if(ipc.lock===5){star5eOver();}
		console.log(ipc.newReviewStars);
	}
	function star5eOver(){
		console.log("star5over");
		document.getElementById("star5e").style.display="none";
		document.getElementById("star5").style.display="inline";
		
		document.getElementById("star4e").style.display="none";
		document.getElementById("star4").style.display="inline";
		
		document.getElementById("star3e").style.display="none";
		document.getElementById("star3").style.display="inline";
		
		document.getElementById("star2e").style.display="none";
		document.getElementById("star2").style.display="inline";
		
		document.getElementById("star1e").style.display="none";
		document.getElementById("star1").style.display="inline";
	}
	function star5Out(){
		
		console.log("star5out");
		
		ipc.newReviewStars=ipc.lock;
		
		if(ipc.lock===0){
			document.getElementById("star5e").style.display="inline";
			document.getElementById("star5").style.display="none";
			
			document.getElementById("star4e").style.display="inline";
			document.getElementById("star4").style.display="none";
			
			document.getElementById("star3e").style.display="inline";
			document.getElementById("star3").style.display="none";
			
			document.getElementById("star2e").style.display="inline";
			document.getElementById("star2").style.display="none";
			
			document.getElementById("star1e").style.display="inline";
			document.getElementById("star1").style.display="none";
		}
		else if(ipc.lock===1){star1eOver();}
		else if(ipc.lock===2){star2eOver();} 
		else if(ipc.lock===3){star3eOver();}
		else if(ipc.lock===4){star4eOver();}
		else if(ipc.lock===5){star5eOver();}
		console.log(ipc.newReviewStars);
	}
	
	document.getElementById("star1e").addEventListener("mouseover", star1eOver, false);
	document.getElementById("star2e").addEventListener("mouseover", star2eOver, false);
	document.getElementById("star3e").addEventListener("mouseover", star3eOver, false);
	document.getElementById("star4e").addEventListener("mouseover", star4eOver, false);
	document.getElementById("star5e").addEventListener("mouseover", star5eOver, false);
	
	ipc.lock=0;
	ipc.newReviewStars=0;
	
	document.getElementById("star1").addEventListener("mouseover", star1Over, false);
	document.getElementById("star2").addEventListener("mouseover", star2Over, false);
	document.getElementById("star3").addEventListener("mouseover", star3Over, false);
	document.getElementById("star4").addEventListener("mouseover", star4Over, false);
	
	document.getElementById("star1").addEventListener("mouseout", star1Out, false);
	document.getElementById("star2").addEventListener("mouseout", star2Out, false);
	document.getElementById("star3").addEventListener("mouseout", star3Out, false);
	document.getElementById("star4").addEventListener("mouseout", star4Out, false);
	document.getElementById("star5").addEventListener("mouseout", star5Out, false);
	
	function star1click(e){ipc.lock = 1;ipc.newReviewStars=1;console.log("ipc.lock = "+ipc.lock);e.stopPropagation();}
	function star2click(e){ipc.lock = 2;ipc.newReviewStars=2;console.log("ipc.lock = "+ipc.lock);e.stopPropagation();}
	function star3click(e){ipc.lock = 3;ipc.newReviewStars=3;console.log("ipc.lock = "+ipc.lock);e.stopPropagation();}
	function star4click(e){ipc.lock = 4;ipc.newReviewStars=4;console.log("ipc.lock = "+ipc.lock);e.stopPropagation();}
	function star5click(e){ipc.lock = 5;ipc.newReviewStars=5;console.log("ipc.lock = "+ipc.lock);e.stopPropagation();}
	
	document.getElementById("star1").addEventListener("click", star1click, false);
	document.getElementById("star2").addEventListener("click", star2click, false);
	document.getElementById("star3").addEventListener("click", star3click, false);
	document.getElementById("star4").addEventListener("click", star4click, false);
	document.getElementById("star5").addEventListener("click", star5click, false);
	
	
	//document.getElementById("review").addEventListener("mouseover", starlockFunc, false);
	
	//ipc.imageLink = "https://s3-us-west-2.amazonaws.com/fishtankbucket/dumplings.jpg"
	console.log("BaseService.imageLink: " + BaseService.imageLink);
	ipc.imageLink = BaseService.imageLink;
	//ipc.imageLink = "https://s3-us-west-2.amazonaws.com/fishtankbucket/";
	
	ipc.user = BaseService.user;
	ipc.projectTitle = BaseService.projTitle;
	ipc.projects = BaseService.allProjs;
	for(index in ipc.projects){
		if(ipc.projects[index].title === ipc.projectTitle){
			ipc.project = ipc.projects[index];
			console.log("ProjectId: "+ipc.project.id); // 8-17-16
		}
	}
	
	if(ipc.project.user.username == BaseService.user.username){
		ipc.owner = 0;
	}else{
		ipc.owner = 1;
	}
	
	$http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/review/projectId/" + ipc.project.id
	}).then(function(response){
		ipc.reviews = response.data;
	});
	
	$http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/update/" + ipc.project.title
	}).then(function(response){
		ipc.updates = response.data;
		//ipc.projUser =  ipc.project.user.username;
		ipc.projUser = ipc.project.user.firstname + " " + ipc.project.user.lastname;
	});
	
	$http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/description/" + ipc.project.id
	}).then(function(response){
		ipc.descriptions = response.data;
		
	});
	
	$http({
		method: "GET",
		url: "http://localhost:8087/buisnessStartUpProj/image/" + ipc.project.id,
	}).then(function(response){
		ipc.images = response.data;
		ipc.imageLink = "https://s3-us-west-2.amazonaws.com/fishtankbucket/" + ipc.images[0];
		console.log("ipc.imageLink"+ipc.imageLink);
		console.log("ipc.images: " + ipc.images[0]);
	});
	
	ipc.submitReview = function(text, stars){
		$http({
			method: "POST",
			url: "http://localhost:8087/buisnessStartUpProj/review/" + BaseService.user.username + "+" + ipc.project.id,
			data : {"comment" : text, "stars" : stars}
		}).then(function(){
		
		$http({
			method: "GET",
			url: "http://localhost:8087/buisnessStartUpProj/review/projectId/" + ipc.project.id
		}).then(function(response){
			ipc.reviews = response.data;
			ipc.rating = 0;
			for(index in ipc.reviews){
				ipc.rating += ipc.reviews[index].stars;
			}
			ipc.rating = ipc.rating / ipc.reviews.length;
			ipc.project.rating = ipc.rating;
			
			$http({
				method: "PUT",
				url: "http://localhost:8087/buisnessStartUpProj/project/" + ipc.project.title,
				data: ipc.project
			});
			
			ipc.newReviewStars = "";
			ipc.newReviewText = "";
			
		});
		
		});
	}
	
	console.log(ipc.project)
	
	//MODAL CODE for investment
	  $scope.open = function (project) {
		  
		BaseService.project = project;
		
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: 'myModalContent1.html',
	      controller: 'ModalInstanceCtrl1'
	    });
	    
	    modalInstance.result.then(function(){});
	    
	  };
	  
	  //MODAL CODE for contact
	  $scope.open1 = function (project) {
		  
		BaseService.project = project;
		
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: 'myModalContent2.html',
	      controller: 'ModalInstanceCtrl2'
	    });
	    
	    modalInstance.result.then(function(){});
	    
	  };
	  
	  function logoutFunc(){
			location.reload(true);
		}
		
		document.getElementById("logout").addEventListener("click", logoutFunc, false);
		
		ipc.showDiv = 1;
		
		
		function campaignFunc(){
			document.getElementById("campaign").style.backgroundColor = 'black';
			document.getElementById("campaign").style.color = 'aqua';
			
			document.getElementById("reviews").style.backgroundColor = '#80dfff';
			document.getElementById("reviews").style.color = 'black';
			
		}
		document.getElementById("campaign").addEventListener("click", campaignFunc, false);
		
		function reviewsFunc(){
			document.getElementById("reviews").style.backgroundColor = 'black';
			document.getElementById("reviews").style.color = 'aqua';
			
			document.getElementById("campaign").style.backgroundColor = '#80dfff';
			document.getElementById("campaign").style.color = 'black';
		}
		document.getElementById("reviews").addEventListener("click", reviewsFunc, false);
		
		
	
});

	//modal code for instance in update
	angular.module('FishTank').controller('ModalInstanceCtrl', function ($http, $scope, $uibModalInstance, BaseService) {

		$scope.projTitle = BaseService.projTitle;
		
	  $scope.ok = function () {
		  
		  $http({
				method: "POST",
				url: "http://localhost:8087/buisnessStartUpProj/update/" + $scope.projTitle,
				data: {title : $scope.updTitle, description : $scope.updDesc}
			});
		  
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss();
	  };
	});
	
	
	//modal code for instance in investment
	angular.module('FishTank').controller('ModalInstanceCtrl1', function ($http, $scope, $uibModalInstance, BaseService) {

		$scope.project = BaseService.project;
		
	  $scope.ok = function () {
		  
		  $http({
				method: "POST",
				url: "http://localhost:8087/buisnessStartUpProj/investment/" + BaseService.user.username + "+" + $scope.project.title,
				data: {amount : $scope.amount, percent : Number($scope.amount) / $scope.project.ratio}
			}).then(function(){
				
				$scope.project.currentAmount = Number($scope.project.currentAmount) + Number($scope.amount);
				
				$http({
					method: "PUT",
					url: "http://localhost:8087/buisnessStartUpProj/project/" + $scope.project.title,
					data: $scope.project
				})
				
			});
		  
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss();
	  };
	});
	
	
	//modal code for instance for contacting owner
	angular.module('FishTank').controller('ModalInstanceCtrl2', function ($http, $scope, $uibModalInstance, BaseService) {
		
		
	  $scope.ok = function () {
		  $http({ 
			  method: "POST",
				url: "http://localhost:8087/buisnessStartUpProj/email/" + BaseService.project.user.firstname + "/" + BaseService.project.user.lastname + "/" + $scope.subject + "/" + BaseService.user.username,
				data: $scope.message,
				dataType: "text"
		  })
		  console.log(BaseService.user.username);
		  console.log(BaseService.project.user.username);
		  console.log(BaseService.project.user.firstname);
		  console.log(BaseService.project.user.lastname);
		  console.log($scope.message);
		  $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss();
	  };
	});
	
	
	//modal code for instance for viewing investment history
	angular.module('FishTank').controller('ModalInstanceCtrl3', function ($http, $scope, $uibModalInstance, BaseService) {
		
		
		$http({ 
			  method: "GET",
			  url: "http://localhost:8087/buisnessStartUpProj/investment/project/" + BaseService.projId
		  }).then(
			function(response){
				$scope.investments = response.data;
				if(!$scope.investments[0]){$scope.noinvestments="No Investments";}
				else{$scope.noinvestments="";}
				console.log("123456");
				console.log(response.data);
			}	  
		  )
		
	  $scope.ok = function () {
		  $uibModalInstance.close();
	  };

	});
	
	
	
