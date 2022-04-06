import "./Spinner.scss";
import { useSelector, RootStateOrAny } from "react-redux";

const Spinner = () => {
    const { theme } = useSelector((state: RootStateOrAny) => state);

    return (
        <div
            className={`lds-hourglass ${
                theme ? "lds-hourglass-light" : "lds-hourglass-dark"
            }`}
        ></div>
    );
};

export default Spinner;
