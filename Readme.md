<h1>MoviePedia 🎬</h1>

<p><strong>MoviePedia</strong> is a full-stack movie catalog web application where users can explore and search for movies by title or description. Regular users can view movie details, while <strong>admins</strong> can <strong>upload</strong>, <strong>edit</strong>, or <strong>delete movies</strong>. The app features a React frontend (Vite) and a Node.js + Express backend with MongoDB.</p>

<h2>Features</h2>
<ul>
    <li>Browse movies with details (title, description, poster, etc.)</li>
    <li>Search movies by title or description</li>
    <li>Role-based access control:
        <ul>
            <li><strong>Users:</strong> View and search movies</li>
            <li><strong>Admins:</strong> Upload, edit, and delete movies</li>
        </ul>
    </li>
    <li>JWT-based authentication</li>
    <li>Cloudinary integration for movie poster uploads</li>
    <li>Concurrent frontend and backend development setup</li>
</ul>

<h2>Project Setup</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/SankalpPimpalkar/MoviePedia.git
cd moviepedia</code></pre>

<h3>2. Configure Environment Variables</h3>
<p>Rename <code>.env.sample</code> to <code>.env</code> in both <strong>backend</strong> and <strong>client</strong> folders.</p>

<h4>Backend <code>.env</code></h4>
<pre><code>NODE_ENV = "development"
PORT = 3000
DB_URL = "&lt;Your Database URL&gt;"
CLIENT_URL = "http://localhost:5173"
JWT_SECRET = "JWT_SECRET"

CLOUDINARY_CLOUDNAME = "&lt;Your Cloudinary Cloud Name&gt;"
CLOUDINARY_API_KEY = "&lt;Your Cloudinary API Key&gt;"
CLOUDINARY_API_SECRET = "&lt;Your Cloudinary API Secret&gt;"</code></pre>

<h4>Client <code>.env</code></h4>
<pre><code>VITE_SERVER_URL = "http://localhost:3000/api"</code></pre>

<h3>3. Install Dependencies & Build</h3>
<pre><code>npm run build</code></pre>
<p>This will install backend & client dependencies and build the Vite client.</p>

<h3>4. Running the Project</h3>
<h4>Development Mode</h4>
<pre><code>npm run dev</code></pre>
<p>Backend: <code>http://localhost:3000</code><br>
Client: <code>http://localhost:5173</code></p>

<h4>Production Mode</h4>
<pre><code>npm run build
npm run start</code></pre>
<p>Access the app at <code>http://localhost:3000</code>. Backend serves React client as fallback route.</p>

<h3>5. Fallback Route in Production</h3>
<pre><code>if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("/{*any}", (req, res) => {
        return res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
    });
}</code></pre>

<h2>API Routes</h2>

<h3>Movie Routes (<code>/api/movies</code>)</h3>
<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Description</th>
        <th>Access</th>
    </tr>
    <tr><td>GET</td><td>/</td><td>Get all movies</td><td>Public</td></tr>
    <tr><td>GET</td><td>/search</td><td>Search movies by title or description</td><td>Public</td></tr>
    <tr><td>GET</td><td>/:id</td><td>Get movie by ID</td><td>Public</td></tr>
    <tr><td>POST</td><td>/</td><td>Create a new movie</td><td>Admin</td></tr>
    <tr><td>PUT</td><td>/:id</td><td>Update a movie by ID</td><td>Admin</td></tr>
    <tr><td>DELETE</td><td>/:id</td><td>Delete a movie by ID</td><td>Admin</td></tr>
</table>

<h3>User Routes (<code>/api/users</code>)</h3>
<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Description</th>
        <th>Access</th>
    </tr>
    <tr><td>POST</td><td>/register</td><td>Register a new user</td><td>Public</td></tr>
    <tr><td>POST</td><td>/login</td><td>Login user</td><td>Public</td></tr>
    <tr><td>GET</td><td>/me</td><td>Get logged-in user details</td><td>Authenticated</td></tr>
    <tr><td>POST</td><td>/logout</td><td>Logout user</td><td>Authenticated</td></tr>
</table>

<h3>System Route</h3>
<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Description</th>
        <th>Access</th>
    </tr>
    <tr><td>GET</td><td>/api/system</td><td>Check if system is running</td><td>Public</td></tr>
</table>

<h2>Tech Stack</h2>
<ul>
    <li><strong>Frontend:</strong> React, Vite, Tailwind CSS, MUI, Axios, React Router</li>
    <li><strong>Backend:</strong> Node.js, Express.js, JWT Authentication</li>
    <li><strong>Database:</strong> MongoDB</li>
    <li><strong>File Storage:</strong> Cloudinary</li>
</ul>

</body>
</html>
