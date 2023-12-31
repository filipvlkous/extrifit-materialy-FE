import { Link } from "react-router-dom";

export default function Error500() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p>Nepovoleny vstup</p>
      <Link to={"/"}> Domu</Link>
    </div>
  );
}
