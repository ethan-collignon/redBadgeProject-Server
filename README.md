#H1 Crag, Grub and Camp-Server (ElevenFifty RedBadge Final Project)

This project is the server side only for our final ElevenFifty Academy project. The larger grand project is designed to put most of everything we have learned in this course as well as introduce some smaller new concepts to incorporate into the project. 

My project idea is to create an application for rock climbers that can be used in conjunction with the popular Mountain Project app. MP is a user content created app and is the main tool climbers use to record specific climbs, get directions to those climbs and has very rough information surrounding climbing adjacent activities like lodging and food. 

With my project I am expanding on those adjacent items by creating a user content created app that records, reviews, rates and gives cost information to campsites and eateries near climbing areas. 

This file specifically builds the server in order to hold the user inputs into databases to store and use. This server was built with Node.js and Express framework. 

Building this file was fairly straight forward. As a class we have built a few different servers now all using these same frameworks. This project required us to build three different database tables that allowed full CRUD functionality and use Database Association to link them. 

We were also required to include token validation, password encryption and authentication. All of which were added using knowledge gained from this course. I used bycrpt, JSONWebToken dependencies and middleware to satisfy these requirements. 

One aspect that was needed to learn for this project was role based access controls. I implemented this by creating an Admin user that had the specific ability to delete users from the database. This part was new to me. I found a great resource online and it ended up being more simple that initial expected. There was a node install and some code added to the endpoints that restricted access without a admin token.

Overall this was a great way to polish all the backend skill I have learned so far while adding a few additional skills.