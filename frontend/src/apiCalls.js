import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("users/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    console.log("resp..",res);
    localStorage.setItem("jwt", res.data.token);
    localStorage.setItem("userInfo", JSON.stringify(res.data.user));
  } catch (err) {
    console.log("erporr",err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};