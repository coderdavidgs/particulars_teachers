import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle"
import TeacherCardList from "@components/data-display/TeacherCard/TeacherCardList";
import Dialog from "@components/feedback/Dialog";
import useDetailTeacher from "@data/hooks/pages/professor/useDetailTeacher"
import { TextFormatService } from "@data/services/TextFormatService";
import { Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import { BoxCardTeacher, BoxDescription, BoxImage } from "@styles/pages/teacher/detailTeacher.style"
import InputMask from 'react-input-mask';

export default function DetailTeacherPage(){
    const { teacherHook, 
        teachers, 
        selectTeacher, 
        openDialog, 
        setOpenDialog, 
        setStudent, 
        handleSubmit,
        snackMessage, 
        setSnackMessage,
        studentError,
        setStudentError } = useDetailTeacher();

    return(
        <Container>
        <PageTitle title="Teacher Details" subtitle="See the habilities of your teacher" />

        <BoxCardTeacher>
            <BoxImage picture={teacherHook?.foto_perfil}/>
            <BoxDescription>
                <div className="box_esquerda">
                    <Typography variant="h6">{teacherHook?.nome}</Typography>
                    <Typography variant="body2" className="descricao" paragraph sx={{ my: 2 }}>
                        {teacherHook?.descricao}
                    </Typography>
                </div>
                <div className="box_direita">
                    <Typography variant="body2" sx={{ my: 2 }}>Preço Hora / Aula</Typography>
                    <Typography variant="h4" paragraph>
                        {TextFormatService.currency(teacherHook?.valor_hora as number)}
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={() => {setOpenDialog(true)}}>
                        Contratar 
                    </Button>
                </div>
            </BoxDescription>
        </BoxCardTeacher>
        <Typography variant="body2" color={"grey"} sx={{my: 10}}>
            {teacherHook?.descricao}
        </Typography>
        <Fetch data={teachers?.filter(({id}) => id !== teacherHook?.id) ?? []} render={(filtedTeachers) => {
            return (
                <>
                    <PageTitle 
                        title="Suggested Teachers"
                        color={'primary.light'}
                    />
                    <TeacherCardList teachers={filtedTeachers!} onClick={selectTeacher} />
                </>
            )
        }} 
            message={'Not Found Any Teacher'}
            maxLength={3}
        />
        <Dialog 
            isOpen={!openDialog}
            title={'fill in your information'}
            onConfirm={handleSubmit}
            onClose={() => {
                setStudentError(undefined);
                setOpenDialog(false);
            }}
        >
            <TextField 
                label={'Your Name'}
                error={studentError?.nome !== undefined}
                helperText={studentError?.nome}    
                fullWidth
                onChange={({target: {value}}) => {
                    setStudent((prevState) => {
                        return {...prevState, nome: value};
                    });
                }}
            />

            <TextField 
                label={'Your Email'}
                error={studentError?.email !== undefined}
                helperText={studentError?.email}  
                fullWidth
                type={'email'}
                sx={{my: 3}}
                onChange={({target: {value}}: any) => {
                    setStudent((prevState) => {
                        return {...prevState, email: value};
                    });
                }}
            />

            <InputMask 
                mask={'99/99/9999 99:99'}
                onChange={({target: {value}}: any) => {
                    setStudent((prevState) => {
                        return {...prevState, data_aula: value};
                    });
                }}    
            >
                {() => {
                    return(
                        <TextField 
                            label={'Class Time'}
                            error={studentError?.data_aula !== undefined}
                            helperText={studentError?.data_aula as string}  
                            fullWidth
                        />
                    )
                }}
            </InputMask>
        
        </Dialog>

        <Snackbar open={snackMessage.length > 0} message={snackMessage} autoHideDuration={4000} onClose={() => setSnackMessage('')}/>
        </Container>
    )
}