# iCinema

A full-stack MERN website for movie theaters that allows users to browse for films and filter them by available categories and ratings, as well as enables administrators to add new films to the list.
<img width="1438" alt="ss" src="https://user-images.githubusercontent.com/25881325/67157291-7e05dc00-f32a-11e9-8d0e-00e6ecda5b7d.png">

<h2>Installation</h2>
Use the package manager [npm](https://www.npmjs.com/) to install iCinema.

Fork the Project by using:

```bash
git clone https://github.com/orifmilod/iCinema.git
```

then cd into the project by using:

```
cd iCinema
```

Now, Install the packages by running:

```bash
npm run setup
```

Run project with command

```bash
npm run dev
```

<h2> Built with  </h2>
<ul>
  <li>FrontEnd: <b> React.JS, Redux Library, Bootstrap, HTML/CSS </b></li>
  <li>Backend:  <b> Node.JS, Express.JS </b> </li>
  <li>Database: <b> MongoDB, Mongoose </b> </li>
</ul>

<h2> Features </h2>
<ul>
  <li> Sign In / Sign Up / Sign Out the user. </li>
  <li> Recieving a welcoming email when sign-up using Nodemailer. </li>
  <li> Add a new movie to the list.</li>
</ul>

<h2> API </h2>

<h4> Users </h4>
<ul>
  <li> <b>POST</b> /api/auth/signUp </li>
  <li> <b>POST</b>  /api/auth/signIn  </li>

   <li> <b>PATCH</b>  /api/users/:userId  </li>
  <li> <b>DELETE</b>  /api/users/:userId </li>
</ul>

<h4> Movies </h4>
<ul>
  <li> <b>GET</b> /api/movies</li>
  <li> <b>GET</b> /api/movies/:movieId</li>
  <li> <b>POST</b> /api/movies/addMovie</li>
  <li> <b>PATCH</b> /api/movies/:movieId</li>
</ul>

<h4> Genres </h4>
<ul>
  <li> <b>GET</b> /api/genres </li>
</ul>
