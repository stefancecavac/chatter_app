import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { Layout } from "./Layout";
import { SignupPage } from "./pages/SignupPage";
import { UseAuthContext } from "./context/AuthContext";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { AddFriendPage } from "./pages/AddFriendPage";

function App() {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Layout>
                <HomePage></HomePage>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>

        <Route
          path="/search"
          element={
            user ? (
              <Layout>
                <SearchPage></SearchPage>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>

        <Route
          path="/add-friend"
          element={
            user ? (
              <Layout>
                <AddFriendPage></AddFriendPage>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>

        <Route
          path="/:receiverId"
          element={
            user ? (
              <Layout>
                <ChatPage></ChatPage>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>

        <Route path="/signup" element={!user ? <SignupPage></SignupPage> : <Navigate to={"/"}></Navigate>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
