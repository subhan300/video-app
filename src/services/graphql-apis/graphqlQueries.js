import { API, Headers } from "../../config/api";

const queryCategoryList = `
query MyQuery {
  listCategories {
    items {
      id
      name
    }
  }
}`;

// const queryCategoryListById=(id)=>{
//    return  `query MyQuery {
//         getCategories(id:${id} ) {
//        id
//        name
//       }
//       }
//     `
// }
const queryCategoryListById = (id) => {
  return `query MyQuery {
            getCategories(id:"${id}") {
           id 
           name
          }
          }`;
};

const queryMakeProfile = (maturityRating, isChildProfile, name, userId) => {
  console.log(">>", userId, name);
  return `
    mutation MyMutation {
        createProfiles(input: {
            maturity_rating: ${maturityRating}, 
            is_child_profile:${isChildProfile},
            name: "${name}", 
            user_id: "${userId}"
            }){
      id
    }
      }
    `;
};

export const getCategoryList = () => {
  // debugger;
  return API.post(
    "/",
    JSON.stringify({
      query: queryCategoryList,
      variables: {},
    }),

    { headers: Headers("da2-x2snvjwx5vcwfobnmmiytgbvqi") }
  )
    .then((res) => {
      // debugger
      console.log("res", res);
      if (res.status == 200) {
        return res.data.data.listCategories;
      }
      throw new Error();
    })
    .catch((err) => `Error in Category List${err}`);
};

export const getCategoryListById = (ids) => {
  // debugger;
  let id = "ccde4907-df1d-40a5-81e8-03c2831ffaaa";
  // let listByIdQuery=queryCategoryListById(id)
  // console.log("quer lis id ",listByIdQuery)
  return API.post(
    "/",
    JSON.stringify({ query: queryCategoryListById(id), variables: {} }),

    { headers: Headers("da2-x2snvjwx5vcwfobnmmiytgbvqi") }
  )
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => err);
};

export const makeProfile = ({
  userId,
  movieName,
  isChildProfile,
  maturityRating,
}) => {
  return API.post(
    "/",
    JSON.stringify({
      query: queryMakeProfile(
        maturityRating,
        isChildProfile,
        movieName,
        userId
      ),
      variables: {},
    }),

    { headers: Headers("da2-x2snvjwx5vcwfobnmmiytgbvqi") }
  )
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => err);
};

export const HomePage = `query MyQuery {
  widgetbyPage(page: HOME) {
    items {
      title
      type
      layout
      VideoTitles {
        items {
          title
          title_id
          description
          genre
          runtime
          maturity_level
          release_date
          VideoContents {
            items {
              Images {
                items {
                  file_name
                  image_path
                }
              }
            }
          }
          Credits {
            items {
              Cast {
                items {
                  name
                }
              }
              Crew {
                items {
                  name
                }
              }
            }
          }   
        }
      }
    }
  }
}
`;

export const getHomePage = async (ids) => {
  // debugger;
  let id = "ccde4907-df1d-40a5-81e8-03c2831ffaaa";
  // let listByIdQuery=queryCategoryListById(id)
  // console.log("quer lis id ",listByIdQuery)
  return API.post(
    "/",
    JSON.stringify({ query: HomePage, variables: {} }),

    { headers: Headers("da2-x2snvjwx5vcwfobnmmiytgbvqi") }
  )
    .then((res) => {
      console.log("res", res);
      return res.data.data.widgetbyPage.items;
    })
    .catch((err) => err);
};
