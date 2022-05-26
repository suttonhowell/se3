# DCR Graph Editor

## Instructions

These instructions describe how to set up the project for local development.

### Prerequisites

- In order to run the project locally, you will need to have [Node.js](https://nodejs.org/en/) (using the LTS version 16.15.0 should be fine) installed on your machine. You can install Node.js on your machine by following the instructions on [Node.js](https://nodejs.org/en/).
  - **Note:** If you are using Windows Node.js needs to be installed on your Windows system and not on something like WSL, as WSL does not have a window manager and wont be able to run the project.
- After having installed Node.js, confirm that it is installed correctly by running the following command in your terminal: `node -v`.
- Node.js comes with a package manager called [npm](https://www.npmjs.com/) used for manageing dependencies. Confirm that npm is installed correctly by running the following command in your terminal: `npm -v`.

### Setup

1. Clone the project to you local machine.
2. Go to the `app` directory and run the following command: `npm install`. This will install all the dependencies.
3. To run the app in development mode run the following `npm run start` command from the `app` directory. This will start the app in development mode. When in development mode, the app will be automatically reloaded when you make changes to the code.
   - **Note:** This will fail if you try to run it from WSL - though it is possible to run it from WSL with some workaround, [read more here](https://www.beekeeperstudio.io/blog/building-electron-windows-ubuntu-wsl2).

## Usefull links and documentation

- [SVG documentation](https://developer.mozilla.org/en-US/docs/Web/SVG#documentation)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [React documentation](https://reactjs.org/docs/getting-started.html)
- [MUI documentation](https://mui.com/material-ui/getting-started/installation/)
- [Electron documentation](https://www.electronjs.org/docs/latest)
- [Tutorial on drag-and-drop SVG's](https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/)
- [SVG dynamic wordwrapping](https://medium.com/@CarysMills/wrapping-svg-text-without-svg-2-ecbfb58f7ba4)
