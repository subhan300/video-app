import "./rowPoster.scss";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourites/favourites.actions";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
// import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";

const RowPoster = ({ item }) => {
  console.log("item ", item);
  // const { item, item: { title, original_name, original_title, name, genre_ids, poster_path, backdrop_path }, isLarge, isFavourite } = result;
  // let fallbackTitle = title || original_title || name || original_name;
  // const genresConverted = useGenreConversion(genre_ids);
  const dispatch = useDispatch();

  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToFavourites({ ...item, isFavourite }));
  };
  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch(removeFromFavourites({ ...item, isFavourite }));
  };
  const handleModalOpening = () => {
    dispatch(
      showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite })
    );
  };
  const handlePlayAction = (event) => {
    event.stopPropagation();
  };
  // let posterImage = item.VideoContent.landscape_images[0];
  // const parsePosterImage = JSON.parse(posterImage).img_name;

  return (
   <div>
	 <div
      className={`Row__poster ${"Row__poster--big"}`}
      onClick={handleModalOpening}
    >
		
      <img alt="IMAGE NOT COMING " src={"https://d3vhqpj1qjdilw.cloudfront.net/815693a0-17f6-4aef-a1b3-ea6810079f81/thumbnails/p360/portrait-p360.jpg"} />
      {/* {isLarge ? (
				poster_path ? (
					<img src={`${BASE_IMG_URL}/${poster_path}`} alt={fallbackTitle} />
				) : ""
			) : backdrop_path ? (
				<img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
			) : (
				<>
					<img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
					<div className="Row__poster__fallback">
						<span>{fallbackTitle}</span>
					</div>
				</>
			)} */}
      <div className="Row__poster-info">
        <div className="Row__poster-info--iconswrp">
          <Link
            className="Row__poster-info--icon icon--play"
            onClick={handlePlayAction}
            to={"/play"}
          >
            <FaPlay />
          </Link>
          {!false ? (
            <button
              className="Row__poster-info--icon icon--favourite"
              onClick={handleAdd}
            >
              <FaPlus />
            </button>
          ) : (
            <button
              className="Row__poster-info--icon icon--favourite"
              onClick={handleRemove}
            >
              <FaMinus />
            </button>
          )}
          <button className="Row__poster-info--icon icon--toggleModal">
            <FaChevronDown onClick={handleModalOpening} />
          </button>
        </div>
        <div className="Row__poster-info--title">
          {/* <h3>{fallbackTitle}</h3> */}
          <h3>{item?.title}</h3>
        </div>
        <div className="Row__poster-info--genres">
          <span>{item?.description}</span>
          {/* {genresConverted && genresConverted.map(genre => (
						<span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
					))} */}
        </div>
      </div>

    </div>
	{/* <br /><br />
	<video width="320" height="240" controls>
	<source src="https://d1m521lmpek5gg.cloudfront.net/" type="video/mp4" />
	Your browser does not support the video tag.
  </video> */}
   </div>
  );
};

export default RowPoster;
