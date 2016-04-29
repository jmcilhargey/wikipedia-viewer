var app = angular.module("wikiApp", []);

app.controller("SearchController", ["$scope", "$http", function($scope, $http) { 
  
  $scope.title = "Wikipedia Viewer";
  
  $scope.mission = "The mission of the Wikimedia Foundation is to empower and engage people around the world to collect and develop educational content under a free license or in the public domain, and to disseminate it effectively and globally."
  
  // Trigger search function for enter key in input field
  $scope.enter = function(event) {
    if (event.keyCode == 13) {
      $scope.search();
    }
  }
  
  $scope.search = function() {   
  // Send HTTP request for JSON using http service
  $http.jsonp("http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + $scope.entry + "&callback=JSON_CALLBACK")
      .success(function(data) {
        // Select nested pages from JSON and store them
        $scope.datapull = data.query.pages;
        $scope.results = new Array; 
        // Run callback on each item in data to create new array with select values
        angular.forEach($scope.datapull, function(value, key) {
            $scope.results.push({
              title: value.title,
              desc: value.extract,
              link: "http://en.wikipedia.org/?curid=" + value.pageid
            })
          });
      })
      // For troubleshooting with failed requests.
      .error(function(error) {
        alert("Not working!")
      })    
  };
     
}]);