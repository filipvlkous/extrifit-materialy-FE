import { useEffect, useState } from "react";
import IndexLogin from "./components/login";
import IndexHome from "./components/home";
import { auth } from "./firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import IndexUpload from "./components/admin/uploadImg";
import Error500 from "./components/500";
import IndexNewUser from "./components/admin/newUser";
import NavbarIndex from "./components/nav";
import { useAppDispatch } from "./Redux/store";
import { fetchPosts, saveToken, fetchUsers } from "./Redux/actions/userActions";
import DocumnentIndex from "./components/admin/products/documnent_index";
import ProductUserIndex from "./components/user/product";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const currentUid = auth.currentUser?.uid == import.meta.env.VITE_USER_ID;

  if (!currentUid) {
    return <Navigate to="/500_error" replace />;
  }
  return children;
};

const UserRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const currentUid = auth.currentUser?.uid != import.meta.env.VITE_USER_ID;

  if (!currentUid) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavbarIndex />
        <IndexHome />
      </>
    ),
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <NavbarIndex />
        <IndexUpload />
      </ProtectedRoute>
    ),
  },
  {
    path: "/upload/:document",
    element: (
      <ProtectedRoute>
        <NavbarIndex />
        <DocumnentIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <NavbarIndex />
        <IndexNewUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/500_error",
    element: (
      <>
        <NavbarIndex />
        <Error500 />
      </>
    ),
  },
  {
    path: "/product/:name",
    element: (
      <UserRoute>
        <NavbarIndex />
        <ProductUserIndex />
      </UserRoute>
    ),
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const [signe, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await dispatch(saveToken(token));
        dispatch(fetchPosts());
        if (user.uid == import.meta.env.VITE_USER_ID) {
          dispatch(fetchUsers());
        }
        setSigned(true);
      } else {
        await dispatch(saveToken(undefined));
        setSigned(false);
      }
      setLoading(false);
    });

    return unsubscribe; // This will let it clean up when the ArtistScreen unmounts
  }, []);

  return loading ? (
    <div>loading</div>
  ) : signe ? (
    <>
      <RouterProvider router={router} />
    </>
  ) : (
    <IndexLogin />
  );
}

export default App;
