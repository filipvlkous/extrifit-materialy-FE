import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddDocModal from "../admin/uploadImg/AddDocModal";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import SuccesModal from "../modals/SuccesModal";
import ErrorModal from "../modals/ErrorModal";

export default function AdminIndex() {
  const [modal, setModal] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModaError] = useState(false);

  const data = useSelector((state: RootState) => state.counterReducer);

  const onModalChange = () => {
    setModal(!modal);
  };

  const onModalSuccesChange = () => {
    setModalSucces(!modalSucces);
  };

  const onModalErrorChange = () => {
    setModaError(!modalError);
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
      <button
        onClick={() => setModal(true)}
        type="button"
        className=" group inline-flex items-center gap-3 absolute right-8 rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-900 transition-all dura shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Přidat produkt
        <PlusCircleIcon className="h-8 w-8 text-green-500  group-hover:text-green-700 transition-all duration-200" />
      </button>

      <div className="grid grid-cols-4 pt-20 justify-center items-center content-center ">
        {data.data?.map((item, index) => (
          <Link
            key={index}
            to={`/upload/${item.data.name}`}
            className=" group flex items-center flex-col cursor-pointer p-2 shadow-none hover:shadow-xl rounded-lg  transition-all duration-300"
            state={{ item }}
            onClick={() => {
              localStorage.setItem("adminProductId", item.id),
                localStorage.setItem("adminProductName", item.data.name),
                localStorage.setItem("adminProductImage", item.data.image),
                localStorage.setItem("adminProductText", item.data.text);
            }}
          >
            <img
              alt={item.data.image}
              className=" group-hover:scale-105  duration-300 w-[230px] h-[230px] object-contain"
              width={200}
              height={200}
              src={
                "https://fotoulozna-7007.rostiapp.cz/assets/" + item.data.image
              }
            />
            <p className=" group-hover:scale-105 duration-300 font-semibold">
              {item.data.name}
            </p>
          </Link>
        ))}
      </div>

      <AddDocModal
        modal={modal}
        modalChange={onModalChange}
        modalChangeSucces={onModalSuccesChange}
        modalChangeError={onModalErrorChange}
      />

      <SuccesModal
        text="Produkt byl přidán."
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
