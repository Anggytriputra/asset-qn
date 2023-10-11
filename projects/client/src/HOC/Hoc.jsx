import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userSlice";
import Spinner from "../components/Spinner";
import axios from "axios";
import Login from "../pages/Login";

export default function HOC({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const Token = localStorage.getItem("token");
        // console.log("hoc token", token);
        setIsLoading(true);
        const user = await axios
          .get("http://localhost:2000/auth/v1", {
            params: {
              token: Token,
            },
          })
          .then((res) => res.data.user);
        // console.log("userHoc", res);
        dispatch(login(user[0]));
        setIsLoading(false);
      } catch (err) {
        // console.log("err hoc", err);
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (isLoading) return <Spinner />;
  return children;
}
