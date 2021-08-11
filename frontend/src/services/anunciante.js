import api from "./api";

const anuncianteService = {

    cadastrar(data) {
        try {
            var response = api.post("/anunciantes",data);
        } catch (error) {
            console.log(error);
        }
        
        return response;
    }
    
}

export default anuncianteService;