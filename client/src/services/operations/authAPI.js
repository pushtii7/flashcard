import axios from "axios";
import { userEndPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setToken, setUser } from "../../slices/authSlice";

const { LOGIN_API } = userEndPoints;

export const loginAPI =
    ({ data, navigate }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(LOGIN_API, data, {
                withCredentials: true,
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("User logged in successfully.");

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            await dispatch(setUser(response.data.user));
            await dispatch(setToken(response.data.token));

            navigate("/dashboard");
        } catch (error) {
            error.response? toast.error(error.response.data.message) : toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
