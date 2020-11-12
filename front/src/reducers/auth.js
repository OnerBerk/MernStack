import {REGISTER_SUCCESS,REGISTER_FAIL } from '../action/type'

const initialState ={
    token: localStorage.getItem('token'),
    isAutenticated: null, //permetras de de set  a true quand le login seras erffectué avec succée
    loading: true,  //pour etre sur que les user ou autre sont deja chargé 
    user : null
}

export default function(state  = initialState, action){
     const { type, payload } = action;
     switch(type){
         case REGISTER_SUCCESS:
             localStorage.setItem('token',payload.token);
             return{
                 ...state,
                 ...payload,
                 isAutenticated:true,
                 loading:false
             }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
             return{
                 ...state,
                 token : null,
                 isAutenticated : false,
                 loading : false
             }
        default:
            return state

     }
}