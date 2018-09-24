# Wacky-Crackups
## Local Development
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

# Deployment
### Overview
This is a list of the services that are currently in use. It would be a good idea to migrate all of this to AWS-Managed or commercial services as time and need permit. Commercial (paid) alternatives are available as drop-in replacements for every part, meaning migration can be done piece-by-piece or alltogether.

- **Origin Repo:** `https://github.com/parrotmac/wacky-crackups.git`
- **Builds:** "Little Blue" container builder [https://lb.stag9.com](https://lb.stag9.com)
- **Registry:** "Thing Registry" container registry [https://thingregistry.com/](https://thingregistry.com/)
- **Deployments:** Deployed to `ec2-54-173-112-51.compute-1.amazonaws.com`
- **Run:** Run as Docker container in a Docker-Compose setup
- **DNS:** Route9 via Story Startups AWS Console

### Push
On push to origin repo, a build is triggered. LittleBlue currently doesn't show very much information about the build process. If there's a probelem with the code it may fail to build. After build it pushed to the Docker registry at `thingregistry.com/parrotmac-wacky-crackups`.

### Pull
To pull from `thingregistry.com/parrotmac-wacky-crackups` you will need to login. The user is `registryuser`. Contact me (`@parrotmac`) if you'd like the passsword.

### Connect
To connect to the production server. The server is running Amazon Linux on an EC2 instance. The genral connection procedure is outlined here: [Connecting to Your Linux Instance Using SSH](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html), but the important stuff is laid out below:
- Generate an SSH key pair (On macOS or Linux you can use `ssh-keygen`, on Windows use PuTTY's SSH-Keygen utility)
- Add your public key (typically ends in `.pub`, something like `id_rsa.pub`) to the server. If you don't have access, anyone with access can add your key.
- Connect with `ssh -i /path/to/your/ssh-key-pair.pem ec2-user@ec2-54-173-112-51.compute-1.amazonaws.com`
  - Note: You might not need to specify the path using `-i <your path>` if you saved it to the default location as your default key (usually something like `~/.ssh/`)

### Redeploy
Once connected to the server via SSH, run `ls` and you'll see two directories: `nginx-proxy` and `wackycrackups.com`.
- The `nginx-proxy` is part of the infrastructure. It contains the `docker-compose.yml` and related files that enable multiple server host names, automatic SSL, and other web-facing server settings.
- The `wackycrackups.com` directory contains the `docker-compose.yml` defining how the Docker image (built in previous steps) is run.

### Web Server `docker-compose.yml`
Below is an example (with comments!) of the `docker-compose.yml` used to run Wacky Crackups.
```
version: '2'    # Version '3' is available, but doesn't provide any benefits for this particular config
services:       # Multiple services can be run together
  wackyweb:     # This is the only service we're using right now
    image: thingregistry.com/parrotmac-wacky-crackups       # The name of the Docker image to run
    restart: always     # Docker will restart the container if it crashes
    expose:             # This is the port we're running Node on -- must be exposed to be accessable outside the container
      - "3000"
    environment:        # List of environmental variables
      - BLOG_API_URL=http://blog.wackycrackups.com/wp-json/wp/v2/posts
      - FEEDBACK_EMAIL_URL=<See Other Documentation>

      # These are specific to the way the server is setup right now.
      # VIRTUAL_HOST defines what domain names this should be accessable at
      # LETSENCRYPT variables are for automatic SSL, EMAIL is where alerts are routed
      - VIRTUAL_HOST=wackycrackups.com,www.wackycrackups.com
      - LETSENCRYPT_HOST=wackycrackups.com,www.wackycrackups.com
      - LETSENCRYPT_EMAIL=isaac@sianware.com
    container_name: wacky-website       # Name of container while running
    networks:           # This and the rest of the file are all for hooking into the `nginx-proxy` service
      - wacky-proxy

networks:
  wacky-proxy:
    external:
      name: nginx-proxy

```
