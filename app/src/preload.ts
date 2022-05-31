import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('darkMode', {
  get: () => ipcRenderer.invoke('dark-mode:get'),
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
});