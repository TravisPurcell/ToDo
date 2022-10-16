# Todo List App

This Todo list app is a demo that utilizing one global database. A production build would utilize local databases for individual users. 

## Libraries

* SASS
* JQuery


## Fonts

Rubik 
* https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap


## Core Functionality

The functionality of this ToDo List App is built via HTML, PHP, SQL, AJAX and JQuery.  

## Controls

### Add task

Enter task into the 'Add new task*' input, then press enter in the field, or click or press enter on the 'Add task' button.

### Update tasks

After checking/unchecking tasks and/or updating task names, click or press enter on the 'Update tasks' button to reload and update the form.

### Uncheck all

Click or press enter on the 'Uncheck all' button to uncheck all checked tasks.

### Delete all

Click or press enter on the 'Delete all' button to delete all tasks. Users will be prompted with a confirmation dialog upon taking this action.


## Features

* Directly editable task names. Click or tab to the task name to edit. 
* All-in-one form update via the 'Update tasks' control. This allows users to check/uncheck and edit task names, then reload the page once to effect all the changes. 
* Uncheck all checked tasks at once via 'Uncheck all'.
* Delete all checked tasks at once via 'Uncheck all'.
* Theme toggle between blue and gold colors. 
* Download a CSV of current tasks with the data each one was added, in addition to each item's status of completion.
* Number of uncompleted tasks remaining is displayed at the bottom of the form.


## Accessibility

This app is fully navigable and controllable with either mouse or keyboard.


## Languages

### HTML

An HTML form is used to input. The default submission is disabled, as it is handled specifically via various controls. Each control calls specific PHP functions found in the /actions directory.

### PHP

PHP is used to communicate between the Front-End and Back-End. HTML form inputs are sent to the Database via prepared PHP SQL statements. 

### SQL

The SQL Database values are used to determine the number of elements, the attribues and the styling of the app. 
* Column 'ID' = Row Number.
* Column 'item' = Task item.
* Column 'status' = Whether the task is completd or not. A value of 1 = complete. A value of 0 = incomplete. 

### Ajax

Ajax is used to emit and receive data from the database, then reload the page to display the updated app.

### JQuery

JQuery is used to manipulate the DOM and effect styling and functionality based on database values. It is also used for Ajax. 