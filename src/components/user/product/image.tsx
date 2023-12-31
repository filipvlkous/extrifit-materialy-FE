import { FolderArrowDownIcon } from "@heroicons/react/24/outline";

import { DocumentData } from "firebase/firestore";
import axios from "axios";

export default function ImageContainerUser({
  item,
  id,
}: {
  item: DocumentData;
  id: string | null;
}) {
  //   https://fotoulozna-7007.rostiapp.cz

  const truncateText = (text: string) => {
    if (text.length <= 30) {
      return text;
    } else {
      return text.slice(0, 30) + "...";
    }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        "https://fotoulozna-7007.rostiapp.cz/file/download/" + item.data.name,
        {
          responseType: "blob",
          params: {
            id: id,
          }, // Important: responseType must be 'blob'
        }
      );

      // Create a temporary link and trigger a click to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.data.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const text = truncateText(item.data.name);
  return (
    <div className=" relative flex group justify-center flex-col items-center gap-5">
      <img
        className=" h-[200px] w-[200px] object-contain"
        height={200}
        width={200}
        src={
          "https://fotoulozna-7007.rostiapp.cz/assets/" +
          id +
          "/" +
          item.data.name
        }
      />
      <p className="  text-sm">{text}</p>
      <div
        onClick={downloadFile}
        className={`group h-[260px] w-[240px] cursor-pointer rounded-lg invisible absolute group-hover:visible bg-slate-500 opacity-30 `}
      ></div>
      <a
        onClick={downloadFile}
        className=" invisible cursor-pointer group-hover:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <FolderArrowDownIcon className={`h-10 w-10 text-green-400 `} />
      </a>
    </div>
  );
}
