import PageTitle from "@components/data-display/PageTitle";
import { Box, Button, Card, TextField } from "@mui/material";
import { BoxButtons } from "@styles/pages/teacher/registerTeacher.style";

export default function RegisterTeacherPage(){

    return(
        <>
            <PageTitle title="Register Teacher" />
            <Box sx={{maxWidth: 'md', mx: 'auto', my: 3}}>

                <Card sx={{p: 3}}>

                    <TextField 
                        label={'Name'}
                        sx={{my: 2}}
                        fullWidth
                    />

                    <TextField 
                        label={'Age'}
                        sx={{my: 2}}
                        fullWidth
                    />

                    <TextField 
                        label={'Price'}
                        sx={{my: 2}}
                        fullWidth
                    />

                    <TextField 
                        label={'Description'}
                        sx={{my: 2}}
                        fullWidth
                        rows={4}
                        multiline
                    />

                </Card>

                <Card sx={{p:3, my: 5}}>

                    <TextField 
                        label={'Email'}
                        type={"email"}
                        sx={{my: 2}}
                        fullWidth
                    />

                    <TextField 
                        label={'Password'}
                        type={"password"}
                        sx={{my: 2}}
                        fullWidth
                    />

                    <TextField 
                        label={'Confirm Password'}
                        type={"password"}
                        sx={{my: 2}}
                        fullWidth
                    />

                </Card>

                <BoxButtons>
                    <Button variant={"contained"} fullWidth>
                        Register
                    </Button>
                </BoxButtons>
            </Box>
        </>
    )
}