import "./banner.scss";
import React,{useState} from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import { BiChevronDown, BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils";
import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";
import LargeDropdown from "../dropdown/largeDropdown";

const Banner = ({ type ,categoryList}) => {
	let selector;
	switch (type) {
		case "movies":
			selector = selectTrendingMovies;
			break;
		case "series":
			selector = selectNetflixSeries;
			break;
		default:
			selector = selectNetflixMovies;
			break;
	}

	// const myData = useSelector(selector);
	// const { loading, error, data: results } = myData;
	// const finalData = results[randomize(results)];
	// const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	// const description = truncate(finalData?.overview, 150);
	const dispatch = useDispatch();
	const loading=false;
	const error=false

	const handlePlayAnimation = event => {
		event.stopPropagation();
	};

	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}
	const [selectElement,setSelectEelement]=useState("")
	const[blockContent,setBlockContent]=useState(false)
	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{loading && <SkeletonBanner />}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{!loading &&  (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/9Er52vtNYd5Mhwk81IdPQoCZxgV.jpg")`
						// `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`
					}}
				>
					
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<div>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">
							{/* {fallbackTitle} */}
							Witcher
							</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to={"/play"}
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">
							{/* {description} */}
							A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.
							</motion.p>
						</div>

				<div>
					<LargeDropdown categoryList={categoryList}   blockContent={blockContent} setBlockContent={setBlockContent}  setSelectEelement={setSelectEelement} >
					<button className='dropdown_genres'>
        
		<div 
		 value={selectElement} >{selectElement != ""?selectElement : "Genres"}</div>
      <div>  <BiChevronDown  style={{fontSize:"1.2rem",color:"white"}} /></div>
    
        </button>

						
					</LargeDropdown>
				</div>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

export default React.memo(Banner);