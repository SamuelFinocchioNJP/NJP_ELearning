<?php
    header('Content-type: application/json');
    require_once('Database/Request.php');
    
    $fromDatabase = new Request();
    
    // If something was sent to the server
    if(isset($_GET['todo']))
    {
        /**
        *   Returns the content of a specified course
        */
        if($_GET['todo'] == 'get_content')
        {
            if(isset($_GET['id']))
                echo $fromDatabase->getContent($_GET['id']);
        }
        
        /**
        *   Returns all the courses
        */
        if($_GET['todo'] == 'get_courses')
        {
            echo $fromDatabase->getCourses();
        }
        
        /**
        *   Returns user's courses
        */
        if($_GET['todo'] == 'get_user_courses')
        {
            if(isset($_GET['username']))
            {
                echo $fromDatabase->getUserCourses($_GET['username']);
            }
        }
        
        /**
        *   Returns the content of a specified course
        */
        if($_GET['todo'] == 'get_content_of')
        {
            if(isset($_GET['id']) && isset($_GET['type']))
                echo $fromDatabase->getContentOf($_GET['type'], $_GET['id']);
        }
        
        /**
        *   Returns the result status of a login attempt
        */
        if($_GET['todo'] == 'login')
        {
            if(isset($_GET['username']) && isset($_GET['password']))
            {
                echo $fromDatabase->login($_GET['username'], $_GET['password']);
            }
        }
        
        /**
        *   Returns the result status of a login attempt
        */
        if($_GET['todo'] == 'get_user_info')
        {
            if(isset($_GET['username']) && isset($_GET['password']))
            {
                echo $fromDatabase->getUserInfo($_GET['username'], $_GET['password']);
            }
        }
        
        /**
        *   Sets a content to already benefited to a user
        */
        if($_GET['todo'] == 'set_viewed')
        {
            if(isset($_GET['username']) && isset($_GET['id']))
            {
                echo $fromDatabase->setViewed($_GET['username'], $_GET['id']);
            }
        }
        
        /**
        *   Sets a content to be owned to a user
        */
        if($_GET['todo'] == 'set_owner')
        {
            if(isset($_GET['username']) && isset($_GET['id']))
            {
                echo $fromDatabase->setOwner($_GET['username'], $_GET['id']);
            }
        }
        
        /**
        *   Deletes a content from the database
        */
        if($_GET['todo'] == 'delete_content')
        {
            if(isset($_GET['id_content']))
            {
                echo $fromDatabase->deleteContent($_GET['id_content']);
            }
        }
        
        /**
        *   Creates a Course
        */
        if($_GET['todo'] == 'create_course')
        {
            $id;
            if(isset($_GET['username']) && isset($_GET['title']) && isset($_GET['description']) && $_GET['difficulty'])
            {
                echo $fromDatabase->createCourse($_GET['username'], $_GET['title'], $_GET['description'], $_GET['difficulty']);
                
            }
        }
        
        /**
        *   Adds content to a Course
        */
        if($_GET['todo'] == 'create_content')
        {
            if(isset($_GET['title']) && isset($_GET['url']) && isset($_GET['type']) && $_GET['id_course'])
            {
                echo $fromDatabase->addContent ($_GET['title'], $_GET['url'], $_GET['type'], $_GET['id_course']);
            }
        }
        
        /**
        *   
        */
    }
?>