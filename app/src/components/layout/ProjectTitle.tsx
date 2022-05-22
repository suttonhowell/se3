import { Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export const ProjectTitle = () => {
    // since we don't want to have the title in the frontpage
    let isbeingEdited = true; //TODO set based on the pencil icon click
    let title = "Untitled"; //TODO sync this with redux 

    return (
        <Box>
            {isbeingEdited
            ? <TextField  label={title} variant="standard" />
            : <Typography> { title } </Typography> }
        <Edit/>
        </Box>
    )
}
