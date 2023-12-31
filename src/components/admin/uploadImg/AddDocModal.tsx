import { Dialog, Transition } from "@headlessui/react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import axios from "axios";
import ErrorModal from "../../modals/ErrorModal";

export default function AddDocModal({
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
  const data = useSelector((state: RootState) => state.counterReducer);
  const [image, setImage] = useState<null | File>(null);
  const [name, setName] = useState<null | string>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image && name) {
      setLoading(true);
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
        .then(() => {
          modalChange();
          setLoading(false);
        })
        .then(() => modalChangeSucces())
        .catch((error) => {
          modalChangeError();
          console.error("Error uploading image", error);
        });
    } else {
      setError(true);
    }
  };

  const onModalErrorChange = () => {
    setError(!error);
  };

  return (
    <>
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
                      <FolderPlusIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3  sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Přidat produkt
                      </Dialog.Title>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Název
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            placeholder="CFM 80 1000g"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="pt-5">
                        <label
                          htmlFor="text"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Text
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="text"
                            id="text"
                            className=" h-[200px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            placeholder="Text o produktu.."
                            onChange={(e) => setText(e.target.value)}
                          />
                        </div>
                      </div>
                      <input
                        className="pt-8"
                        type="file"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      disabled={loading}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 duration-200 transition-all"
                      onClick={handleUpload}
                    >
                      Přidat produkt
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ErrorModal
        headText={"Chyba formuláře"}
        text={"Prosím vyplňte jméno a vložte fotku"}
        modal={error}
        modalErrorChange={onModalErrorChange}
      />
    </>
  );
}
