import React, { useEffect, useState } from "react";
import TopNavbar from "../components/common/TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlashcardAPI } from "../services/operations/flashCardAPI";
import FlashCard from "../components/common/FlashCard";

const Home = () => {
    const { allCards } = useSelector((state) => state.flashcard);
    const dispatch = useDispatch();
    const [currentActive, setCurrentActive] = useState(0);

    useEffect(() => {
        dispatch(getAllFlashcardAPI());
    }, []);

    const handleNext = () => {
        setCurrentActive((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setCurrentActive((prev) => prev - 1);
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <TopNavbar />
            <div className="w-full flex flex-col items-center py-20">
                <div className="flex justify-between w-[500px] my-4 ">
                    {currentActive !== 0 && (
                        <p
                            onClick={handlePrevious}
                            className="p-2 border bg-blue-500 text-white cursor-pointer"
                        >
                            Previous
                        </p>
                    )}
                    {
                        <p className="text-lg border">{currentActive+1} of {allCards.length}</p>
                    }
                    {currentActive < allCards.length - 1 && (
                        <p
                            onClick={handleNext}
                            className="p-2 border bg-blue-500 text-white cursor-pointer"
                        >
                            Next
                        </p>
                    )}
                </div>
                {allCards.length > 0 && (
                    <FlashCard
                        data={allCards[currentActive]}
                        key={currentActive}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
