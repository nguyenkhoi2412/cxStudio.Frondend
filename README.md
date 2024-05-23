<ul><h2>Requirement install</h2>
<li>Install nodejs: <strong> >20x</strong> (20.13.0 currently)</li>
<li>Tool: <strong>Visual Studio Code</strong></li>
<li>Front-end: <strong>Reactjs</strong></li>
<li>Back-end: <strong>Nodejs</strong> (https://github.com/nguyenkhoi2412/beincom.backend.git)</li>
</ul>

<ul><h2>How to start website</h2>
<li>Install npm: <strong>npm install</strong></li>
<li>Run: <strong>npm start</strong></li>
<li>Run web local as: <strong>http://localhost:2001</strong>.</li>
<li>Currently, It set up run with port 2001 for Front-end, and 2009 for Back-end. If we have any change to other port, we can setup in <strong>webpack\webpack.development.js</strong> file.</li>
<li><strong>Note:</strong> <i>If you have any change to other port for Back-end, remember also change <strong>API_HOSTING</strong> in <strong>webpack\.env.development</strong> file.</i></li>
</ul>

<ul><h2>Tech Stack</h2>
<li>ReactJS: The user interface of the application will be built using ReactJS.</li>
<li>Redux: Redux is used to manage the application state. This will be particularly useful if the application state becomes complex.</li>
<li>Material-UI: These will be used for designing and styling the user interface. They provide pre-built components that can significantly speed up the development process.</li>
<li>Webpack: Manage files and packages</li>
<li>Reponsive support for small view</li>
<li>Data can encrypt on url, data json when need</li>
</ul>

<ul><h2>Components</h2>
<ol>
  <li type="1"><strong>Authentication</strong>
    <ul>
      <li>Clients will be able to sign in to their account <strong>using their email and password or external login (google).</strong></li>
      <li>New clients will be able to create an account <strong>by using username or external login (google).</strong></li>
      <li>Account saved by cookie during 6 hours <i>(Note: if you want to change this, you can change it at Back-end).</i></li>
      <li>Every request call API after login success must be authenticated by token.</li>
    </ul>
  </li>
  <li type="2"><strong>View Posts/Comments</strong>
    <ul>
      <li>Display all posts with pagination. <i>(I set up here for pageView: 5)</i></li>
      <li>Clients after login success who can leave comment on posts.</li>
    </ul>
  </li>
  <li type="3"><strong>Search and Filter</strong>
    <ul>
      <li>Global search allow users to search for posts by title or content. But you must enter 3 or more characters for the function to execute. If you clear box, it will call get all post again</i></li>
      <li>And all post after search will be sorted by created date (default), and accept filter with number of comments.</li>
    </ul>
  </li>
</ol>
</ul>
