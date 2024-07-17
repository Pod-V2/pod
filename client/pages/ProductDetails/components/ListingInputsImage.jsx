import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "mui-image";
import { debounce_leading } from "../debounce";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
  width: "20rem",
  height: "20rem",
};
/**
 * Image upload component with preview
 * @param {*} props
 * @param {string} props.imageUrl - imageUrl state variable from parent component
 * @param {function} props.setImageUrl - setter for imageUrl
 * @returns
 */
export const ListingInputsImage = (props) => {
  const [inputs, setInputs] = useState({});
  const { imageUrl, setImageUrl } = props;
  const [tempFileUrl, setFileUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setInputs(event.target.files);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files);
  };

  const handleSubmit = useCallback(
    debounce_leading(async (event) => {
      event.preventDefault();
      const file = inputs[0];
      console.log(file);

      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (!file || !validImageTypes.includes(file.type)) {
        alert("Invalid file type. Please choose an image file (jpg, png).");
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
          console.log("Image successfully uploaded!");
          setImageUrl(data.url);
          console.log("Image URL");
          console.log(imageUrl);
          setSuccess(true);
        })
        .catch((error) => console.error(error));
    }),
    [inputs]
  );

  const debouncedSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleSubmit(e);
    },
    [inputs]
  );

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <label>
          Upload Image &lt;3mb:{" "}
          <Button
            component="label"
            variant="outlined"
            size="small"
            startIcon={<CloudUploadIcon />}
            sx={{ m: 1 }}
          >
            {inputs.listingImage ? inputs.listingImage : "Select Image"}
            <VisuallyHiddenInput
              type="file"
              accept="image/"
              onChange={handleChange}
            />
          </Button>
        </label>
        <Button
          variant="contained"
          size="small"
          endIcon={<CloudUploadIcon />}
          onClick={debouncedSubmit}
          sx={{ m: 1 }}
        >
          Upload
        </Button>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            ...commonStyles,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: 'grey.500'
          }}
        >
          {tempFileUrl !== "" ? (
            <Image src={tempFileUrl} width="50ch" />
          ) : (
            <div>Preview</div>
          )}
        </Box>
      </Box>
      <Stack sx={{ width: "100%" }} >
        {success && (
          <Alert severity="success">Image successfully uploaded!</Alert>
        )}
      </Stack>
    </>
  );
};

export default ListingInputsImage;
