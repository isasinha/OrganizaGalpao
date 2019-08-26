import { Usuario } from "../app/Modelo/usuario";
import { Action } from "@ngrx/store";



export const UsuarioActionTypes ={
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR: 'USER_LOGIN_ERROR'
};

export interface UsuarioState {
    loading: boolean,
    error: boolean,
    usuario: Usuario
}

const initialState: UsuarioState = {
    loading: false,
    error: false,
    usuario: null
};

export class LoginAction implements Action{
    type = UsuarioActionTypes.USER_LOGIN;
    usuario: Usuario;

    constructor(public email: string, public senha: string){

    }
}

export function usuarioReducer(state: any = initialState, action: LoginAction){
    switch (action.type){
        case UsuarioActionTypes.USER_LOGIN:
            return {...state, loading: true};
        
        case UsuarioActionTypes.USER_LOGIN_SUCCESS:
            return {...state, usuario: action.usuario, loading: false};
        
        case UsuarioActionTypes.USER_LOGIN_ERROR:
            return {...state, loading: false, error: true};

        default:
            return state;
    }
}