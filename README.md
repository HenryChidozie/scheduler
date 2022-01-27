# Interview Scheduler

Interview Scheduler is what its name suggests: a simple interview appointment scheduling tool. It is a demonstration of responsive, single-page web app design using React that is suitable for use on any device. It does not include user account management, but stores schedule information in a database and updates the schedule for concurrent users via WebSockets.

Technologies used include [React](https://reactjs.org), [SASS](https://sass-lang.com), [WebPack](https://webpack.js.org), [Babel](https://babeljs.io), [Axios](https://npmjs.com/package/axios) client-side, [Node.js](https://nodejs.org), [Express](https://expressjs.com), [Postgres](https://postgresql.org) server-side, and [Storybook](https://storybook.js.org), [Testing Library](https://testing-library.com), [WebPack Dev Server](https://github.com/webpack/webpack-dev-server), [Jest](https://jestjs.io), and [Cypress](https://cypress.io) for development and testing.

Interview Scheduler is not suitable for real-world production use and is only for demonstration and educational purposes.

## Screenshots

Add New Appointment:

!["Add New Appointment"](/public/images/add_new.png)

Booked Appointments:

!["Booked Appointments"](/public/images/booked.png)

Editing an Appointment:

!["Editing an Appointment"](/public/images/edit_app.png)

Cancelling an Appointment:

!["Cancelling an Appointment"](/public/images/cancel.png)

## Table of Contents
* [Development](https://github.com/HenryChidozie/scheduler#develpment)
  * [Directory Structure](https://github.com/HenryChidozie/scheduler#directory-structure)
  * [Dependencies](https://github.com/HenryChidozie/scheduler#dependencies)
  * [Development Dependencies](https://github.com/henrychidozie/scheduler#develpment)
  * [Support Setup](https://github.com/henrychidozie/scheduler#develpment)
  * [Database/API Server Setup](https://github.com/henrychidozie/scheduler#develpment)
  * [Client Setup](https://github.com/henrychidozie/scheduler#develpment)
  * [Running Webpack Development Server](https://github.com/henrychidozie/scheduler#develpment)
  * [Running Storybook Visual Testbed](https://github.com/henrychidozie/scheduler#develpment)

* [Testing](https://github.com/henrychidozie/scheduler#testing)
  * [Database Setup](https://github.com/henrychidozie/scheduler#develpment)
  * [API Server Setup](https://github.com/henrychidozie/scheduler#develpment)
  * [Client Setup](https://github.com/henrychidozie/scheduler#develpment)
  * [Running Jest Test Framework](https://github.com/henrychidozie/scheduler#develpment)
  * [Running Cypress Test Framework](https://github.com/henrychidozie/scheduler#develpment)


### Development

#### Directory Structure
The project directory is arranged as follows:
```
./                 Main project repository
./docs             Project documentation
./public           Static files served to the client, including manifest.json
./public/images    Static images used on the site
./src              Project source code
./src/__mocks__    Axios mocks
./src/components   React components
./src/hooks        React hooks
./src/helpers      Helper functions
./src/styles       SASS styles
./cypress          Cypress testing fixtures and tests, etc
./stories          Storybook component stories

Do not edit or push to repo:

./node_modules     Node.js packages
./coverage         Jest code coverage results
```

#### Dependencies
Interview Scheduler requires [Node.js](https://nodejs.org) and [Postgres](https://postgresql.org) and the following [NPM](https://npmjs.com) packages are used:

* [React](https://reactjs.org)
* [React-DOM](https://npmjs.com/package/react-dom)
* [React Scripts](https://npmjs.com/package/react-scripts)
* [Axios](https://npmjs.com/package/axios)
* [Classnames](https://npmjs.com/package/classnames)
* [Normalize.css](https://npmjs.com/package/normalize.css)

#### Development Dependencies
The following NPM packages are used for development:

* [React Test Renderer](https://npmjs.com/package/react-test-renderer)
* [Prop-types](https://npmjs.com/package/prop-types)
* [Node-sass](https://npmjs.com/package/node-sass)
* [Cypress](https://npmjs.com/package/cypress)
* [Eslint-Plugin-Cypress](https://npmjs.com/package/eslint-plugin-cypress)


#### Support Setup
Install Node.js from your [package manager](https://nodejs.org/download/package-manager), or [download](https://nodejs.org/download/) binaries (for fun) or source code (for maximum fun).

Install [Postgres](https://postgresql.org).

#### Database/API Server Setup
Execute the following to set up Interview Scheduler API server:
```
cd <project-directory>
git clone https://github.com/d0ugr/scheduler-api
cd scheduler-api
npm install
```
Log into Postgres as a user with superuser privileges. For example:
```
sudo -u postgres psql
```
Execute the following to set up the development database and populate it with data:
```
CREATE USER scheduler_development WITH NOSUPERUSER PASSWORD 'development';
CREATE DATABASE scheduler_devlopment OWNER scheduler_development;
GRANT ALL ON DATABASE scheduler_devlopment TO scheduler_development;
\c scheduler_development
\i src/db/schema/create.sql
\i src/db/schema/development.sql
-- Use this to verify the data:
SELECT * FROM days JOIN appointments ON appointments.day_id = days.id;
```
Create the file ```<project-directory>/scheduler-api/.env.development``` with the following:
```
PGHOST=localhost
PGUSER=scheduler_development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

#### Client Setup
Execute the following to set up Interview Scheduler:
```
cd <project-directory>
git clone https://github.com/henrychidozie/scheduler
cd scheduler
npm install
```
Create the file ```<project-directory>/scheduler/.env.development``` with the following:

```
REACT_APP_WEBSOCKET_URL=ws://localhost:8001
PORT=8000
CHOKIDAR_USEPOLLING=false
```

#### Running Webpack Development Server
```
cd <project-directory>/scheduler
npm start
```

#### Running Storybook Visual Testbed
Storybook is excellent for testing React components in isolation from the rest of the application for development or testing.
```
cd <project-directory>/scheduler
npm run storybook
```

### Testing
#### Database Setup
Log into Postgres as a user with superuser privileges. For example:
```
sudo -u postgres psql
```
Execute the following to set up the test database and populate it with data:
```
CREATE USER scheduler_test WITH NOSUPERUSER PASSWORD 'test';
CREATE DATABASE scheduler_test OWNER scheduler_test;
GRANT ALL ON DATABASE scheduler_test TO scheduler_test;
\c scheduler_test
\i src/db/schema/create.sql
\i src/db/schema/test.sql
-- Use this to verify the data:
SELECT * FROM days JOIN appointments ON appointments.day_id = days.id;
```

#### API Server Setup
Create API server test environment file:
```
<project-directory>/scheduler-api/.env.test
```
```
PGHOST=localhost
PGUSER=scheduler_test
PGDATABASE=scheduler_test
PGPASSWORD=test
PGPORT=5432
```
Run the API server in test mode:
```
cd <project-directory>/scheduler-api
npm run test:server
```

#### Client Setup
Create client test environment file:
```
<project-directory>/scheduler/.env.test
```
```
REACT_APP_WEBSOCKET_URL=ws://localhost:8001
PORT=8000
CHOKIDAR_USEPOLLING=false
```

#### Running Jest Test Framework

```
cd <project-directory>/scheduler
npm test
```

#### Running Cypress Test Framework
Make sure you're running the API server in test mode with the appropriate data.
```
cd <project-directory>/scheduler
npm run cypress
```
Click "Run all specs" or select individual specs from the Tests pane in the Cypress window.
