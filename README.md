Project Name
================================
Plan an itinerary for your next holiday, update it with pictures and thoughts when you return, and easily publish it as a blogpost.

Live site: https://bucket--list.herokuapp.com/

Front-end: https://github.com/yangtheng/project-4-react

Back-end: https://github.com/DominikPhua/project-4-backend


Features
================================
* Users are able to create an itinerary of their own and add activities and photos to it as they go through their trip.

* Users can add or remove days / activities and photos from their itinerary.

* Users are able to publish / make private their itineraries through toggle buttons.

* When an itinerary is published, it gets converted into a blog post.

* Users are able to browse published travel posts from other users.

* Users are able to clone itineraries of travel posts that they like.

Wireframes / ERD
================================

Overview of Interaction Between Front-end Application and Back-end API

![Backend API](./public/pictures/back_api.jpg?raw=true "Optional Title")

ERD

![ERD](./public/pictures/erd.jpg?raw=true "Optional Title")

Wireframe

![Wireframe 1](./public/pictures/wireframe_1.jpg?raw=true "Optional Title")

![Wireframe 2](./public/pictures/wireframe_2.jpg?raw=true "Optional Title")

Querying the API
================================
The backend API is separated into authenticable and non-authenticable endpoints.
Viewing of published posts with get requests are the only endpoints which do not require authentication.
All other API requests will require authentication in the form of a JWT in the request header.

API endpoints:

![API Endpoints](./public/pictures/api_endpoint.jpg?raw=true "Optional Title")

Our backend API requires requests to take the following form:

For registering a new user, send a post request in json format to

`https://project-4-backend.herokuapp.com/users.json`

Doorkeeper handles authorizations and authentications in the backend and it accepts a JSON request body of the following format:

```
{
  user: {
    name: <name of user>,
    email: <email address>,
    password: <password>,
    password_confirmation: <password>
  }
}
```
Upon successful creation of a user, logging in requires a POST request to `https://project-4-backend.herokuapp.com/oauth/token`

```
{
  grant_type: "password",
  email: <email>,
  password: <password>
}
```

Upon successful login, the API will respond with a JSON containing the JSON Web Token.

Subsequent calls to authenticable endpoints require
```
{
  method: 'GET/POST/PATCH/DELETE',
  headers: {
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + <token string>
  },
  body: JSON.stringify({
      <model>_id: <user/itinerary/activity/photo id>
      data: {
        <key>: <value>
      }

    })
})
```
and will return a JSON object containing requested itineraries/activities/photos depending on the endpoint called.

Integrating Cloudinary
================================

Images can be added to activities by first POST request to Cloudinary using the superagent gem with its attach function.

```
let uploadRequest = superagent.post(url)
uploadRequest.attach('file', image)

// Where URL is the assigned URL for the account
```

Upon successful upload to the Cloudinary server, the URL of the uploaded photo is returned, and we use the returned information to set it into an assigned state on our front-end application.

The URL is then saved to the backend API whenever a POST request is made to our backend API.

With Cloudinary's functions, when we make any GET request to retrieve the image URL, we manipulate the URL to return the photo of a specific size to fit the unique needs of different pages.

Bugs / Improvements
================================
* Google Places for actual location finding (Right now it is a text field)

* While browsing the travel posts of other users, adding a feature that allows users to save particular activities they like

* User responsive drag and drop function to allow rearranging of activities and days

* A view count for blog posts and filtering of the browse page to allow more popular posts to appear first

* A Google Map feature that shows all locations visited during a trip

* Allow users have control over the resulting layout of the published post. Allow resizing/repositioning of images

Built With
================================
* Front-end rendering with React, Bootstrap

* Image upload with Cloudinary

* Token based authentication with Doorkeeper

* Back-end API with Ruby on Rails

* API testing with Postman

* UX enhancements with the following npm modules:
    * react-scroll -> for smooth-scrolling on view blog page
    * react-spinner -> for displaying a spinner as pages load
    * react-router -> for front-end routes and redirects

Team
================================
Dominic Phua - https://github.com/DominikPhua

Rebecca Tay - https://github.com/rebeccatay92

Yang Theng Ng - https://github.com/yangtheng

Acknowledgements
================================
All hail Prima and Shimei
