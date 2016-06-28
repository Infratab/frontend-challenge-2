# Infratab Frontend Coding Challenge!

## Getting started
1. [Participate](#participate)
2. [Setup the project](#setup-the-project)
3. [Complete the Challenge!](#challenge)

### Participate
There are two ways to participate in our coding challenge -
- [By cloning this repo and using the Github Flow](#cloning-the-repo-use-the-github-flow)
- [By downloading the entire project directory as a compressed folder](#downloading-the-project-directory)

We would like you to follow the Github flow to participate in the coding challenge if you are familiar with Git and its ecosystem. However, in case you are not familiar with Git, please feel free to download the project directory and then complete the [Challenge](#challenge)

#### Cloning the repo (Use the Github flow)
1. Clone this repository
2. Follow the [Github Flow](https://guides.github.com/introduction/flow/)
3. Complete the requirements listed in the [Challenge](#challenge)
4. Open a pull request!

#### Downloading the project directory
1. Download this project direactory as a compressed folder (`frontend-challenge.zip`)
2. Complete the requirements listed in the [Challenge](#challenge)
3. Email the compressed folder to careers@infratab.in or to the person with whom you have been interacting!

### Setup the project
1. go to remind_me directory - `cd frontend-challenge-2/remind_me` 
2. run - `vagrant up`
3. run - `vagrant ssh`
4. Open http://localhost:3000/ in browser, if you see `Challenge accpted!` text in the browser that means server is successfully running
5. Please find `index.html` in the `remind_me/public` folder
6. Now you can start your coding!

#### Challenge
For this challenge, we provide you a server which provides you with the [following api endpoints]().

Your challenge is to implement the following design and fulfil the functional requirements listed below. You can implement the design using any library/frameworks you like or just good old plain html/css.

#### Functional requirement
##### 1. Signup, Login, Logout
      
##### 2. Show list of reminders
  Show the list of all reminders that were added with edit and remove buttons. Show completed reminders and active reminders as two different list.
  
##### 3. Add a reminder

  Add a reminder which accepts the date-time, message and phone_number.
  
  Both date-time and message are required fields but phone_number is not required field. If you provide the phone_number while adding the reminder then reminder will be sent as SMS to phone_number, if not it will send the mail to the signed in email.

##### 4. Edit reminder
  User can edit date-time, phone_number, message. Saving those changes will update the reminder, cancel will revert back the changes.User can edit completed reminders also. Editing reminder functionality should work for both active and completed reminders. As soon as user edits the date-time of completed reminder to upcoming date-time, that reminder should be moved to active list of reminders.
  
**NOTE:** For **Add** and **Edit** reminders, either add a validation such that user can select only upcoming date-time or show some error message.

##### 6. Remove reminder
 User can remove any reminder.
