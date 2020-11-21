---
path: '/react-from-scratch'
date: '2019-07-27'
title: 'Create a react project from scratch'
tags: ['React', 'Software']
excerpt: 'Create a react app the hard way.'
image: '/react.png'
time: '5 min.'
---

Even when create-react-app is one of the most used tools for starting React projects, we don’t see most of the configuration that we needed to do for it. When we need to modify that config, we are not sure how to do it. This tutorial walks you through the normal steps that I’ve seen are needed for a high-level React project (with tests, linter, and best-practices). My objective is that you can understand what’s needed to create a react app, and modify your create-react-app configuration or legacy projects. The app that we are going to create will have the following features:

- Uses babel for transpiling ES6 code into ES5 javascript.
- Uses a post-css processor like sass.
- Handles images and svgs, creating a links for referencing them.
- Uses a linter for keeping a consistent code style.
- Has a basic setup for using Jest for tests.
- Bonus: Uses TypeScript.

### Prerequisites

- <Code>Node</Code>, you can download and install it from here. Go for the LTS (Long Terms Support) version if you don’t have installed it yet. If you already have a different node version. I advise you to use tools like nvmrc, so you can manage node versions (and use LTS for this tutorial).
- <Code>npm</Code> is the default package manager, you can use it for the tutorial, just change yarn for npm. If you want to install yarn, you can do it by running yarn add in your terminal.

### Creating the project and adding dependencies

The first thing, is creating our package.json file. We can do that with npm init, or yarn init. I’ll go for yarn, as I think it’s faster for installing dependencies and uses emojis.

<Code darkBash>yarn init</Code>

Yarn will ask some questions before creating the file. We can hit enter for using the default values, or type what we want to change. I’m setting this project as private, as I won’t publish it to production. It’s better to change that flag to yes when we want to publish as we’ll see most of npm’s warnings about unpublished dependencies.
<Code darkBash>yarn init

question name (react_template):
question version (1.0.0):
question description: React template
question entry point (index.js):
question repository url (https://github.com/timgivois/react_template):
question author: Tim Givois
question license (MIT):
question private: y

</Code>

We’ll first add Babel 7 to the project, and the presets that we’ll need for ES6 and JSX.

<Code darkBash>yarn add @babel/core @babel/preset-react @babel/preset-env</Code>

After we installed babel, we may need to add basic configuration for it in .babelrc file (in our root folder)

```json
// .babelrc
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

Now that we have our transpiler for JavaScript ES7 and React, we are able to add webpack. It’s a module bundler that will basically create a dependency graph in the project and spit a packaged javascript file that we’ll attach to our index html.
<Code darkBash>yarn add webpack webpack-cli babel-loader webpack-dev-server html-webpack-plugin</Code>

We installed webpack and some dependencies we’ll need for building our react app. Babel-loader is basically a bridge between webpack and babel and webpack dev server is a helpful plugin for creating dev bundles really quick.

### Adding needed packages

You'll need React and React-DOM for this. You can run the following command for adding it to your node_modules and package.json:
<Code darkBash>yarn add react react-dom</Code>

### Configuring webpack

As we made with babel, we need to create a configuration file. In most mature projects I’ve seen, more than one webpack configuration is needed (for dev and for production). This is because production bundles are normally optimized bundles that are hard to read and dev bundles can be read by developers. The following code snipper was created in the root folder with the name webpack.config.js

```JavaScript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader')
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
}
```

I added the following files to the project (as you may deduct from the webpack configuration).

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React Example</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/build/bundle.js"></script>
  </body>
</html>
```

```JavaScript
import React from 'react';

const App = () => (
    <div className="container">
        <h1>Hello World, React!</h1>
    </div>
)

export default App;
```

```JavaScript
.container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    width: 100%;
}
```

```JavaScript
import React from 'react'
import ReactDOM from 'react-dom'

import App from './src/App'

ReactDOM.render(<App />, document.getElementById("root"))
```

And now, we need to update our `package.json` scripts:

```
"scripts": {
    "start": "webpack-dev-server --hot --open",
    "build": "webpack --config webpack.config.js --mode production"
  }
```

If you run npm run build or yarn build, you’ll see that there’s a production bundle made in dist folder. If you run npm run start or yarn start, a server will be created for serving our files. The ‘hot’ flag indicate that the bundle will be autogenerated after we change something in our app. ‘Open’ flag will automatically open a browser tab in localhost:8080 which is the default webpack dev host and port.

And, VOILÁ! we got a React app with minimal configuration. From now on, we’ll be adding features (post-css, lint rules, image loading, jest setup and finally typescript).

### Adding a postcss loader to webpack

We are going to add sass loader to our configuration. To do so, we just need to add the deps.

<Code darkBash>yarn add --dev sass-loader node-sass</Code>

```JavaScript
...
              {
                test:/\.s?css$/,
                use:['style-loader','css-loader', 'sass-loader']
              }
...
```

Add a sass file in your src folder.

```

$default-background: #D3D3D3;

body {
    height: 100%;
    background-color: $default-background;
}

.container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    width: 100%;
}
```

Modify the import you had, changing App.css to App.scss in your App.jsx.

```
import './App.scss'
```

You should have the below view when running `yarn start`.

What about file images? We can add a webpack configuration for that too. First we need to install ‘file-loader’ running:
<Code darkBash>yarn add --dev file-loader</Code>

```
...
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader'
                ]
            }
...
```

### Add TypeScript to the project

The first thing you have to do is install typescript and its webpack loader.

<Code darkBash>yarn add --dev typescript ts-loader source-map-loader</Code>

Add the following configuration for your TypeScript project:

```JavaScript
{
    "compilerOptions": {
      "outDir": "./dist/",
      "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es6",
      "jsx": "react",
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true
    }
}
```

Now, you should just need to add the loader and rename App.jsx to App.tsx.

```JavaScript
...
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
...
```

Don’t forget to add react types to the project:

<Code darkBash>yarn add --dev @types/react @types/react-dom</Code>

Now, we can rewrite our HelloWorld app. This is a good start, for developing our application. But we need to first add linters, jest and dotenv imports.

```JavaScript

import React from 'react'

import './App.scss'

const App:React.StatelessComponent<{}>  = () => (
    <div className='container'>
        <h1>Hello World, React!</h1>
    </div>
)

export default App;
```

Using assets and images may lead to some Cannot find module errors, you can fix them by adding the following file:

```TypeScript
declare module '*.css'
declare module '*.scss'
declare module '*.html'
declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
```

### Add a linter for the project

Another nice-to-have in projects are the linters. While more people work in it, there are different styles of writing code. Some may prefer to use single quotes for strings and some others love to use the semicolon. Linters are the tool for keeping a consisting style in your code. We’ll see how we can setup StandardJS with TS.

<Code darkBash>yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin</Code>

Modify your package.json adding standard script and its basic config:

```JavaScript
"scripts": {
    "start": "webpack-dev-server --hot --open",
    "build": "webpack --config webpack.config.js --mode production",
    "lint": "standard src/**/*.tsx src/**/*.ts src/**/*.jsx src/**/*.js"
  },
  "standard": {
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint/eslint-plugin"
    ]
  }
```

One of the awesome things is that we can fix automatically the style differences with StandardJS:

<Code darkBash>yarn lint --fix</Code>

### Adding Jest to the project

Now that we have fixed our lint problems, we’ll know add configuration for jest so we can have tests. Let’s start by installing jest and enzyme:

<Code darkBash>yarn add --dev jest enzyme enzyme-adapter-react-16 @types/jest ts-jest @types/enzyme babel-jest identity-obj-proxy</Code>

Add the following jest config file:

```JavaScript
{
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "setupFilesAfterEnv": ["<rootDir>/setupEnzyme.js"],
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
    "moduleNameMapper": {
        "^.+\\.(css|less|scss)$": "babel-jest",
        "^.+\\.(jpg|png|gif|svg)$": "identity-obj-proxy"
      }
}
```

Now, as you may suspect. We need to create the setup adapter for enzyme. Add the following ES5 file in yout root folder:

```JavaScript
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
```

To see if it’s working, we may add our very first test.

```JavaScript

import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);

        expect(wrapper).toBeTruthy();
    })
})
```

Now, we can start to actually create our react app. We now control and understand all the configs that are in the project.
