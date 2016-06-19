<?php
    /**
     *  class Info
     *  @author Samuel Finocchio
     *  @access public
     *  Defines the database data
     */
    class Info
    {
        public static $address = 'localhost';
        public static $username = 'root';
        public static $password = '';
        public static $name = 'elearning';
        public static $port = 3306;
    }

    /**
     *  class Connection
     *  @author Samuel Finocchio
     *  @access public
     *  Defines and serves the connection to the mysql database
     */
    class Connection
    {
        private $mysqliConnection;
        public $empty;
        public function __construct()
        {
            $this->mysqliConnection = new mysqli(Info::$address, Info::$username, Info::$password, Info::$name);
            $this->empty = array('result' => 'empty');
            
            if($this->mysqliConnection->connect_error)
                die("Can not connect to " . Info::$name);
            $empty = array('Error' => 'Empty set');
        }

        public function singleRowQuery($query)
        {
            $resultSet = $this->mysqliConnection->query($query) or die('Error');
            if(is_object($resultSet))
            {
                return $resultSet->fetch_assoc();
            }
            return $this->empty;
        }
        
        public function executeQuery($query)
        {
            $notEmpty = false;
            $multipleSet = array();
            $resultSet = $this->mysqliConnection->query($query) or die('Error');
            if(is_object($resultSet))
            {
                while($row = $resultSet->fetch_assoc())
                {
                    array_push($multipleSet, $row);
                    $notEmpty = true;
                }
                if($notEmpty)
                    return $multipleSet;
            }
            return $this->empty;
        }
        
        public function getIDQuery($query)
        {
            $resultSet = $this->mysqliConnection->query($query) or die('Error');
            return $this->mysqliConnection->insert_id;
        }
    }

?>