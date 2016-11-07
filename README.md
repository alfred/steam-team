# Steam Team

## Setup

#### Install Node.js
1. Install (HomeBrew)[http://brew.sh/]
2. Install `nvm` via `brew install nvm` and follow the prompts
3. Install `node` via `nvm install v6.8.1`

#### Setting up the Project
4. Install `gulp` via `npm install -g gulp`
5. Install all dev dependencies via `npm install`
6. Run `gulp build` to build all of the assets

## Development
1. Open a Terminal session and run `gulp start` this will start `nodemon` and a local `express` server to rebuild backend files.
2. Open another Terminal session and run `gulp watch` this will start the watch task to rebuild frontend files.
