
import { API, Headers } from "../../config/api";



const queryMoviesList = `
query MyQuery {
  listVideoTitles {
    items {
      VideoContent {
        id
        base_url
        landscape_images
        portrait_images
        url_720p
        url_1080p
      }
      id
      title
      description
      genres
      maturity_level
      release_date
    }
  }
}

  `;




export const getMovies =async () =>{

   const res= await API.post("/",JSON.stringify({query:queryMoviesList,variables:{}}), 
    
    { headers:Headers("da2-rp6bvuodxjcexmqqadx35vedne") }
      )
  
      try{
        console.log("res",res)
      if(res.status==200){
        return res.data.data.listVideoTitles.items
      }
      throw new Error()
      }catch(err){
        return err
      }
   
}

