import TextField from "@mui/material/TextField";

export const ProjectTitle = () => {
    // since we don't want to have the title in the frontpage
    let isInEditor = true; // TODO get this info rom router
    let title = "Untitled";
    if(isInEditor){
        return (
        <TextField  label="is in edit" variant="standard" />
    )
    }
    else
    return (
        <TextField  label="not in edit" variant="filled" />
    )  
}
