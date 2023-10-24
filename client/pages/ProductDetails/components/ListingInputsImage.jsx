import React, { useCallback, useEffect, useState } from "react";
import Image from "mui-image";
import { debounce_leading } from "../debounce";

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
    console.log(event.target.files)
    console.log(inputs)
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('asdads', inputs);

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
        console.log("Image URL")
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

  const debouncedSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(e.target)
    debounce_leading(handleSubmit(e))}
    , [inputs])

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
      <input type="button" value="Upload" onClick={debouncedSubmit} />
      <div>
        {imageUrl !== '' ? <Image src={imageUrl} width="50ch"/> : <></>}
      </div>
    </div>
  );
};

export default ListingInputsImage;
