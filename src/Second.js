import React from "react";
import { Context } from ".";
import { Button } from "@material-ui/core";

export function Second() {
  const { storage } = React.useContext(Context);
  const [images, setImages] = React.useState([]);

  const fetchImagesData = React.useCallback(async () => {
    storage
      .ref("images")
      .listAll()
      .then(
        (result) => {
          const promises = result.items.map((imageRef) => imageRef.getDownloadURL());
          Promise.all(promises).then((urls) => setImages(urls));
        }
      );
  }, [storage]);

  React.useEffect(() => {
    fetchImagesData();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      storage
        .ref(`images/${image.name}`)
        .put(image)
        .then(() => fetchImagesData());
    }
  };

  return (
    <div className="contentWrapper">
      <h2>Firebase Storage</h2>
      <Button variant="contained" color="primary" component="label">
        Загрузить фаил
        <input type="file" hidden onInput={handleChange} />
      </Button>
      {images.map((url) => (
        <img key={url} style={{ backgroundImage: `url(${url})` }} />
      ))}
    </div>
  );
}
