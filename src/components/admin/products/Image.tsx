import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";

export default function ImageContainer({
  item,
  id,
}: {
  item: DocumentData;
  id: string | null;
}) {
  const token = useSelector((state: RootState) => state.counterReducer);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState("hidden");

  const delteImage = async (name: string, idDoc: string) => {
    setLoading(true);
    await axios
      .delete(
        `https://fotoulozna-7007.rostiapp.cz/file/deleteImage?id=${id}&name=${name}&doc=${idDoc}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then(() => setLoading(false))
      .catch((e) => console.log(e));
  };

  const truncateText = (text: string) => {
    if (text.length <= 30) {
      return text;
    } else {
      return text.slice(0, 30) + "...";
    }
  };

  const text = truncateText(item.data.name);
  return (
    <div
      title={item.data.name}
      className="parrent relative flex justify-between "
      onMouseEnter={() => setHover("visible")}
      onMouseLeave={() => setHover("hidden")}
    >
      <div className=" flex justify-center  flex-col items-center gap-5">
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
        <p className=" w-[250px] text-sm">{text}</p>
      </div>
      {loading ? (
        <svg
          aria-hidden="true"
          className=" absolute mx-auto my-auto left-0 right-0 top-0 bottom-0 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <button
          disabled={loading}
          className=" align-middle justify-center items-center absolute cursor-pointer "
          onClick={() => delteImage(item.data.name, item.id)}
        >
          <TrashIcon
            className={`h-8 w-8 ${hover} text-red-400 hover:text-red-700 duration-200 transition-all `}
          />
        </button>
      )}
    </div>
  );
}
