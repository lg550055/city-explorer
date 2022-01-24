# City Explorer

**Author**: Polo Gonzalez
**Version**: 1.0.0 

## Overview
City Explorer provides a user with information on a city of interest.  Information includes map, latitude, longitude, weather forecast and movies related to the city.

## Getting Started
- Find dependencies on package.json (including React, react-bootstrap and axios)
- May use: npm build
- Then: npm start  to run

## Architecture
[High level whiteboard](./whiteboard.png)

Responsive application built with React, and react-bootstrap.  Separates into components each different request for information, for example the Weather component fetches and displays the weather forecast.

Uses axios package to fetch API latitude, longitude and map information from LocationIQ.  Uses static maps from LocationIQ to display map of the relevant city.

It also Uses axios to fetch API weather forecast and movie information from its sibling backend server (which in turn gets the information from other APIs).

## Change Log
- 1/17/2022 - MVP (latitude, longitude and map) + error handling
- 1/21/2122 - Weather forecast and movies features and fully deployed refactored into components

## Credit and Collaborations
- Ryan Gallaway - Instructor
- Riva Davidowski - TA

---

## Backend project

https://github.com/lg550055/city-explorer-api