/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`server started ${port}`);
