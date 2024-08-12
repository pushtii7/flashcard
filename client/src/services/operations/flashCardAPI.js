import axios from "axios";
import { flashCardEndPoints } from "../apis";
import { setAllCards, setLoading } from "../../slices/flashCardSlice";
import toast from "react-hot-toast";

const {
    CREATE_FLASHCARD_API,
    UPDATE_FLASHCARD_API,
    DELETE_FLASHCARD_API,
    GET_FLASHCARDS_API,
    GET_FLASHCARD_BY_ID_API
} = flashCardEndPoints;

export const createFlashcardAPI =
    ({ data, navigate, token }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(CREATE_FLASHCARD_API, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Flash card created successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

export const updateFlashcardAPI =
    ({ data, id, navigate, token }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.put(
                `${UPDATE_FLASHCARD_API}/${id}`,
                data,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Flash card updated successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

export const deleteFlashcardAPI =
    ({ id, token }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(
                `${DELETE_FLASHCARD_API}/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Flash card deleted successfully");
            dispatch(getAllFlashcardAPI())
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

export const getAllFlashcardAPI = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(GET_FLASHCARDS_API);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        dispatch(setAllCards(response.data.data));
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
    } finally {
        dispatch(setLoading(false));
    }
};

export const getFlashCardByIdAPI = (id)=> async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${GET_FLASHCARD_BY_ID_API}/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data.data
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
    } finally {
        dispatch(setLoading(false));
    }
}