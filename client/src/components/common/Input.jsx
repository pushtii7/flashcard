import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label = "",
        star,
        type = "text",
        className = "",
        labelClassName = "",
        name = "",
        errors,
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className={`w-full`}>
            <label
                className={`paragraph ${labelClassName}`}
                htmlFor={id}
            >
                {label}
                {star && <sup className="text-[#DA0128]">*</sup>}
            </label>
            <div>
                <input
                    name={name}
                    type={type}
                    className={` border p-2 w-full hover:border-[#838894] outline-none ${className} `}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>{" "}
            {errors && (
                <span className="ml-2 text-xs tracking-wide text-[#DA0128]">
                    {` ${errors.message}`}
                </span>
            )}
        </div>
    );
});

export default Input;
