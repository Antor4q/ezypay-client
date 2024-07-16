import { useContext } from "react";
import { PayContext } from "../provider/ContextProvider";

const useProvider = () => {
    const context = useContext(PayContext)
    return context;
};

export default useProvider;