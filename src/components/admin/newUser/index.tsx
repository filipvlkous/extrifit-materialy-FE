import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import UserModalAdd from "./newModalUser";
import { useState } from "react";
import SuccesModal from "../../modals/SuccesModal";
import ErrorModal from "../../modals/ErrorModal";

export default function IndexUsers() {
  const data = useSelector((state: RootState) => state.counterReducer);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModaError] = useState(false);
  const [visible, setVisible] = useState(false);
  const deleteUser = async (id: string, email: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    };
    try {
      await axios
        .delete(
          `https://fotoulozna-7007.rostiapp.cz/firebase/delete_user?id=${id}&email=${email}`,
          config
        )
        .then(() => {
          alert("uzivatel smazan");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  const onModalChange = () => {
    setVisible(!visible);
  };

  const onModalSuccesChange = () => {
    setModalSucces(!modalSucces);
  };

  const onModalErrorChange = () => {
    setModaError(!modalError);
  };

  if (data.users == null) return;

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
      <button
        onClick={() => setVisible(true)}
        type="button"
        className=" group flex items-center gap-3 absolute right-8 -top-14 rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-900 transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <p>Přidat Uživatele</p>
        <PlusCircleIcon className="h-8 w-8 text-green-500  group-hover:text-green-700 transition-all duration-200" />
      </button>
      <div className="mt-14 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>

                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.users.map((person) => (
                  <tr key={person.data.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {person.data.name}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.data.email}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a
                        onClick={() => deleteUser(person.id, person.data.email)}
                        className="text-orange-600 hover:text-orange-900 cursor-pointer"
                      >
                        Smazat uživatele
                        <span className="sr-only">, {person.data.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserModalAdd
        modal={visible}
        modalChange={onModalChange}
        modalChangeSucces={onModalSuccesChange}
        modalChangeError={onModalErrorChange}
      />

      <SuccesModal
        text="Uživatel byl přidán."
        modal={modalSucces}
        modalSucessChange={onModalSuccesChange}
      />

      <ErrorModal
        headText="Chyba při vytváření uživatele."
        text={`Stala se nějaká chyba. Prosím kontaktuje fvlk@dafit.cz.{" "}
                        ${(<br />)} Děkuji`}
        modal={modalError}
        modalErrorChange={onModalErrorChange}
      />
    </div>
  );
}
