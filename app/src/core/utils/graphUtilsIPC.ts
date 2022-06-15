import { DCRGraph } from '../models/DCRGraph';

// use in the renderer process 
export async function saveGraphIPC(window: Window, graph: DCRGraph) {
    const graphJSON = JSON.stringify(graph);
    await window.fileApi.saveFile(graphJSON);
}

// use in the renderer process 
export async function loadGraphIPC(window: Window) {
    return await window.fileApi.openFile();
}