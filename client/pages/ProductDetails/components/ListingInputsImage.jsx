import React, { useEffect, useState } from "react";

/**
 *
 * @param {*} props
 * @param {string} props.imageUrl - imageUrl state variable from parent component
 * @param {function} props.setImageUrl - setter for imageUrl
 * @returns
 */
export const ListingInputsImage = (props) => {
  const [inputs, setInputs] = useState({});
  const {imageUrl, setImageUrl} = props;

  const handleChange = (event) => {
    setInputs(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = inputs[0];
    console.log(file)

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!file || !validImageTypes.includes(file.type)) {
      alert("Invalid file type. Please choose an image file (jpg, png).");
      return;
    }

    console.log("asdads", inputs[0]);

    // Upload the file as a POST request
    fetch("http://localhost:3000/api/image", {
      method: "POST",
      body: file
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image successfully uploaded!")
        setImageUrl(data.url);
        console.log(imageUrl)
      })
      .catch((error) => console.error(error));

    // for (let i = 0; i < inputs.length; i++) {
    //   const res = await fetch(`http://localhost:3000/image/listing${key}`);
    //   const data = await res.json();
    //   console.log("data", data);
    //   fetch(data, {
    //     // mode: "no-cors",
    //     method: "PUT",
    //     body: inputs[i],
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).catch((error) => {
    //     console.log(inputs);

    //     console.error("Error:", error);
    //   });
    // }
  };

  return (
    <div>
      <label>
        Upload Image &lt;3mb:{" "}
        <input
          className="input"
          type="file"
          name="listingImage"
          defaultValue={inputs.listingImage || ""}
          onChange={handleChange}
          multiple
        />
      </label>
      <input type="button" value="Upload" onClick={handleSubmit} />
      <div>
        {imageUrl !== '' ? <img src={imageUrl}/> : <></>}
      </div>
    </div>
  );
};

export default ListingInputsImage;
