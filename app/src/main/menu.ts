import { app, nativeTheme } from 'electron';
import { store } from '../core/redux/store';
import { saveGraph } from '../core/utils/graphUtils';

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
        click() {},
      }, //end of Open
      {
        label: 'Save',
        click() {
          const graph = store.getState().editor.graph;
          if (graph !== undefined) saveGraph(graph);
        },
      }, //end of Save
      ...(isMac
        ? []
        : [
            {
              label: 'Exit',
              click() {
                app.quit();
              },
            },
          ]), //end of Exit
    ],
  }, //end of File submenu
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        click() {},
      }, //end of Undo
      {
        label: 'Redo',
        click() {},
      }, //end of Redo
    ],
  }, //end of Edit submenu
  {
    label: 'Format',
    submenu: [
      {
        label: 'Option 1',
        click() {},
      }, //end of Option 1
      {
        label: 'Option 2',
        click() {},
      }, //end of Option 2
    ],
  }, //end of Format submenu
  {
    label: 'Settings',
    submenu: [
      {
        label: `Toggle dark mode`,
        click() {
          if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light';
          } else {
            nativeTheme.themeSource = 'dark';
          }
        },
      }, //end of Toggle dark mode
      {
        label: 'Use system theme mode',
        click() {
          nativeTheme.themeSource = 'system';
        },
      }, //end of system theme mode
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
