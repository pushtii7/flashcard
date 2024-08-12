import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    createFlashcardAPI,
    getFlashCardByIdAPI,
    updateFlashcardAPI,
} from "../services/operations/flashCardAPI";
import Input from "../components/common/Input";

const CreateCard = () => {
    const { register, handleSubmit, formState, setValue } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.flashcard);
    const { token } = useSelector((state) => state.auth);
    const { id } = useParams();

    const fetchData = async () => {
        const response = await dispatch(getFlashCardByIdAPI(id));
        if (response) {
            setValue("question", response.question);
            setValue("answer", response.answer);
        }
    };
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const submit = (data) => {
        if (id) {
            dispatch(updateFlashcardAPI({ id, data, token, navigate }));
        } else {
            dispatch(createFlashcardAPI({ data, token, navigate }));
        }
    };

    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
            <div className="w-full h-full max-w-[720px] flex items-center flex-col p-8 border">
                <h1 className="text-2xl mb-6 w-full">
                    {id ? "Edit flash card" : "Create flash card"}
                </h1>
                <form
                    onSubmit={handleSubmit(submit)}
                    className="w-full flex flex-col gap-4"
                >
                    <Input
                        star="true"
                        label="Question"
                        placeholder="Enter a question..."
                        type="text"
                        className="bg-transparent"
                        name="question"
                        errors={errors?.question}
                        {...register("question", {
                            required: "Question is required",
                        })}
                    />

                    <Input
                        star="true"
                        label="Answer"
                        placeholder="Enter answer..."
                        type="text"
                        className="bg-transparent"
                        name="answer"
                        errors={errors?.answer}
                        {...register("answer", {
                            required: "Answer is required",
                        })}
                    />

                    <button
                        type="submit"
                        className="max-w-max px-3 py-2 bg-blue-500 text-white"
                        disabled={loading}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCard;
