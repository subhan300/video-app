import React from "react";
import "./VideoModal.scss";
import { VscChromeClose } from "react-icons/vsc";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
function VideoModal({ showModal, setShowModal }) {
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div
      className={`${showModal ? "video_modal" : "hide"}`}
      onClick={() => {
        handleClose();
      }}
    >
      <div
        className="video_modal_content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={
            "data:image/jpeg;base64,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"
          }
        ></img>
        <div>
          <button
            onClick={() => {
              handleClose();
            }}
            className="close_btn"
          >
            <VscChromeClose />
          </button>
        </div>
        <div className="video_modal_inner_content">
          <h1>World War 3</h1>
          <p>
            World War 3 fight between different 2 groups , many have lost their
            lives , hope we will save in future , this film tell about all real
            accidents which happened during that war{" "}
          </p>
          <p>Cast : Henry John</p>
          <div className="modal_action_list">
            <div>
              {/* <img src={}></img> */}
              <FaPlus  style={{fontSize:"24px"}} />
              <h1>My List</h1>
            </div>
            <div>
              {/* <img src={}></img> */}
              <FaPlus  style={{fontSize:"24px"}} />
              <h1>Rate</h1>
            </div>
            <div>
              {/* <img src={}></img> */}
              <FaPlus style={{fontSize:"24px"}} />
              <h1>Downlaod</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
