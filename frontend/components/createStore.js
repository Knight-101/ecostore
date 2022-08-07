import React, { useState, useEffect } from "react";

const CreateStoreModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [nameCount, setNameCount] = useState(0);
  const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionCount, setDescriptionCount] = useState(0);
  const nameWordLim = 25;
  const descriptionWordLim = 100;

  const handleNameChange = (e) => {
    if (e.target.value.length > nameWordLim) {
      return;
    }
    setName(e.target.value);
    setNameCount(e.target.value.length);
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > descriptionWordLim) {
      return;
    }
    setDescription(e.target.value);
    setDescriptionCount(e.target.value.length);
  }

  return (
    <div className="create-store-modal-wrap">
      <div className="create-store-modal">
        <div className="create-store-modal-header">Create Store</div>
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
          <div className="input-wrap">
            <button className="create-store-button">Create Store</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreModal;
