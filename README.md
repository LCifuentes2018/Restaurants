# Restaurant Reviews App

## How the Restaurant Reviews App Works
Initially the page loads a map with all the restaurants marked. The user can filter by neighborhood and type of cuisine.
Shows a list with the name and address of the restaurant and with the option to see details. In the details it shows a picture, the hours of attention and the reviews.

## Getting Started
Download the GitHub source code. Open the .css, js,images and html files with a text editor. To open the index.html file with any browser.

### Prerequisites

  - Any browser  It is supported by most web browsers including Chrome, Firefox, Safari, internet Explorer, Edge, Opera, etc.
  - Start up a HTTP server to serve up the site files on your local computer.(In this case Phyton),with your server running, check the       site: `http://localhost:8000`.
  - Text editor.
  
### Built With

This project uses the following concepts: 

* Service Workers.
* Accessibility features.
* Responsive Design

Technologies:
* CSS -  Cascading Style Sheets
* HTML - HyperText Markup Language 
* JavaScript - Object-Oriented Javascript.
* Mapbox

### It was taken into account

* Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information. 

*  Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write. 

### Development

The following functions were implemented:
```sh
On sw.js  and service_worker_register.js files
```
Cache the static site for offline use. Using Cache API and a ServiceWorker, cache the data for the website so that any page (including images) that has been visited is accessible offline.

License
----

Free Sofware




