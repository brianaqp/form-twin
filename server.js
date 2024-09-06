import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
// Auth
import auth0 from 'express-openid-connect';
// Directory
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

// Path
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


// Variables
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(morgan('dev'));


app.use(
  auth0.auth({
    // Only for required routes
    idpLogout: true,
  })
);

// Anyone can access the homepage
app.use('/', express.static(path.join(__dirname, 'dist', 'browser')));


app.listen(PORT, (req, res) => {
  console.log(`Listening at: http://localhost:${PORT}`)
})