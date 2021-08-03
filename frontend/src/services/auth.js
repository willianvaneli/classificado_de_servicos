import api from "../services/api";

export const signInService = (data) => {
    try {
        var response = api.post("login",data)
    } catch (error) {
        console.log(error);
    }
    
    return response;
}