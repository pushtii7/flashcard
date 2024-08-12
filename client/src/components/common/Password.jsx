import React, { useId, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Password = React.forwardRef(function Password(
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
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative  w-full ">
            <label className={`paragraph ${labelClassName}`} htmlFor={id}>
                {label}
            </label>
            {star && <sup className="text-[#DA0128]">*</sup>}

            <div className="relative">
                <input
                    name={name}
                    type={showPassword ? "text" : "password"}
                    className={`border outline-none p-2 w-full hover:border-[#838894] ${className} `}
                    ref={ref}
                    {...props}
                    id={id}
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="w-5 h-5 absolute top-2 right-3 cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
            </div>
            {errors && (
                <span className="ml-2 text-xs tracking-wide text-[#DA0128]">
                    {` ${errors.message}`}
                </span>
            )}
        </div>
    );
});

export default Password;
