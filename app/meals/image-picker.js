"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const inputRef = useRef(null);
  const [pickedImage, setPickedImage] = useState(null);

  const handleClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="the image that you selected" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} onClick={handleClick} type="button">
          Pick an Image
        </button>
      </div>
    </div>
  );
}
