import { useState } from "react";
import extrifitLogo from "../../assets/Extrifit-logo.jpg";
import { auth } from "../../firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorModal from "../modals/ErrorModal";

export default function IndexLogin() {
  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onSignClick = () => {
    if (email != undefined && pass != undefined) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => setLoading(false))
        .catch((error: any) => {
          setLoading(false);
          switch (error.code) {
            case "auth/invalid-login-credentials":
              setErrorText("Špatné přihlašovací údaje.");
              setError(true);
              break;
            default:
              setErrorText("Nespecifikovaná chyba. Zkuste prosím později.");
              setError(true);
              break;
          }
        });
    }
  };

  const onModalErrorChange = () => {
    setError(!error);
  };

  return (
    <div className=" h-screen flex flex-col items-center space-y-5 top-10">
      <img src={extrifitLogo} width={300} height={300} />

      <p>Prihlasit se pro stahovani materialu:</p>
      <div className="isolate -space-y-px rounded-md shadow-sm w-1/4">
        <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
            placeholder="extrifit@extrifit.cz"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
          <label
            htmlFor="heslo"
            className="block text-xs font-medium text-gray-900"
          >
            Heslo
          </label>
          <input
            type="password"
            name="heslo"
            id="heslo"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
            placeholder="********"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
      </div>
      <button
        role="button"
        onClick={onSignClick}
        name="sendLogin"
        className=" w-56 bg-orange-500 px-5 py-1 rounded-md hover:bg-orange-700 transition-all duration-200 hover:text-white"
      >
        {loading ? "Nacitani" : "Prihlasit se"}
      </button>
      <ErrorModal
        headText={"Chyba během přihlášení"}
        text={errorText}
        modal={error}
        modalErrorChange={onModalErrorChange}
      />
    </div>
  );
}
