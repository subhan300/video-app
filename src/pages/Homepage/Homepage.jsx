import React, { useEffect, useState } from "react";
import "./homepage.scss";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";

import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";

import Navbar from "../../components/Navbar/Navbar";
import {
  getCategoryList,
  getHomePage,
} from "../../services/graphql-apis/graphqlQueries";
const Homepage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [movieData, setMovieData] = useState([]);
  async function callApi() {
    // debugger

    const homePageMovies = await getHomePage();
    console.log("data>>>>2", homePageMovies);
    setMovieData(homePageMovies);
  }
  useEffect(() => {
    callApi();
  }, []);
  console.log("moved ata", movieData);

  useEffect(() => {
    async function categoryList() {
      // debugger;
      let categoryListResponse = await getCategoryList();
      // console.log("category list : ", categoryListResponse);
      setCategoryList(categoryListResponse);
    }
    categoryList();
  }, []);
  console.log("category list ", categoryList);

  //  getCategoryListById()
  return (
    <>
      <Navbar />
      {/* <DetailModal /> */}

      <motion.div
        className="Homepage"
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Banner categoryList={categoryList} />

        {movieData?.map((val) => {
          return <Row movieData={val} category={val.title} />;
        })}
        {/* <Credits /> */}
      </motion.div>
    </>
  );
};

export default Homepage;
