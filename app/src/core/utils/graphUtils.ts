import { DCRGraph } from '../models/DCRGraph';
import { dialog } from 'electron';
import fs from 'fs';

export const openFile = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Choose graph file',
    buttonLabel: 'Open graph'
  });
  if (canceled) {
    return;
  } else {
    return fs.readFileSync(filePaths[0], 'utf8');
  }
};

export const saveFile = async (content: string) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save graph to file',
    buttonLabel: 'Save graph',
    filters: [
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  if (canceled || filePath == undefined) {
    return;
  } else {
    fs.writeFile(filePath, content, {}, () => { });
  }
}

// use in the main process 
export async function saveGraph(graph: DCRGraph) {
  const graphJSON = JSON.stringify(graph);
  await saveFile(graphJSON);
}

// use in the main process 
export async function loadGraph() {
  return await openFile();
}
