# iCinema
A website for movie theatres where user can search for movies and filter by rating and genres that are available,
and admin can add movie to the list and much more.

<small>This project will be completed and hosted very soon! </small>

<h2>Installation </h2>

Use the package manager [npm](https://www.npmjs.com/) to install iCinema.
 Run project with command
```bash
npm run dev
```
 
<h2> Built with  </h2>
<ul>
  <li>FrontEnd: <b> Node.JS, Express.JS </b> </li>
  <li>Backend:  <b> React.JS, Redux Library, Bootstrap, HTML/CSS</b> </li>
  <li>Database: <b> MongoDB</b> </li>
</ul>

<h2> Features </h2>
<ul>
  <li> Sign In / Sign Up / Sign Out the user. </li>
  <li> Add a new movie.</li>
  <li> Favorite or like a movie and save it in your list of favourites. </li>
</ul>



<h2> API </h2>
<h4> Users </h4>
<ul>
  <li> <b>POST</b> /api/users/signup </li>
  <li> <b>POST</b>  /api/users/login  </li>
  <li> <b>DELETE</b>  /api/users/delete </li>
</ul>

<h4> Movies </h4>
<ul>
  <li> <b>GET</b> /api/movies </li>
  <li> <b>POST</b> /api/movies/addmovie </li>
  <li> <b>DELETE</b> /api/movies/:movieID </li>
</ul>

<h4> Genres </h4>
<ul>
  <li> <b>GET</b> /api/genres </li>
  <li> <b>POST</b> /api/genres/addgenre </li>
  <li> <b>DELETE</b> /api/movies/:genreID </li>
</ul>
