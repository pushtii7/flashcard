import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";

const navlinks = [
    {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
        icon: <IoHomeOutline className="w-10 h-10 p-2" />,
        div: <div className="border-b h-[1px]"></div>,
    },
];

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setIsOpen(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="relative z-50 top-0 left-0">
            <div
                className={`md:hidden absolute top-5 ${
                    isOpen ? "left-[72px]" : "left-3"
                } z-50`}
            >
                {isOpen ? (
                    <span onClick={toggleNavbar}>
                        <RiMenuFoldLine className="w-10 h-10 border rounded-sm p-2 bg-white" />
                    </span>
                ) : (
                    <span onClick={toggleNavbar}>
                        <RiMenuUnfoldLine className="w-10 h-10 border rounded-sm p-2 bg-white" />
                    </span>
                )}
            </div>
            <div
                className={`w-[64px] h-full left-0 top-0 flex flex-col items-center gap-2 border-r p-2 pb-3 fixed ${
                    isOpen ? "bg-white" : "hidden"
                }`}
            >
                <div>
                    <NavLink to={"/dashboard"}>
                        <h1 className="text-3xl font-semibold mb-2 text-black pb-2 border-b">FC</h1>
                    </NavLink>
                </div>
                <div className="flex flex-col gap-3">
                    {navlinks.map((link) => (
                        <div key={link.id} className="flex flex-col gap-3">
                            <NavLink to={link.path} className="link">
                                {link.icon}
                            </NavLink>
                            {link?.div}
                        </div>
                    ))}
                </div>
                <div className="h-full flex flex-col justify-end items-center gap-3">
                    <div onClick={handleLogout} className={"link border-b p-2"}>
                        <MdLogout className="w-10 h-10 p-2" />
                    </div>
                    <img
                        src={`http://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`}
                        alt="user profile"
                        loading="lazy"
                        className="w-8 h-8 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
