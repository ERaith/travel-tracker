# Travel Tracker:

Travel tracker is a Javascript based app that allows either a client or admin to login and manage their upcoming trips! A user can pick from a variety of destinations provided by a heroku backend. The admin is then able to approve or delete trips based on their inclination. 

This Project works on utilizing async functions with await to fetch data from a heroku backend. 

## Screenshots:
![Login Screen](https://github.com/ERaith/travel-tracker/blob/master/Screen%20Shot%202020-03-04%20at%201.00.09%20AM.png)
![Client Panel](https://github.com/ERaith/travel-tracker/blob/master/Screen%20Shot%202020-03-04%20at%201.02.17%20AM.png)
![Admin Panel](https://github.com/ERaith/travel-tracker/blob/master/Screen%20Shot%202020-03-04%20at%201.02.54%20AM.png)



## Dependencies:

* bcrypt
* moment 
* jquery 
* js-datepicker


## Dev-Dependencies:
* chai
-> Library used for testing classes
```
npm install moment 
```
* chai-spies
-> Library extension used for testing localstorage and fetch
```
npm install moment 
```

## Future Thoughts
I expect that the near future a refactor to group the two table generators together would reduce the amount of redundent code. SASS refactoring is a must, currently mixins are used, however it is incomplete and leaves areas for refactoring. UUID should be incorporated instead of using a 4 digit randomizer for a industry standard approach.


