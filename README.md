# Wacky-Crackups

### Installation
Requirements:
- [Node, NPM](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

Optionally:
- [Docker](https://www.docker.com/community-edition#/download)

Steps:
1. Clone repo: `git clone https://github.com/parrotmac/wacky-crackups.git`
2. Change Directory: `cd wacky-crackups`
3. Configure a .env file for config settings (see below)
4. Install: `npm install`
5. Run: `npm start`
6. Visit: [http://localhost:3000](http://localhost:3000)

### Hints
- Have something else running on port 3000? Use `PORT=3030 npm start` to specify `3030` as an alternate port

### .env/Dotenv Configuration
The server can be configured with a few different settings using environmental variables. While it's possible to configure them on your machine or define them when running (as shown for `PORT` above), this project supports an easier way.

Steps:
1. Create .env file in the root of the project directory
2. Fill with your environmental variables, in the format/example shown below
3. Save & Profit!

```
PORT=3030
BLOG_API_URL=http://blog.wackycrackups.com/wp-json/wp/v2/posts
FEEDBACK_EMAIL_URL=https://formspree.io/<FEEDBACK DESTINATION EMAIL GOES HERE>
```

When running `npm start` this will make the application start on port 3030 instead of 3000, and use the current Wordpress installation as the blog data source.

Note: This file is set to be ignored by Git since different people might want it configured in different ways. Please don't track this file.
