# BRESS-Admin-Webapp
This is the frontend for the BRESS webapplication.

# Team
- Bas Buijsen
- David van Mourik
- Frank Gabrsek
- Stefan de Nijs
- Qiang Loozen

# Project information
The goal of this application is to generate and manage tournaments for BRESS.
A list of names is provided for a certain category and the app should show the next games prioritized if needed.
Firstly it creates poules. The winners from these poules go to the finals. 
Depending on the size this could be quarter-finals, half-finals or the finale.
The scores are saved and can be viewed in the app.

# Technical information
This project is build using Angular 13
We use typescript in combination with html and scss to build the web application

# Data information
![erd of data](https://buijsen.net/BRESS/ERD-BRESS-v0.0.1.drawio.png)

# Git branch naming conventions
- ```<type> / <module> / <detailed_comment>```
- feat - actual feature implementation
- style - code style and code clean up
- test - actual test implementation
- fix - bug fix
- refactor - refactoring that doesn't affect the behavior of the code
- chore - no production code changes, but more like configuration and setup
- Example - ```feat/admin/dashboard```

# Ts coding conventions
- https://angular.io/guide/styleguide
- https://jsdoc.app/

# Definition of done
- Code written
- Documentation of the code
- Tests written
- Review from team
- Merged into development
