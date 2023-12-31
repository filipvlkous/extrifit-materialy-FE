import { auth } from "../../firebaseInit";
import AdminIndex from "./admin";
import UserIndex from "./user";

export default function IndexHome() {
  return auth.currentUser?.uid == "aUWlfwqTs2OcpK6iKJJGuFpM1l72" ? (
    <AdminIndex />
  ) : (
    <UserIndex />
  );
}
