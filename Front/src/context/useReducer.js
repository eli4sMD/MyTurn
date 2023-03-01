import types from "./types";

export const reducer = (state, action)=>{

    switch (action.type) {
        case types.login: 
        return {
            isLogged: true,
            ...action.res   
            }

        case types.logout:
            localStorage.removeItem('userData')
            return {
                isLogged: false
            }
    
        default:
            break;
    }
}