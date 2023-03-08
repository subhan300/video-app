import React, { useEffect } from "react";
import {
  getCategoryList,
  getCategoryListById,
  getHomePage,
  makeProfile,
} from "./services/graphql-apis/graphqlQueries";
import { getMovies } from "./services/graphql-apis/moviesQueries";

function Rough() {
  useEffect(() => {
    async function callApi() {
      // const r=await getCategoryList()
      // const t = await getMovies();
      const home = await getHomePage();
      //  console.log("r>>>>>>>>",r)
      console.log("home page  2", home);
      //  getCategoryListById()
      // makeProfile({maturityRating:"SEVEN_PLUS",isChildProfile:false,movieName:"Mingo ",userId:"12"})
    }
    callApi();
  }, []);

  return (
    <div>
      Rough
      <button
        onClick={() => {
          makeProfile({
            maturityRating: "SEVEN_PLUS",
            isChildProfile: false,
            movieName: "Mingo ",
            userId: "12",
          });
        }}
      >
        MAKE PROFILE
      </button>
    </div>
  );
}

export default Rough;
