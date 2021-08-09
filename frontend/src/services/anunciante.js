import api from "./api";

const anuncianteService = {

    cadastrar(data) {
        try {
            var response = api.post("http://localhost:3333/anunciantes",data);
        } catch (error) {
            console.log(error);
        }
        
        return response;
    }
    
}

export default anuncianteService;