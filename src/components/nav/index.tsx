import { Link } from "react-router-dom";
import { auth } from "../../firebaseInit";
import AdminNav from "./admin";
import ExtrifitLogo from "../../assets/Extrifit-logo.jpg";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function NavbarIndex() {
  return (
    <nav className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex items-center justify-between">
      <Link className=" -translate-x-6" to={"/"}>
        <img src={ExtrifitLogo} width={200} height={200} />
      </Link>
      <div className=" flex flex-row justify-center items-center">
        {auth.currentUser?.uid == "aUWlfwqTs2OcpK6iKJJGuFpM1l72" ? (
          <AdminNav />
        ) : null}
      </div>
      <button
        onClick={() => auth.signOut()}
        type="button"
        className="inline-flex h-10 items-center gap-x-2 rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-200"
      >
        Odhlásit se
        <ArrowRightOnRectangleIcon
          className="-mr-0.5 h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}
