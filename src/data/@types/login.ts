export interface LoginInterface{
    email: string;
    password: string;
}

export interface LoginErrorInterface extends LoginInterface{
    
}

export interface ResponseLoginInterface{
    refresh_token: string;
    token: string;
}