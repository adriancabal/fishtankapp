/**
 * 
 **/

//create our router
angular.module("FishTank", ['ui.router', 'ngRoute', 'angularModalService', 'ui.bootstrap']);


//Router design
angular.module("FishTank").config(
		
function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise('');
	
	$stateProvider
	.state('loginState', {
		url: '/',
		templateUrl: 'ng/templates/login.html',
		controller: 'loginCtrl as hc'
	})
	.state('homeState', {
		url: '/home',
		templateUrl: 'ng/templates/home.html',
		controller: 'homeCtrl as hc'
	})
	.state('viewState', {
		url: '/my/info',
		templateUrl: 'ng/templates/view.html',
		controller: 'viewCtrl as vc'
	})
	.state('searchState', {
		url: '/search/projects',
		templateUrl: 'ng/templates/search.html',
		controller: 'searchCtrl as sc'
	})
	.state('projectState', {
		url: '/my/projects',
		templateUrl: 'ng/templates/projects.html',
		controller: 'projectsCtrl as pc'
	})
	.state('investState', {
		url: '/my/investments',
		templateUrl: 'ng/templates/investments.html',
		controller: 'investCtrl as ic'
	})

	.state('createProjectState',{
		url: '/createProject',
		templateUrl: 'ng/templates/createProject.html',
		controller: 'createProjectCtrl as cpc'
	})
	
	.state('projectCreatedState',{
		url: '/projectCreated',
		templateUrl: 'ng/templates/projectCreated.html',
		controller: 'projectCreatedCtrl as pcc'
	})

	.state('indProjectState', {
		url: '/project',
		templateUrl: 'ng/templates/indProject.html',
		controller: 'indProjCtrl as ipc'
	})

}
);