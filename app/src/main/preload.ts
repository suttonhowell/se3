import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('darkMode', {
  get: () => ipcRenderer.invoke('dark-mode:get'),
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
});

contextBridge.exposeInMainWorld('fileApi', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content: string) => ipcRenderer.invoke('dialog:saveFile', content)
});
