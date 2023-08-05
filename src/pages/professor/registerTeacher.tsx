import PageTitle from "@components/data-display/PageTitle";
import useRegisterTeacher from "@data/hooks/pages/professor/useRegisterTeacher";
import { Avatar, Box, Button, Card, CircularProgress, Icon, Snackbar, TextField, Typography } from "@mui/material";
import { BoxAvatar, BoxButtons } from "@styles/pages/teacher/registerTeacher.style";
import CurrencyInputMask from "@components/inputs/CurrencyInputMask";
import ButtonFile from "@components/inputs/ButtonFile";
import { teacher } from "@data/@types/teacher";
import Dialog from "@components/feedback/Dialog";

export default function RegisterTeacherPage(){
    const {
        valuesRegister,
        setSnackMessage, 
        messageError,
        snackMessage,
        setValuesRegister,
        handleSubmit,
        loading,
        TeacherState,
        savePhoto,
        openDialog,
        setOpenDialog,
        deleteAccount
    } = useRegisterTeacher();

    return(
        <>
            {TeacherState?.id && (
                <BoxAvatar>
                    <ButtonFile onChange={savePhoto}>
                        <Avatar src={TeacherState.foto_perfil}>
                            {Object.hasOwn(TeacherState, 'nome') && TeacherState.nome[0]}
                        </Avatar>
                        <div className="boxIcon">
                            <Icon>
                                add_a_photo
                            </Icon>
                        </div>
                        
                    </ButtonFile>
                </BoxAvatar>
            )}
            <PageTitle title={TeacherState?.id ? 'Update Data' : "Register Teacher"} />
            <Box sx={{maxWidth: 'md', mx: 'auto', my: 3}}>

                <Card sx={{p: 3}}>

                    <TextField 
                        label={'Name'}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.nome != undefined}
                        value={valuesRegister?.nome ?? ''}
                        helperText={messageError?.nome}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, nome: value}
                        })}
                    />

                    <TextField 
                        label={'Age'}
                        sx={{my: 2}}
                        type={'number'}
                        value={valuesRegister?.idade ?? ''}
                        fullWidth
                        error={messageError?.idade != undefined}
                        helperText={messageError?.idade}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, idade: Number(value)}
                        })}
                    />

                    <TextField 
                        label={'Price'}
                        sx={{my: 2}}
                        fullWidth
                        value={valuesRegister?.valor_hora ?? ''}
                        error={messageError?.valor_hora != undefined}
                        helperText={messageError?.valor_hora}
                        onChange = {({ target: { value } }) => {
                            setValuesRegister((prevState) => ({
                                ...prevState,
                                valor_hora: value,
                            }));
                        }}
                    />

                    <TextField 
                        label={'Description'}
                        value={valuesRegister?.descricao ?? ''}
                        sx={{my: 2}}
                        fullWidth
                        rows={4}
                        multiline
                        error={messageError?.descricao != undefined}
                        helperText={messageError?.descricao}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, descricao: value}
                        })}
                    />

                </Card>

                <Card sx={{p:3, my: 5}}>

                    <TextField 
                        label={'Email'}
                        value={valuesRegister?.email ?? ''}
                        type={"email"}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.email != undefined}
                        helperText={messageError?.email}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, email: value}
                        })}
                    />

                    <TextField 
                        label={'Password'}
                        type={"password"}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.password != undefined}
                        helperText={messageError?.password}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, password: value}
                        })}
                    />

                    <TextField 
                        label={'Confirm Password'}
                        type={"password"}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.password_confirmation != undefined}
                        helperText={messageError?.password_confirmation}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, password_confirmation: value}
                        })}
                    />

                </Card>

                <BoxButtons>
                    <ButtonSubmit teacherButton={TeacherState} loading={loading} handleSubmit={handleSubmit} />
                </BoxButtons>
                {TeacherState?.id && (
                    <>
                        <Typography variant="body2" color={"grey"} textAlign={'center'} sx={{my: 5}}>
                            Dont you want continue have this account? 
                        </Typography>
                        <BoxButtons>
                            <Button variant={"outlined"} color="error" fullWidth onClick={() => setOpenDialog(true)}>
                                {loading ? <CircularProgress /> : 'Delete Account'}
                            </Button>
                        </BoxButtons>
                    </>
                )}
            </Box>
            <Snackbar 
                open={snackMessage.length > 0}
                message={snackMessage}
                autoHideDuration={4000}
                onClose={() => setSnackMessage('')}
            />
            <Dialog 
                isOpen={openDialog}
                title="Do you have sure to exclude this account?"
                onConfirm={deleteAccount}
                onClose={() => setOpenDialog(false)}
                onCancel={() => setOpenDialog(false)}
            />
        </>
    )
}

interface ButtonSubmitProps{
    teacherButton?: teacher;
    handleSubmit: () => void;
    loading: boolean;
}

function ButtonSubmit({teacherButton, handleSubmit, loading}: ButtonSubmitProps){

    if(loading){
        return <CircularProgress color="primary" />
    }

    return (
        <Button variant={"contained"} fullWidth onClick={handleSubmit}>
            {teacherButton?.id ? (
                'Update'
            ) : (
                'Register'
            )}
        </Button>
    )
}