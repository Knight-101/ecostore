import React, { useState, useEffect, useContext } from "react";
import Web3Context from "../contexts/Web3Context";

const CreateStoreModal = ({ setIsOpen }) => {
  const { createStore } = useContext(Web3Context);
  const [nameCount, setNameCount] = useState(0);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [mpvalue, mpsetter] = useState(true);
  const nameWordLim = 25;
  const descriptionWordLim = 100;

  const handleNameChange = (e) => {
    if (e.target.value.length > nameWordLim) {
      return;
    }
    setName(e.target.value);
    setNameCount(e.target.value.length);
  };
  const handleImgChange = (e) => {
    setImg(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > descriptionWordLim) {
      return;
    }
    setDescription(e.target.value);
    setDescriptionCount(e.target.value.length);
  };

  const handleSubmit = async () => {
    await createStore(name, description, img);
  };

  return (
    <div className="create-store-modal-wrap">
      <div className="create-store-modal">
        <div className="create-store-modal-header">Create Store</div>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
        <div className="create-store-modal-body">
          <div className="input-wrap">
            <input
              type="text"
              value={name}
              placeholder="Store Name"
              className="create-input"
              onChange={(e) => handleNameChange(e)}
            />
            <div>
              {nameCount}&nbsp;/&nbsp;{nameWordLim}
            </div>
          </div>
          <div className="input-wrap">
            <input
              type="text"
              value={img}
              placeholder="Store Image Link"
              className="create-input"
              onChange={(e) => handleImgChange(e)}
            />
          </div>
          <div className="input-wrap">
            <textarea
              type="text"
              value={description}
              placeholder="Description"
              className="create-input-textarea"
              onChange={(e) => handleDescriptionChange(e)}
            ></textarea>
            <div>
              {descriptionCount}&nbsp;/&nbsp;{descriptionWordLim}
            </div>
          </div>
          <div className="input-wrap tac">
            Offset Your Emissions?
            <br />
            <div className="sd-switch">
              <div className="switch-wrap">
                <div className="switch-select" onClick={() => mpsetter(true)}>
                  Yes
                </div>
                <div className="switch-select" onClick={() => mpsetter(false)}>
                  No
                </div>
                <div
                  className="switch-currently-on"
                  style={{ left: mpvalue ? 0 : 150 }}
                ></div>
              </div>
            </div>
          </div>
          <div className="input-wrap">
            <button className="create-store-button" onClick={handleSubmit}>
              Create Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreModal;
