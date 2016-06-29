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
2. Install virtualbox and vagrant
3. run - `vagrant up`
4. run - `vagrant ssh`
5. Open http://localhost:3000/ in browser, if you see `Challenge accepted!` text in the browser that means server is successfully running
6. Please find `index.html` in the `remind_me/public` folder
7. Now you can start your coding!

#### Challenge
For this challenge, we provide you a server which provides you with the [following api endpoints](https://github.com/Infratab/frontend-challenge-2/blob/master/API.md).

Your challenge is to implement the following design and fulfil the functional requirements listed below. You can implement the design using any library/frameworks you like or just good old plain html/css.

#### Functional requirement
##### 1. Signup, Login, Logout

Store the token in the browser (where you get the token when you login/ signup). Based on the token stored decide whether to show login or home page.

Once user is logged in, Show the page as given in the above image (//need to upload the image).

**NOTE:** All the API's are authenticated.
      
##### 2. Show list of reminders
  Show the list of all reminders that were added with edit and remove buttons. Show completed reminders and upcoming reminders as two different list.
  
  <img width="512" alt="mockup-1" src="https://cloud.githubusercontent.com/assets/12729226/16449672/6a166696-3e16-11e6-98d4-2ea54aa92588.png">
  
##### 3. Add a reminder

  Add a reminder which accepts the date-time, message and phone_number.
  
  Both date-time and message are required fields but phone number is not required field. If you provide the phone number while adding the reminder then reminder will be sent as SMS to phone number, if not it will send the mail to the signed in email.

##### 4. Edit reminder
  User can edit date-time, phone_number, message. Saving those changes will update the reminder, cancel will revert back the changes.
  
  <img width="512" alt="mockup-3 edit upcoming reminder" src="https://cloud.githubusercontent.com/assets/12729226/16449680/7b936130-3e16-11e6-80e5-d935150b6761.png">
  
  User can edit completed reminders also. Editing reminder functionality should work for both active and completed reminders. As soon as user edits the date-time of completed reminder to upcoming date-time, that reminder should be moved to active list of reminders.
  
  <img width="512" alt="mockup-4 edit compeletd reminder" src="https://cloud.githubusercontent.com/assets/12729226/16449701/998bfa58-3e16-11e6-9a98-e24fd3942098.png">


##### 6. Remove reminder
 User can remove any reminder.
