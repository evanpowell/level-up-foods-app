"use client";

import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [image, setImage] = useState();
  const imageInput = useRef();

  function handleClick() {
    imageInput.current.click();
  }

  function handleImageChange(e) {
    const file = e.currentTarget.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!image && <p>No image selected</p>}
          {image && <Image src={image} alt="The selected image" fill />}
        </div>
        <input
          ref={imageInput}
          className={styles.input}
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
          required
        />
        <button className={styles.button} type="button" onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
