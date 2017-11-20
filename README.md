Membership System

This project is started with "Core UI" template.

Dummy data is present in "data" directory which has following 3 files:

1: userInfo.json 
	This file contains registed users with their usernames, passowrd, role, subscribed programs, etc.

2: subscriptions.json
	This file contains subscription programs with their effective area and cost.

3: offer.json
	This file contains offer with their name, valid subscription programs, benefit, etc.

NOTE:

-> As all data is read from dummy files, the changes made by any user will only modify the memory objects(subscriptions & offer releated objects) and will be persistant till tab is not refreshed.

-> Validations are not implemented in most of the forms.

ABOUT DIFFERENT USERS:

System has 3 types of users:

1: Member
	-> Get List of Subscription Programs
	-> Register for New Subscription Programs
	e.g dummy user 
		username-> abc
		password-> 123

2: Sales Person
	-> Create new subscription program
	-> Create Subscription Offers
	e.g dummy user 
		username-> xyz
		password-> 123

3: Service person
	-> Get Membership Report
	e.g dummy user 
		username-> pqr
		password-> 123


How to run the code?

1: Install dependencies
	Run command -> npm install

2: Host a hot build
	Run command -> npm start
	It will start hosting on http://localhost:9001/, as port 9001 is mentioned in webpack config.

3: Make production build
	Run command -> npm run build
	It will create build in "build" directory, now get inside build directory and host it.
		Run command -> http-server -p 9001 ./ 

	Now visit http://localhost:8080/



Tushar Sanap
tusharsanap7@gmail.com
