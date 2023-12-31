import { Dialog, Transition } from "@headlessui/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import axios from "axios";

export default function UserModalAdd({
  modal,
  modalChange,
  modalChangeSucces,
  modalChangeError,
}: {
  modal: boolean;
  modalChange: () => void;
  modalChangeSucces: () => void;
  modalChangeError: () => void;
}) {
  const [email, setEmail] = useState<null | string>(null);
  const [pass, setPass] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);

  const data = useSelector((state: RootState) => state.counterReducer);

  const inputReset = (inputElement: string) => {
    const ele = document.getElementById(inputElement) as HTMLInputElement;
    ele.value = "";
  };

  // https://fotoulozna-7007.rostiapp.cz
  const clickAddUser = async () => {
    try {
      await axios
        .post(
          "https://fotoulozna-7007.rostiapp.cz/firebase/new_user",
          { data: { email, pass, name } },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
          }
        )
        .then(() => {
          setEmail("");
          setPass("");
          setName("");
          inputReset("email");
          inputReset("name");
          inputReset("password");
        })
        .then(() => modalChange())
        .then(() => modalChangeSucces())
        .catch((error) => {
          modalChangeError();
          console.error("Error uploading image", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={modalChange}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out"
              enterFrom="translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="ease-out"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="translate-x-full opacity-0"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <UserPlusIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Přidat uživatele
                    </Dialog.Title>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          placeholder="extrifit@extrifit.cz..."
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pt-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Jméno
                      </label>
                      <div className="mt-1">
                        <input
                          name="name"
                          id="name"
                          className="  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          placeholder="Jméno..."
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pt-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Heslo
                      </label>
                      <div className="mt-1">
                        <input
                          name="password"
                          id="password"
                          className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          placeholder="Heslo..."
                          onChange={(e) => setPass(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 duration-200 transition-all"
                    onClick={clickAddUser}
                  >
                    Přidat uživatele
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
