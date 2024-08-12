import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteFlashcardAPI,
    getAllFlashcardAPI,
} from "../services/operations/flashCardAPI";

const Dashboard = () => {
    const { allCards } = useSelector((state) => state.flashcard);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFlashcardAPI());
    }, []);

    const handleDelete = async (id) => {
        dispatch(deleteFlashcardAPI({ id, token }));
    };
    return (
        <div className="w-full h-full flex flex-col gap-5 p-2">
            <div className="w-full px-4 py-3 border-b flex justify-between items-center">
                <h3 className="heading1 max-md:ml-10">Flashcards</h3>
                <Link
                    to={"/createcard"}
                    className="px-3 py-2 text-lg bg-blue-500 text-white"
                >
                    Create Flash Card
                </Link>
            </div>

            <div className="flex gap-2 flex-wrap">
                {allCards.length > 0 &&
                    allCards.map((card) => (
                        <div
                            key={card?.id}
                            className="flex flex-col gap-2 border px-2 py-4 max-w-[30%]"
                        >
                            <div className="flex-1 my-auto mb-1 border-b">
                                <h1 className="text-lg font-semibold mb-2">
                                    {card?.question}
                                </h1>
                                <p className="text-base">{card?.answer}</p>
                            </div>
                            <div className="w-full flex gap-2">
                                <Link
                                    to={`/editcard/${card.id}`}
                                    className="w-full border p-2 text-center bg-green-300"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(card.id)}
                                    className="w-full border p-2 bg-red-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;
