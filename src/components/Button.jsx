const Button = function ({ type, children }) {
    if (type === "button") {
        return (
            <button className="p-[10px] rounded-[10px] hover:bg-red-500 hover:cursor-pointer  text-white bg-red-700 transition duration-[1s]">
                {children}
            </button>
        );
    }
};

export default Button;
