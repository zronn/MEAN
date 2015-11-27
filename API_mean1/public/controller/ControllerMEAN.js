/**
 * Created by remi on 24/11/2015.
 */
var app = angular.module('app', ['ngRoute']);

app.controller('AddCommentaire', ['$scope', '$http', '$routeParams', '$route', function($scope, $http, $routeParams, $route){

    $scope.AddCom = function(){
        if ($scope.namePseudo && $scope.textCom) {
            console.log($scope.namePseudo + "||||" + $scope.textCom);
            $http.post("http://localhost:3000/commentaires/" + $routeParams.id, {
                    name: $scope.namePseudo,
                    text: $scope.textCom,
                    id_article: $routeParams.id
                }
            ).success(function () {
                $scope.namePseudo = "";
                $scope.textCom = "";
                $route.reload();
            }).error(function (err) {
                console.log(err);
                $scope.messageAddCom = "Erreur d'envoie";
            });
        }else {
            $scope.messageAddCom = "Les champs Pseudo ou Commentaires sont vides";
        }
        }
}]);
app.controller('AddArticle', ['$scope', '$http', '$routeParams', '$route', function($scope, $http, $routeParams, $route){

    $scope.AddArt = function(){
        if ($scope.namePseudoArt && $scope.textArt && $scope.titleArt) {

            $http.post("http://localhost:3000/article/", {
                    name: $scope.namePseudoArt,
                    resum: $scope.textArt,
                    title: $scope.titleArt
                }
            ).success(function () {
                $scope.namePseudoArt = "";
                $scope.textArt = "";
                $route.reload();
            }).error(function (err) {
                console.log(err);
                $scope.messageAddArt = "Erreur d'envoie";
            });
        }else {
            $scope.messageAddArt = "Les champs Pseudo, article, titre sont vides";
        }
    }
}]);
app.controller('ArticleCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
//    var data = $http.get('http://localhost:8080/articles');
     console.log('Controller Article');

     $http.get("http://localhost:3000/articles")
        .success(function (data, status, headers, config){
            $scope.articles = data;
        });

}]);
app.controller('EditCommentaireCtrl', ['$scope', '$http', '$log', '$routeParams', function($scope, $http, $log, $routeParams) {

    $scope.EditCom = function() {
        if ($scope.namePseudoArtC && $scope.textArtC) {

            $http.put("http://localhost:3000/commentaire/" + $routeParams.id +"/edit", {
                    name: $scope.namePseudoArtC,
                    commentaire: $scope.textArtC,
                }
            ).success(function () {
                $scope.messageEditCom = "Modification envoyé";
            }).error(function (err) {
                console.log(err);
                $scope.messageEditCom = "Erreur d'envoie";
            });
        } else {
            $scope.messageEditCom = "Les champs Pseudo, article, titre sont vides";

        }
        ;
    }
    $http.get("http://localhost:3000/commentaire/" + $routeParams.id + "/find")
        .success(function (data, status, headers, config){
            $scope.namePseudoArtC = data.name;
            $scope.textArtC = data.commentaire;
        });

}]);
app.controller('EditArticleCtrl', ['$scope', '$http', '$log', '$routeParams', function($scope, $http, $log, $routeParams) {
//    var data = $http.get('http://localhost:8080/articles');
    console.log('Controller EditArticle');
    $scope.EditArt = function() {
        if ($scope.namePseudoArtE && $scope.textArtE && $scope.titleArtE) {

            $http.put("http://localhost:3000/articles/" + $routeParams.id, {
                    name: $scope.namePseudoArtE,
                    resum: $scope.textArtE,
                    title: $scope.titleArtE
                }
            ).success(function () {
                $scope.messageEditArt = "Modification envoyé";
            }).error(function (err) {
                console.log(err);
                $scope.messageEditArt = "Erreur d'envoie";
            });
        } else {
            $scope.messageEditArt = "Les champs Pseudo, article, titre sont vides";

        }
        ;
    }
    $http.get("http://localhost:3000/articles/" + $routeParams.id)
        .success(function (data, status, headers, config){
            $scope.namePseudoArtE = data.name;
            $scope.titleArtE = data.title;
            $scope.textArtE = data.resum;
        });

}]);
app.controller('CommentaireCtrl', ['$scope', '$http', '$log','$routeParams', function($scope, $http,$log, $routeParams){
    console.log('Controller Commentaire');
    console.log('http://localhost:3000/commentaires/' + $routeParams.id);

         $http.get("http://localhost:3000/commentaires/" + $routeParams.id)
            .success(function (data, status, headers, config){
                if (data.length != 0) {
                    $scope.Commentaires = data;
                }else{
                    $scope.Commentaires = [{name:"Aucun commentaire."}];
                }
            });
}]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/article', {
            templateUrl: 'view/ViewArticle.html',
            controller: 'ArticleCtrl'
        }).
        when('/commentaire/:id', {
            templateUrl: 'view/ViewCommentaire.html',
            controller: 'CommentaireCtrl'
        }).
        when('/article/:id/edit', {
            templateUrl: 'view/ViewEditArticle.html',
            controller: 'EditArticleCtrl'
        }).
        when('/commentaire/:id/edit', {
            templateUrl: 'view/ViewEditCommentaire.html',
            controller: 'EditCommentaireCtrl'
        }).
        when('/', {
            templateUrl: 'view/ViewIndex.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);