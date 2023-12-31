import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import axios from "axios";

export default function AddImgModal({
  productId,
  productName,
  modal,
  modalChange,
  modalChangeSucces,
  modalChangeError,
}: {
  productId: string | null;
  productName: string | null;
  modal: boolean;
  modalChange: () => void;
  modalChangeSucces: () => void;
  modalChangeError: () => void;
}) {
  const data = useSelector((state: RootState) => state.counterReducer);
  const [images, setImages] = useState<null | File[]>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);

      setImages(filesArray);
    }
  };

  const handleUpload = () => {
    if (images && productName) {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      formData.append("productName", productName);
      axios
        .post(
          `https://fotoulozna-7007.rostiapp.cz/file/uploadImages?key=${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${data.token}`,
            },
          }
        )
        .then(() => {
          modalChange();
          setLoading(false);
        })
        .then(() => modalChangeSucces())
        .catch((error) => {
          modalChangeError();
          console.error("Error uploading image", error);
        });
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PhotoIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Přidat fotku
                    </Dialog.Title>

                    <input
                      multiple
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
                    Přidat fotku
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
