# Readables - A Web Blog

**Readables** shows how we can implement a simple blog application using a server API with **React** and **Redux**. As stated in Udacity's project description, the application is anynomous meaning that there are no user instances (therefore no sessions of any kind).

A user can create posts in one of the predefined category, add comments to a specific post and rate any comments or posts. Any user can change or delete comments or posts.

## Getting Started

#### Browser Requirements ####
Please get the latest version of **Google Chrome**, **Safari**, or **Firefox**.

#### Required Libraries ####
These dependencies are required by the application. Please make sure you have **Node** installed in your machine, otherwise please do so before doing anything else. For more information on how to install node, please see **"How do I Install the Application?"** section. These dependencies are already included in package.json, so installation steps required to install them are minimal.

The application has two parts:  a backend api, which provides all the initial data and acts as the database which contains the following packages:

1. **body-parser**
2. **cors**
3. **dotenv**
4. **express**
5. **clone**
6. **react-fontawesome**

And a frontend, which is the part we are mainly concerned with in this
application, containing the following packages:

1. **react**
2. **react-dom**
3. **react-redux**
4. **redux**
5. **react-fontawesome**
6. **react-modal**
7. **react-validation**


#### How do I Install the Application? ####
**Install Node**
This application uses NPM, therefore it is required that you install it Node.js in your local machine. Please go [here](https://nodejs.org/en/download/) and download the installer for your OS. NPM is included with Node, so when you install Node you will get NPM automatically.

**Clone This Repository/Download Resources**
Make a clone of this repository in your local machine using your terminal/shell/bash/command prompt.

**Install Dependencies**
After cloning a copy in your machine,  you will have to `cd` to "api-server" directory of the application (In this case **reactn-project-readable/api-server**/) and type the command  `npm install`. This will install all the required librarires for our backend.

After all packages are installed, `cd` back to the root directory and then into the "frontend" directory. Again, run the `npm install` command and this will install the required frontend libraries.

We are now set.

** **
### How do I Run The Application? ###

Our application is built using the create-react-app build tool, which includes the create-react npm package. This package allows us to run a development server, which comes handy when testing/developing. A backend server is also provided so that we can use persistent data, and inject some initial data into our application.

To run our application, we have to run two seperate commands:

one on  **reactn-project-readable/api-server/**
and another one **reactn-project-readable/frontend/**.

`cd` to **reactn-project-readable/api-server/** and type the following from your terminal/bash/shell/command prompt: `node server`. This will start our back-end server at port 3001.

`cd` back to our root folder **reactn-project-readable/** and then into **reactn-project-readable/frontend**. Type the following from your terminal/bash/shell/ command promps: `npm run start`. A development web server should be launched at **port 3000**, therefore to access the application you should type in the following URL in your browser:

http://localhost:3000/

This should take you to the initial page of the application.
** **
### How Do I Use This Application? ###
Your initial page is your category view. In here you will have two widgets,
a category widget and a posts widget. Use the category widget by clicking on one of the links contained, and the posts widget will only show posts related to that category. On the top of your posts widget, you also have a control which lets you sort your current displayed posts by one of two criteria: date or score. Choose whichever criteria you see fit, and hit the sort button to sort your posts accordingly. To increase/decrease the score of a post, you can use the thumbs up/down buttons located on the right side of each post. Each post also has its respective button/link for deleting/editing that post. Hitting the delete button will remove the post form our backend and  synchronize our frontend.

The edit button will take you to the edit post view, which will show a form loaded with the post data. To edit it, simply change any of the fields and hit the submit button.

To create a new post, simply hit the "add new" button in the category view, which will take you to the new post view (containing an empty form with required fields). Hitting submit will create the new post and take you back to the category view page.

To go to the post detail page, simply click on the post title in the posts widget in category view. In here you will see all the information about the post along with comments. You can create new comments by clicking the "comment" button. you can edit a comment by click the edit button on the respective comment, represented by a boxed pencil. The delete button is right next the edit button, which will delete the comment silently. Like, edit, and delete post options are also shown in the post detail view.


