import { app } from 'electron';

const isMac = process.platform === 'darwin';
const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

app.setName('DCRGraphMaker');

export const menuTemplate: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
  ...(isMac
    ? ([
      {
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      },
    ] as Electron.MenuItemConstructorOptions[])
    : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click() {
          console.log('Open was clicked\n');
        },
      }, //end of Open
      {
        label: 'Save',
        click() {
          console.log('Save was clicked\n');
        },
      }, //end of Save
      ...(isMac
        ? []
        : [{
          label: 'Exit',
          click() {
            console.log('Exit was clicked\nExiting...\n');
            app.quit();
          },
        }]), //end of Exit
    ],
  }, //end of File submenu
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        click() {
          console.log('Undo was clicked\n');
        },
      }, //end of Undo
      {
        label: 'Redo',
        click() {
          console.log('Redo was clicked\n');
        },
      }, //end of Redo
    ],
  }, //end of Edit submenu
  {
    label: 'Format',
    submenu: [
      {
        label: 'Option 1',
        click() {
          console.log('Option 1 (Format) was clicked\n');
        },
      }, //end of Option 1
      {
        label: 'Option 2',
        click() {
          console.log('Option 2 (Format) was clicked\n');
        },
      }, //end of Option 2
    ],
  }, //end of Format submenu
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Option 1',
        click() {
          console.log('Option 1 (Settings) was clicked\n');
        },
      }, //end of Option 1
      {
        label: 'Option 2',
        click() {
          console.log('Option 2 (Settings) was clicked\n');
        },
      }, //end of Option 2
    ],
  }, //end of Settings submenu
  ...(isDebug
    ? ([
      {
        label: 'Development',
        submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }],
      },
    ] as Electron.MenuItemConstructorOptions[])
    : []),
];
