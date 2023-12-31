import { Link } from "react-router-dom";
export default function AdminNav() {
  return (
    <div className=" flex gap-16">
      <Link to="/"> Produkty</Link>
      <Link to="/users">Uživatelé</Link>
    </div>
  );
}
