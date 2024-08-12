import React, { useState, useEffect } from "react";

const FlashCard = ({ data }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [data]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`flashcard ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}
        >
            <div className="flashcard-inner">
                <div className="flashcard-front">
                    <p className="text-xl font-semibold">{data.question}</p>
                </div>
                <div className="flashcard-back">
                    <p className="text-xl font-semibold">{data.question}</p>
                    <p className="text-base">{data.answer}</p>
                </div>
            </div>
        </div>
    );
};

export default FlashCard;
