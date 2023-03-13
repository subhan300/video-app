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
import DetailModal from "../../components/DetailModal/DetailModal";
import VideoModal from "../../components/DetailModal/VideoModal";
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
  const [showModal, setShowModal] = useState(false);

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
      {/* <DetailModal showModal={showModal} setShowModal={setShowModal} /> */}
      <VideoModal showModal={showModal} setShowModal={setShowModal} />
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

        {movieData?.map((val, i) => {
          return (
            <div key={i}>
              <Row
                movieData={val}
                category={val.title}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
          );
        })}
        {/* <Credits /> */}
      </motion.div>
    </>
  );
};

export default Homepage;
