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

Your challenge is to implement the following designs given in the below section and fulfil the functional requirements listed below. You can implement the design using any library/frameworks you like or just good old plain html/css.

#### Functional requirement
##### 1. Signup, Login, Logout

On signup or login you will get the token as a response, store the token in the browser. Based on the token stored decide whether to show login or home page.

**NOTE:** All the [API's](https://github.com/Infratab/frontend-challenge-2/blob/master/API.md#reminder-apis) are authenticated.
      
##### 2. Show list of reminders
  Show the list of reminders as shown in the below image.
  
<img width="700" alt="mockup-1" src="https://cloud.githubusercontent.com/assets/12729226/16512744/5d770dfc-3f7c-11e6-9eb0-836587a74204.png">
  
##### 3. Add a reminder

  Add a reminder which accepts the date-time, message and phone_number.
  
  Both date-time and message are required fields but phone number is an optional field. If you provide the phone number while adding the reminder then reminder will be sent as SMS to phone number, if not it will send the mail to the signed in email.

##### 4. Edit reminder
  User can edit date-time, phone_number, message of `Upcoming reminders`.
  
  <img width="700" alt="mockup-3 edit upcoming reminder" src="https://cloud.githubusercontent.com/assets/12729226/16512749/6f32095c-3f7c-11e6-9a51-9ab788516a5d.png">

  User can repeat any reminder by clicking on `Remind again` button. On click of `Remind again` button, that reminder details has to be filled in `Add reminder` section, So that user can add that reminder again.


##### 6. Remove reminder
 User can remove any reminder.
