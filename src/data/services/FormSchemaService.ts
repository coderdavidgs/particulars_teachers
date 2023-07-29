import { TeacherErrorRegister, TeacherFormRegister } from "@data/@types/teacher";
import { BrowserService } from "./BrowserService";

export const FormSchemaService = {
    registerTeacher(teacher: TeacherFormRegister): TeacherErrorRegister{
        const formValidate = {} as TeacherErrorRegister;

        /*if(!teacher.nome){
            formValidate.nome = "mandatory";
            BrowserService.scrollToTop();
        }
        if(!teacher.idade){
            formValidate.idade = "mandatory";
            BrowserService.scrollToTop();
        }
        if(!teacher.valor_hora){
            formValidate.valor_hora = "mandatory";
            BrowserService.scrollToTop();
        }
        if(!teacher.descricao){
            formValidate.descricao = "mandatory";
            BrowserService.scrollToTop();
        }
        if(!teacher.email?.includes('@')){
            formValidate.email = "mandatory";
            if(teacher.email && !teacher.email?.includes('@')){
                formValidate.email = "Please, valid email";
            }
        }*/

        if(teacher.password && teacher.password_confirmation){
            if(teacher.password != teacher.password_confirmation){
                formValidate.password = 'Passwords dont equals';
                formValidate.password_confirmation = 'Passwords dont equals';
            }
        }

        return formValidate;
    },
};