# VEEAM Form Configurator Challenge — Senior Frontend Developer hiring,
> Author: Halil Kayer (@kjaer)

## Overview
I decided to split app into 2 major component:
 - Editor
 - Form (rendered)

I would like user to have advantage proper editor while they write their JSON config. 
They gain more benefit when their JSON getting larger/bigger/more complex by proper indentation
by warning for syntax error etc. For the editor I picked `monaco-editor` from microsoft but 
react implementation from (https://github.com/suren-atoyan/monaco-react)

Second decision is the format of the JSON. I decided to follow the format of react.js element,
So I can use native react.js commands. So I treat all the JSON node as `jsx` element. I created 
predefined components mentioned in the challenge description and a little mapper which picks the
corresponding component from JSON via `type` property. I kept the JSON as much as `jsx` compliant
so creating of `react.js` components out of it become more straightforward and automatised.

Statically error checking is done by the _Editor_, yet faulty JSON can still cause errors. 
For this I am using `react.js`'s `ErrorBoundary`. Unfortunately `ErrorBoundary` is only available
for the class components and I don't want to mix codebase with function component and class components.
I used the `react-error-boundary` package. I wrapped my `FormBuilder` component where errors can happen
during renders component out of given JSON. By doing so, I able to give friendly error messages without
crashing the app. 

What cost me delay of this app was testing. `monaco-editor` was easy to add thanks to `@monaco-editor/react`
Hovewer testing the `monaco-editor` was quite uncharted area. Even `@monaco-editor/react` did not invest time for it,
(https://github.com/suren-atoyan/monaco-react/blob/master/src/Editor/__snapshots__/index.spec.js.snap)
But I have to render, in order to assert my tests against to app. After a lot of research, source-code reading 
and trial & error, I managed the render `monaco-editor` in `jsdom` environment so I can leverage the benefit of
using `@testing-library` alongside with `jest`.

## Commands

This repo is developed by using `vite.js` as bundler. `npm` as package manager
and `node.js` `v.18.9`. So it's recommended to enable `corepack` if you don't already.

```sh
$ node -v
v18.9.0
$ corepack enable
```
second step must be done before installing the dependencies is installing the necessary tools
for `node-canvas`(https://github.com/automattic/node-canvas#compiling). 

-**What's `node-canvas` used for?**
It's for testing purpose. I picked `monaco-editor` for the app where you write your JSON input
and `monaco-editor` uses canvas internally. In order to render `monaco-editor` in `jsdom` environment
I need to mock `canvas` that's where `node-canvas` is being used.

after you install the necessary tools for `node-canvas` you can now install the dependencies:

```shell
$ npm install
```

There are few commands at your disposal. Some of them comes from `vite.js` itself and some of them
created by me. Here is the list of all the available commands:

```shell
$ npm run dev
```
Starts the application in dev mode and its server. It's a vite.js default command, after you ran this command. You would high likely see something like below:
```shell
  VITE v3.1.2  ready in 605 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

```shell
$ npm run build
```
It bundles the application for production-ready mode. It's a vite.js default command.


```shell
$ npm run preview
```
Bundles the application for production mode and additionally start the server with production bundle.
It's a vite.js default command, this is useful to have a look at production version of the app you build.

```shell
$ npm run test
```

Test command that I added for start the `jest` for running available tests.

```shell
$ npm run test:debug
```
Same command but debugging process attached to the jest. 
It holds `jest` to run the tests until a debugger starts. I prefer to use chrome developer tools
in chrome where I can access `chrome://inspect`.


```shell
$ npm run format
```
It applies default `prettier` setting to the `src` folder and `config` folder for formatting.

## CHALLENGE
You need to develop an application that renders the UI based on JSON config.
The application consists of two tabs:
- Config – for input JSON configuration
- Result – for displaying result form

Application should be able to render any amount of fields of following types:
- Numeric (number field)
- Single string (text field)
- Multiple strings (textarea)
- Logical (checkbox)
- Date (date field)
- Enum (radio buttons)

In addition user should be able to configure form title, amount and labels of the buttons at the bottom
of the result form (for example: Ok, Cancel, Apply)
Stack:
- It is recommended to use React
- We are gradually switching to TypeScript and moving all existing projects to it, so it is desirable
(but not mandatory) to use TS instead of JS.
- You can use any set of tools for development, configuration and building of the app: Create
React App, custom-configured webpack, babel, etc. or any other in which you are used to work.
- You can use any npm packages
- In the readme file located in the project folder indicate how to build and run the project (eg. In
the project folder open the console and run ‘yarn start’ command, and go to the localhost:3000
in the browser)


### Resources
- https://stackoverflow.com/a/36517369/5018572
- https://loserkid.io/react-dynamic-rendering/
- https://www.pluralsight.com/guides/how-to-render-a-component-dynamically-based-on-a-json-config
- https://github.com/suren-atoyan/monaco-react
- https://github.com/dyakovk/jest-matchmedia-mock
- https://github.com/Automattic/node-canvas