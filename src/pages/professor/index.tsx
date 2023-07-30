import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import { StudentInterface } from "@data/@types/students";
import useTeacherPanel from "@data/hooks/pages/professor/useTeacherPanel";
import { TextFormatService } from "@data/services/TextFormatService";
import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, Typography } from "@mui/material";
import { AccordionStyled } from "@styles/pages/teacher/index.style";

export default function TeacherPanelPage(){
    const {students, expanded, setExpanded} = useTeacherPanel();

    return (
        <>
            <PageTitle title="Students List"/>
            <Fetch 
                data={students}
                message={"nothing found"}
                render={(students) => {
                    return(
                        <StudentsList studentsProp={students} expanded={expanded} setExpanded={setExpanded} />
                    )
                }}
            />
        </>
    )
}

interface StudentsListProps{
    studentsProp: StudentInterface[],
    setExpanded: (value: string) => void,
    expanded: string; 
}

function StudentsList({ studentsProp, expanded, setExpanded}: StudentsListProps){


    return(
        <>
            {studentsProp.map((student) => {
                return <Box key={student.id} sx={{my: 5}}>
                    <AccordionStyled expanded={expanded === student.id.toString()} onChange={(_, b) => {
                        b ? setExpanded(student.id.toString()) : setExpanded("")
                    }}>
                        <AccordionSummary>
                            <Typography variant="h6">
                                {student.nome}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h5">
                                <Icon>
                                    person
                                </Icon>
                                {student.nome}
                            </Typography>

                            <Typography sx={{mb: 2, mt: 5}}>
                                <Icon>
                                    calendar_month
                                </Icon>
                                {TextFormatService.dateFromText(student.data_aula as string)}
                            </Typography>

                            <Typography>
                                <Icon>
                                    email
                                </Icon>
                                {student.email}
                            </Typography>
                        </AccordionDetails>
                    </AccordionStyled>
                </Box>       
            })}
        </>
    )
}