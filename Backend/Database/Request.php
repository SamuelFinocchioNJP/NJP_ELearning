<?php
    require_once("Connection.php");
    // Defines the server to be sending JSON encoded responce
    
    /**
     *  class Request
     *  @author Samuel Finocchio
     *  @access public
     *  Returns JSON of a specified query
     */
    class Request
    {
        private $dbConnection;
        
        function __construct() {
            $this->dbConnection = new Connection();
        }
        
        // Registers a user
        public function register ($username, $name, $surname, $email, $password)
        {
            $password = sha1($password);
            return json_encode($this->dbConnection->singleRowQuery
            ("
                INSERT INTO User
                    (username, name, surname, email, password) 
                    VALUES
                    ($username, $name, $surname, $email, $password);
            "));
        }
        
        // Checks if the user login is correct
        public function login ($username, $password)
        {
            if($this->getUserInfo($username, $password) == json_encode($this->dbConnection->empty))
                return json_encode(array("status" => "refused"));
            return json_encode(array("status" => "accepted"));
        }
        
        // Gets the login data of a user
        public function getUserInfo ($username, $password)
        {
            $password = sha1($password);
            $result = $this->dbConnection->singleRowQuery
            ("
                SELECT username, name, surname, email, password
                    FROM User
                    WHERE username = '$username' AND password = '$password' 
            ");
            
            return json_encode($result);
        }
        
        // Retrives all the content of a specified course
        public function getContent ($id_course)
        {
            // global $dbConnection;
            return json_encode($this->dbConnection->executeQuery
            ("
                SELECT Content.id_content,Content.title, Content.url, Content.type 
                    FROM Content 
                        INNER JOIN Has ON Content.id_content = Has.id_content 
                        INNER JOIN Course ON Course.id_course = Has.id_course 
                        WHERE Course.id_course = $id_course
            "), JSON_UNESCAPED_SLASHES);
        }
        
        // Retrives the content of a certain type of a specified course
        public function getContentOf ($type, $id_course)
        {
            return json_encode($this->dbConnection->executeQuery
            ("
                SELECT Content.id_content,Content.title, Content.url, Content.type
                    FROM Content
                        INNER JOIN Has ON Content.id_content = Has.id_content
                        INNER JOIN Course ON Course.id_course = Has.id_course
                        WHERE Course.id_course = $id_course AND Content.type = '$type'
            "), JSON_UNESCAPED_SLASHES);
        }
        
        // Sets a particular content to viewed relative to a user
        public function setViewed ($username, $id_content)
        {
            return json_encode($this->dbConnection->executeQuery
            ("
                INSERT INTO Attended (username, id_content) VALUES ('$username', $id_content)
            "));
        }
        
        // Sets a particular content to viewed relative to a user
        public function setOwner ($username, $id_owner)
        {
            return json_encode($this->dbConnection->singleRowQuery
            ("
                INSERT INTO Own (username, id_course) 
                    VALUES ('$username', $id_owner)
            "));
        }
        
        // Adds a course to the database
        public function createCourse ($username, $title, $description, $difficulty)
        {
            $id_course = $this->dbConnection->getIDQuery
            ("
                INSERT INTO Course (username, title, description, difficulty) 
                    VALUES ('$username', '$title', '$description', '$difficulty')
            ");
            
            return json_encode($this->dbConnection->singleRowQuery
            ("
                INSERT INTO Own (username, id_course) 
                    VALUES ('$username', $id_course);
            "));
        }
        
        // Shows all the available courses
        public function getCourses ()
        {
            return json_encode($this->dbConnection->executeQuery
            ("
                SELECT id_course, title, description, difficulty, username FROM Course;
            "));
        }
        
        // Shows all the courses created by a specific User
        public function getUserCourses ($username)
        {
            return json_encode($this->dbConnection->executeQuery
            ("
                SELECT id_course, title, description, difficulty, username FROM Course
                    WHERE username = '$username';
            "));
        }
        
        // Deletes a content from the database
        public function deleteContent ($id_content)
        {
            return json_encode($this->dbConnection->singleRowQuery
            ("
                DELETE FROM Content WHERE id_content = $id_content
            "));
        }
        
        // Adds a content
        public function addContent ($title, $url, $type, $id_course)
        {
            $id_content = $this->dbConnection->getIDQuery
            ("
                INSERT INTO Content (title, url, type)
                    VALUES ('$title', '$url', '$type')
            ");
            
            return $this->relateContent($id_content, $id_course);
        }
        
        // Relates a content to a specific course
        public function relateContent ($id_content, $id_course)
        {
            return json_encode($this->dbConnection->singleRowQuery
            ("
                INSERT INTO Has (id_content, id_course)
                    VALUES ($id_content, $id_course)
            "));
        }
    }
?>
