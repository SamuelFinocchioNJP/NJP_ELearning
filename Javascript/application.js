/**
*  app Website
*  @author Samuel Finocchio
*  InformaticageNJP
*  Started: 16/05/2016
*  @access public
*  Defines the behavior of the platform
*/
/*global angular*/
var application = angular.module("WebSite", ['ngRoute','ui.materialize']);

/**
 * Configuring application
**/

application.config(function ($routeProvider, $sceProvider)
// Routing from the index.html page
{
    $sceProvider.enabled(false);
    $routeProvider
        // Navigating the root of the website
        .when("/", {
            templateUrl: 'Views/Introduction.html',
        })
        
        // Navigating #/Current_Course
        .when("/Current_Course", {
            templateUrl: 'Views/CurrentCourse.html',
            controller: 'currentCourseController'
        })
       
        // Navigating #/Video_Tutorials
        .when("/Documents", {
            templateUrl: 'Views/Documents.html',
            controller: 'coursesController'
        })
        
        // Navigating #/Video_Tutorials
        .when("/Courses", {
            templateUrl: 'Views/Courses.html',
            controller: 'coursesController'
        })
        
        // Navigating #/User
        .when("/User", {
            templateUrl: 'Views/User.html',
            controller: 'userController'
        })
        
        // Navigating #/Video_Tutorials
        .when("/Exercises", {
            templateUrl: 'Views/Exercises.html',
            controller: 'exercisesController'
        })
        
        // Navigating #/Login
        .when("/Login", {
            templateUrl: 'Views/Login.html',
            controller: 'loginController'
        })
               
        // Navigating #/Videos
        .when("/Video_Tutorials", {
            templateUrl: 'Views/Videos.html',
            controller: 'videosController'
        })   
                
        // Navigating #/Forum
        .when("/Forum", {
            template: 'You are on forum'
        })
        
        // Navigating noone of the above
        .otherwise({
            redirectTo: "/"
        });
});

/**
 * Controllers 
/**/

application.controller('mainController', function ($scope, $rootScope, $http) 
// Controller of index.html
{
    // Specified Course
    $rootScope.currentCourseID;
    $rootScope.courseName;
    // User Data
    $rootScope.User = {};
    $rootScope.User.isLogged;
    $rootScope.User.username;
    $rootScope.User.password;
    $rootScope.User.name;
    $rootScope.User.surname;
    $rootScope.User.email;
    // Navigator elements to be displayed in <nav> tag
    $rootScope.Navigator = 
    [
        {"elementName": "Home",                   "routingUrl": "#/"},
        {"elementName": "Courses",                "routingUrl": "#/Courses"},
        {"elementName": "Video Tutorials",        "routingUrl": "#/Video_Tutorials"},
        {"elementName": "Documents",              "routingUrl": "#/Documents"},
        {"elementName": "Exercises",              "routingUrl": "#/Exercises"},
        {"elementName": "Login",                  "routingUrl": "#/Login"},
        {"elementName": "Forum",                  "routingUrl": "#/Forum"},
    ];
});

application.controller('coursesController', function ($scope, $rootScope,$location, $http) 
// Controller of Courses.html
{
    /*
     *  Gets the list of all the available courses
     */
    $scope.getCourses = function ()
    {
        $scope.Courses;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {todo: 'get_courses'}
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Courses = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    $scope.selectCourse = function (id_course, course_name)
    {
        $rootScope.currentCourseID = id_course;
        $rootScope.courseName = course_name;
        $location.path('/Current_Course')
    }
    
    $scope.getCourses();
});

application.controller('currentCourseController', function ($scope, $rootScope, $http)
// Controller of CurrentCourse.html
{
    /*
     *  Gets the content of the specified course
     */
    $scope.getCourseContent = function ()
    {
        $scope.Content;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_content',
                id: $rootScope.currentCourseID 
            }
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Content = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    $scope.getCourseContent();
});

// When loaded sets the default nav >> Login >> IF ACCEPTED >> GetUserInfo >> UpdateNav >> Redirect to Home
application.controller('loginController', function ($scope, $rootScope, $http, $location)
// Controller of Login.html
{
    var defaultNav = function ()
    {
        $rootScope.Navigator = 
        [
                {"elementName": "Home",                   "routingUrl": "#/"},
                {"elementName": "Courses",                "routingUrl": "#/Courses"},
                {"elementName": "Video Tutorials",        "routingUrl": "#/Video_Tutorials"},
                {"elementName": "Documents",              "routingUrl": "#/Documents"},
                {"elementName": "Exercises",              "routingUrl": "#/Exercises"},
                {"elementName": "Login",                  "routingUrl": "#/Login"},
                {"elementName": "Forum",                  "routingUrl": "#/Forum"},
        ];
    }
    
    var updateNav = function (args) {
         $rootScope.Navigator = 
            [
                {"elementName": "Home",                   "routingUrl": "#/"},
                {"elementName": "Courses",                "routingUrl": "#/Courses"},
                {"elementName": "Video Tutorials",        "routingUrl": "#/Video_Tutorials"},
                {"elementName": "Documents",              "routingUrl": "#/Documents"},
                {"elementName": "Exercises",              "routingUrl": "#/Exercises"},
                {"elementName": "Logout",                 "routingUrl": "#/Login"},
                {"elementName": "User",                   "routingUrl": "#/User"},
                {"elementName": "Forum",                  "routingUrl": "#/Forum"},
            ];
    }
    
    $scope.getUserInfo = function ()
    {
        $scope.Courses;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_user_info',
                username: $rootScope.User.username,
                password: $rootScope.User.password
            }
        })
            .success(function(data, status, headers, config) 
            {
                $rootScope.User.username = data.username;
                $rootScope.User.name = data.name;
                $rootScope.User.surname = data.surname;
                $rootScope.User.email = data.email;
                $rootScope.User.isLogged = true;
                updateNav();
                $location.path('/')
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    $scope.login = function ()
    {
        $scope.Courses;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'login',
                username: $rootScope.User.username,
                password: $rootScope.User.password
            }
        })
            .success(function(data, status, headers, config) 
            {
                if (data.status == 'accepted') {
                    $scope.getUserInfo();
                }
                else{
                    alert ("Wrong username or password");
                }
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    // When loaded sets the default nav
    defaultNav();
});

application.controller('userController', function ($scope,$rootScope, $http)
// Controller of User.html
{
    $scope.Courses;
    $scope.newCourse = {};
    $scope.Content;
    $scope.newContent = {};
    /*
    *   Creates a course
    **/
    $scope.createCourse = function ()
    {
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo:  'create_course',
                username: $rootScope.User.username,
                title: $scope.newCourse.title,
                description: $scope.newCourse.description,
                difficulty: $scope.newCourse.difficulty
            }
        })
            .success(function(data, status, headers, config) 
            {
                Materialize.toast("Course created :D", 4000);
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    /*
    *  Gets the list of all the available courses
    **/
    $scope.getCourses = function ()
    {
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_user_courses',
                username: $rootScope.User.username
            }
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Courses = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    /*
    *  Gets the content of the specified coures
    **/
    $scope.getCourseContent = function (id_course)
    {
        if (isNaN(id_course)) {
            return;
        }
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_content',
                id: parseInt(id_course)
            }
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Content = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    /*
    *  Adds content to a selected course
    **/
    $scope.addContent = function (id_course)
    {
        if (isNaN(id_course)) {
            Materialize.toast('Create a course first!', 4000);
            return;
        }
        console.log(id_course);
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo:  'create_content',
                title: $scope.newContent.title,
                url: $scope.newContent.url,
                type: $scope.newContent.type,
                id_course: id_course
            }
        })
            .success(function(data, status, headers, config) 
            {
                Materialize.toast("Content created :D", 4000);
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    /*
    *   Deletes a content from the course
    **/
    $scope.deleteContent = function (id_content, id_course)
    {
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo:  'delete_content',
                id_content: id_content
            }
        })
            .success(function(data, status, headers, config) 
            {
                alert("Content deleted :c");
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
            
        $scope.getCourseContent(id_course);
    }
    $scope.getCourses();
});

application.controller('videosController', function ($scope, $rootScope, $http)
// Controller of Videos.html
{
    $scope.Content;
    /*
     *  Gets the list of all the available videos
     */
    $scope.getVideos = function ()
    {
        $scope.Content;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_content_of',
                type: 'video',
                id: $rootScope.currentCourseID
            }
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Content = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    $scope.getVideos();
});

application.controller('documentsController', function ($scope, $rootScope, $http)
// Controller of Documents.html
{
    $scope.Content;
    /*
     *  Gets the list of all the available documents
     */
    $scope.getDocuments = function ()
    {
        $scope.Content;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_content_of',
                type: 'document',
                id: $rootScope.currentCourseID
            }
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Content = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    $scope.getDocuments();
});

application.controller('exercisesController', function ($scope, $rootScope, $http)
// Controller of Exercises.html
{
    $scope.Content;
    /*
     *  Gets the list of all the available exercises
     */
    $scope.getExercises = function ()
    {
        $scope.Content;
        var url = "Backend/CrudParser.php";
        $http.get(url,
        {
            params: {
                todo: 'get_content_of',
                type: 'exercise',
                id: $rootScope.currentCourseID
            }
        })
            .success(function(data, status, headers, config) 
            {
                $scope.Content = data;
            })
            .error(function(data, status, headers, config)
            {
                alert("Cant connect to the server");
            });
    }
    
    $scope.getExercises();
});

    