import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseInit";
import { useEffect, useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import ImageContainerUser from "./image";

type DataType = { id: string; data: DocumentData }[];
export default function DocumnentIndex() {
  const [data, setData] = useState<DataType>();

  const id = localStorage.getItem("userProductId");
  const name = localStorage.getItem("userProductName");
  const image = localStorage.getItem("userProductImage");
  const text = localStorage.getItem("userProductText");

  const subscribeToCollection = () => {
    if (id == null) return;

    const unsubscribe = onSnapshot(
      collection(db, "materials", id, "images"),
      (querySnapshot) => {
        const newData: DataType = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            id: doc.id,
            data: doc.data(),
          })
        );

        setData(newData);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = subscribeToCollection();

    return unsubscribe;
  }, []);
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
      <div className=" flex justify-between">
        <Link className="  right-8" to={"/"}>
          <ArrowUturnLeftIcon className="h-8 w-8 text-orange-500 hover:text-orange-700 transition-all duration-200" />
        </Link>
      </div>

      <div className=" flex pt-8 justify-between">
        <div className=" flex  items-center">
          <img
            width={300}
            height={300}
            className=" w-[300px] h-[300px] object-contain"
            src={"https://fotoulozna-7007.rostiapp.cz/assets/" + image}
            alt={name || "fotkax"}
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-orange-500">
              {name}
            </h2>
            <p className="text-lg tracking-tight text-gray-900">{text}</p>
          </div>
        </div>
      </div>
      <h3 className=" font-bold">Fotky:</h3>
      {data !== undefined ? (
        <div className=" grid grid-cols-4 pt-10 gap-10 justify-center items-center content-center">
          {data?.map((item, index) => (
            <ImageContainerUser key={index} item={item} id={id} />
          ))}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
