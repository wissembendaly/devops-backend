# Wath Near Backend

## Overview 

This is the backend for watch near. A plateform that centralizes cinema plannings on one website!

For the frontend please check [Watch Near Frontend](https://github.com/Saief1999/web-project-gl4-front)

## Technical Details


<div>
  <img width="30" src="https://docs.nestjs.com/assets/logo-small.svg">&nbsp
  <img width="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png">&nbsp
  <img width="40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/1280px-Tmdb.new.logo.svg.png">
</div>

The backend is built using **Nest.js**. We used [the Movie Database API](https://www.themoviedb.org/) to provide information about the different movies. Plannings and cinemas are saved on a **Mongo Database**

SonarQube is being used ( Within a github action ) to ensure code quality with each commit.

## Running the application 

To run the development server

```bash
npm run start:dev
```
