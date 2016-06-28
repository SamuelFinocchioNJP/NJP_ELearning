CREATE DATABASE IF NOT EXISTS elearning;
USE elearning;

CREATE TABLE IF NOT EXISTS User (
    username varchar (60) PRIMARY KEY,
    name varchar (60) NOT NULL,
    surname varchar (60) NOT NULL,
    email varchar (255) NOT NULL,
    password char (40) NOT NULL    
);

CREATE TABLE IF NOT EXISTS Course (
    id_course INT PRIMARY KEY AUTO_INCREMENT,
    username varchar (60),  FOREIGN KEY (username) REFERENCES User(username),
    title varchar (45) NOT NULL,
    description varchar (400) NOT NULL,
    difficulty enum ('Beginner', 'Intermediate', 'Advanced')
);

CREATE TABLE IF NOT EXISTS Content (
    id_content INT PRIMARY KEY AUTO_INCREMENT,
    title varchar (45) NOT NULL,
    url varchar (400) NOT NULL,
    type enum ('video', 'document', 'exercise') NOT NULL
);

CREATE TABLE IF NOT EXISTS Has (
    id_course INT, FOREIGN KEY (id_course) REFERENCES Course(id_course) ON DELETE CASCADE,
    id_content INT, FOREIGN KEY (id_content) REFERENCES Content(id_content) ON DELETE CASCADE,
    CONSTRAINT UNIQUE (id_course, id_content)
);

CREATE TABLE IF NOT EXISTS Attended (
    username varchar (60), FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE, 
    id_content INT, FOREIGN KEY (id_content) REFERENCES Content(id_content) ON DELETE CASCADE,
    CONSTRAINT UNIQUE (username, id_content)
);

CREATE TABLE IF NOT EXISTS Own (
    username varchar (60), FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    id_course INT, FOREIGN KEY (id_course) REFERENCES Course(id_course) ON DELETE CASCADE,
    CONSTRAINT UNIQUE (username, id_course)
);

-- Registration
INSERT INTO User (username, name, surname, email, password)
    VALUES ('Username', 'name', 'surname', 'email@example.com', 'b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3');

-- Getting content of a course
SELECT Content.id_content,Content.title, Content.url, Content.type 
        FROM Content 
            INNER JOIN Has ON Content.id_content = Has.id_content 
            INNER JOIN Course ON Course.id_course = Has.id_course 
            WHERE Course.id_course = $id_course;

-- Getting content of a course with a specified content type
SELECT Content.id_content,Content.title, Content.url, Content.type
    FROM Content
    INNER JOIN Has ON Content.id_content = Has.id_content
    INNER JOIN Course ON Course.id_course = Has.id_course
    AND Course.id_course = 1
    AND Content.type = 'video';

-- Login with user informations
SELECT username, name, surname, email, password
    FROM User
    WHERE username = '$username' AND password = '$password';
                    
-- Set viewed
INSERT INTO Attended (username, id_content)
    VALUES ('$username', $id_content);
    
-- Set owner
INSERT INTO Own (username, id_course) 
    VALUES ('$username', $id_owner);
    
-- Add course
INSERT INTO Course (username, title, description, difficulty) 
    VALUES ('$username', '$title', '$description', '$difficulty')
    
-- Get courses
SELECT id_course, title, description, difficulty, username
    FROM Course;
                
-- Get user courses
SELECT id_course, title, description, difficulty, username FROM Course
    WHERE username = '$username';
    
-- Delete content
DELETE FROM Content
    WHERE id_content = $id_content;
    
-- Create content
INSERT INTO Content (title, url, type)
    VALUES ('$title', '$url', '$type');
    
-- Relates content
INSERT INTO Has (id_content, id_course)
    VALUES ($id_content, $id_course);
