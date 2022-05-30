import { app } from "electron";
import { DCRGraph } from "../models/DCRGraph";
import fs from "fs"

export function saveGraph(graph: DCRGraph) {
    let graphJSON = JSON.stringify(graph);
    let path = app.getPath("documents");
    fs.writeFile(path, graphJSON, {}, () => { });
}

export function loadGraph(graph: DCRGraph) {

}