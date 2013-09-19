# Maya Beautification 

## Description 
The ancient Maya had standards of beauty that involved both temporary adornments and jewelry and permanent body modification.
See yourself wearing all these adornments.

## Dev setup 
If you're making code changes, you can use Grunt to create new builds.

#### Install [Homebrew](http://mxcl.github.io/homebrew/)

    $ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

#### Use Homebrew to install Node.js and NPM

    $ brew install node
    $ curl http://npmjs.org/install.sh | sh
    $ export NODE_PATH="/usr/local/lib/node"
    $ export PATH="/usr/local/share/npm/bin:$PATH"

Put those last two export commands in your bash or shell profile if you want them to work all the time.

#### Install [Grunt](http://http://gruntjs.com/getting-started)
Grunt is a task runner we use here to minify and concatenate JavaScript and CSS files after making any code changes. It can optionally be used here to optimize images.

Uninstall any previous versions of Grunt and then install the Grunt command line interface.

    $ npm uninstall -g grunt
    $ npm install -g grunt-cli

Note: Grunt 0.4.x requires Node.js version >= 0.8.0.

### Create a new build 
If you change any CSS, JavaScript, or images, you should create a new build using Grunt. 

To minify and concatenate CSS and JavaScript files, run `grunt`.

To optimize images, run `grunt smushit`.

## Install
+ Set up a local webserver with SSL - this allows for saving the "Always allow webcam access" setting in Chrome.
+ Install [Stele](https://github.com/scimusmn/stele) and set Delay in the config to True.
