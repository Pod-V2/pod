import React, { useEffect, useState } from "react";

/**
 *
 * @param {*} props
 * @param {number} props.listingUrl Generated listing id
 * @returns
 */
export const ListingInputsImage = (props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = inputs[0];

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!file || !validImageTypes.includes(file.type)) {
      alert("Invalid file type. Please choose an image file.");
      return;
    }

    console.log("asdads", inputs[0]);

    // Upload the file as a POST request
    fetch("http://localhost:3000/api/image", {
      method: "POST",
      body: file,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        Upload Image:{" "}
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
    </div>
  );
};

export default ListingInputsImage;
