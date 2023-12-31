import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../firebaseInit";
import { useEffect, useState } from "react";
import AddImgModal from "./AddImgModal";
import {
  ArrowUturnLeftIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import SuccesModal from "../../modals/SuccesModal";
import ErrorModal from "../../modals/ErrorModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import ImageContainer from "./Image";

type DataType = { id: string; data: DocumentData }[];
export default function DocumnentIndex() {
  const token = useSelector((state: RootState) => state.counterReducer);
  const [data, setData] = useState<DataType>();
  const [modal, setModal] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModaError] = useState(false);
  const id = localStorage.getItem("adminProductId");
  const name = localStorage.getItem("adminProductName");
  const image = localStorage.getItem("adminProductImage");
  const text = localStorage.getItem("adminProductText");

  const navigate = useNavigate();
  const onModalChange = () => {
    setModal(!modal);
  };

  const onModalSuccesChange = () => {
    setModalSucces(!modalSucces);
  };

  const onModalErrorChange = () => {
    setModaError(!modalError);
  };

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

  const delteProduct = async () => {
    await axios
      .delete(
        `https://fotoulozna-7007.rostiapp.cz/file/deleteProduct?id=${id}&image=${image}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
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

        <button
          onClick={delteProduct}
          type="button"
          className="group inline-flex items-center gap-3 absolute  right-8 rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-900 transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <p>Smazat produkt</p>
          <TrashIcon
            className={`h-8 w-8 text-red-400 group-hover:text-red-700 duration-200 transition-all `}
          />
        </button>
        <button
          onClick={() => setModal(true)}
          type="button"
          className=" group inline-flex items-center gap-3 absolute right-52 rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-900 transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <p>Přidat fotku</p>
          <PlusCircleIcon className="h-8 w-8 text-green-500  group-hover:text-green-700 transition-all duration-200" />
        </button>
      </div>

      <div className=" flex pt-10 justify-between">
        <div className=" flex  items-center">
          <img
            className=" object-contain w-[300px] h-[300px]"
            width={300}
            height={300}
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
            <ImageContainer key={index} item={item} id={id} />
          ))}
        </div>
      ) : (
        <p>loading</p>
      )}

      <AddImgModal
        productId={id}
        productName={name}
        modal={modal}
        modalChange={onModalChange}
        modalChangeSucces={onModalSuccesChange}
        modalChangeError={onModalErrorChange}
      />
      <SuccesModal
        text="Fotka byla přidána."
        modal={modalSucces}
        modalSucessChange={onModalSuccesChange}
      />

      <ErrorModal
        headText="Chyba při nahrávání"
        text={`Stala se nějaká chyba. Prosím kontaktuje fvlk@dafit.cz.{" "}
                        ${(<br />)} Děkuji`}
        modal={modalError}
        modalErrorChange={onModalErrorChange}
      />
    </div>
  );
}
