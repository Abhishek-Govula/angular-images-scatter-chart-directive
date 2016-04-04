var myApp = angular.module("sakpFarmApp", ['customChart']);

/*myApp.controller("myController", ['$scope','$http','$q', function($scope, $http, $q){
	$scope.data = "heloo";
}]);*/
myApp.service("myService", [function(){
	this.updateGraph = function(element, attr){
		var removingElem = $(element).parent().find(element);
		// console.log(removingElem);
		// console.log(attr);
		//$(element).parent().find(element).empty();
		console.log("Element Removed");
		// $(element).parent().append($(element));
	};
}]);
myApp.controller("myController", ['$scope','$http','$q', function($scope, $http, $q){

	$scope.chartConfig = {
		label: {
			xAxis: "Time",
			yAxis: "Stages"
		},
		margin: {
			top: 20, 
			right: 20, 
			bottom: 30, 
			left: 40
		},
        ticks: {
            xAxis: 3,
            yAxis: 5
        },
        images: [
            {
                id: "tree",
                url: "images/tree.png"
            },{
                id: "sapling",
                url: "images/sapling.jpg"
            },{
                id: "plant",
                url: "images/plant.png"
            },{
                id: "flower",
                url: "images/flower.png"
            }
        ]
	};

	$http({
		method: 'GET',
		url: 'http://localhost:3000/testData'
	}).then(function successCallback(response) {
		$scope.data = response.data;
	}, function errorCallback(response) {
		alert("Error while getting the data");
		deferred.reject({error: "Error while getting the data"});
	});
	setTimeout(function(){
		$http({
			method: 'GET',
			url: 'http://localhost:3000/testData2'
		}).then(function successCallback(response) {
			$scope.data = response.data;
            $scope.chartConfig.images = [
            {
                id: "plant",
                url: "images/plant.png"
            },
            {
                id: "flower",
                url: "images/plant.png"
            },
            {
                id: "tree",
                url: "images/tree.png"
            }]
		}, function errorCallback(response) {
			alert("Error while getting the data");
			deferred.reject({error: "Error while getting the data"});
		});
	}, 3000);
}]);

