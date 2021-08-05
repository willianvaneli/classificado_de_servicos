import api from "../services/api";

export const signInService = (data) => {
    try {
        var response = api.post("http://localhost:3333/login",data);
    } catch (error) {
        console.log(error);
    }
    
    return response;
}