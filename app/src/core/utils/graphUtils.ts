import { DCRGraph } from '../models/DCRGraph';

export async function saveGraph(window: Window, graph: DCRGraph) {
  const graphJSON = JSON.stringify(graph);
  await window.fileApi.saveFile(graphJSON);
}

export async function loadGraph(window: Window) {
  return await window.fileApi.openFile();
}
