import { useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const IndexUpload = () => {
  const data = useSelector((state: RootState) => state.counterReducer);
  const [image, setImage] = useState<null | File>(null);
  const [name, setName] = useState<null | string>(null);
  const [text, setText] = useState<string>("");

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image && name) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("text", text);

      axios
        .post("https://fotoulozna-7007.rostiapp.cz/file/upload", formData, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((response) => console.log(response))
        .catch((error) => {
          console.error("Error uploading image", error);
        });
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col">
      <div className=" flex flex-row gap-5 items-center pb-5">
        <label
          htmlFor="name"
          className="block text-xs font-medium text-gray-900"
        >
          Jmeno
        </label>
        <input
          name="name"
          id="name"
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
          placeholder="Extrifit Multi .."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className=" flex flex-row gap-5 items-center pb-5">
        <label
          htmlFor="text"
          className="block text-xs font-medium text-gray-900"
        >
          Text
        </label>
        <input
          name="text"
          id="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
          placeholder="text .."
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <input type="file" onChange={handleChange} />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default IndexUpload;
