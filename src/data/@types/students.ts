export interface StudentInterface {
    nome: string;
    email: string;
    data_aula: string | Date;
    id: number;
}

export interface StudentErrorResponseInterface extends Omit<StudentInterface, 'id'> {

}