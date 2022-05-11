# DCR Graph Editor

## Instructions

These instructions describe how to set up the project for local development.

### Prerequisites

- In order to run the project locally, you will need to have [Node.js](https://nodejs.org/en/) (using the LTS version 16.15.0 should be fine) installed on your machine. You can install Node.js on your machine by following the instructions on [Node.js](https://nodejs.org/en/).
  - **Note:** If you are using Windows Node.js needs to be installed on your Windows system and not on something like WSL, as WSL does not have a window manager and wont be able to run the project.
- After having installed Node.js, confirm that it is installed correctly by running the following command in your terminal: `node -v`.
- Node.js comes with a package manager called [npm](https://www.npmjs.com/) used for manageing dependencies. Confirm that npm is installed correctly by running the following command in your terminal: `npm -v`.

### Setup

- 1. Clone the project to you local machine.
- 2. Go to the `app` directory and run the following command: `npm install`. This will install all the dependencies.
- 3. To run the app in development mode run the following `npm run start` command from the `app` directory. This will start the app in development mode. When in development mode, the app will be automatically reloaded when you make changes to the code.
  - **Note:** This will fail if you try to run it from WSL - though it is possible to run it from WSL with some workaround, [read more here](https://www.beekeeperstudio.io/blog/building-electron-windows-ubuntu-wsl2).

## Todo

- [ ] Install reduxtoolkit
- [ ] Add redux-devtools
- [ ] Add react router dom with hashRouter if we need to change pages


## Pull Requests, Issues, and Project Board Workflow
### Issues

- Create an issue for each sub-task you will complete, and assign yourself to relevant issues. 
- Feel free to create issues that are not your own and leave them unassigned if you know we will need to have them in the future.
- Make sure issues are related to specific tasks. Example: "Fix bug on home page where create graph button is not activating" rather than "Edit home page"
- Add issues to GitHub project using the projects tab on the right-hand side of the issues page (underneath assignees and labels)
- You can add relevant labels such as back end, front end, help wanted, etc, but these are not required

### Project Board

- When beginning to work on a task, drag the relevant issue from the "To-Do" tab to the "In Progress" tab so the rest of the team members know you are actively working on it.
- Issues cannot be automated to the "awaiting review" and "approved" columns as they cannot directy be reviewed, but you may manually drag them from in progress to these columns once a PR is issued, but this is not required.
- Pull requests should also be added to the project board.
- Pull Requests which have reviewers requested should automate through the process correctly. You may need to initally triage the pull request into it's inital column when adding it to the project if it does not know which column it should start in (GitHub will prompt you to do this if necessary). When a PR is merged and closed, all issues tagged as completed by that Pull Request will automatically be closed.
- When an issue is closed, it will automatically move to the "Done" section.

### Pull Requests and Branching

- Create a new branch for each user story from the Dev branch. 
- Open a pull request (PR) each time a user story needs to be merged down into Dev.
- Add the PR to the GitHub Project Board using the right-hand menu
- Add any issues that will be solved by the PR to the "Development" section on the right-hand side menu
- Pull requests for user stories to the Dev branch must be reviewed by all members of the relevant sub-team working on that user story.
- Pull requests for main must be reviewed by all team members to ensure stability on the main branch.
- Once approved by all requested reviewers, a PR should be merged by the project member who opened the PR. 

## Useful links and documentation

- [SVG documentation](https://developer.mozilla.org/en-US/docs/Web/SVG#documentation)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [React documentation](https://reactjs.org/docs/getting-started.html)
- [MUI documentation](https://mui.com/material-ui/getting-started/installation/)
- [Electron documentation](https://www.electronjs.org/docs/latest)
- [Tutorial on drag-and-drop SVG's](https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/)
- [Commit Message Etiquette](https://cbea.ms/git-commit/e)
