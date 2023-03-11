import axios from "../axiosInstance"


export const getMovies=()=>{
    axios
    .get(`movie/popular?api_key=f2f17df4b381feaaf2e173664ceba22a`)
    .then(response => {
          return response
    })
    .catch(error => {
      console.log(error);
      return error
    });
}