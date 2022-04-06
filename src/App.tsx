import "./App.scss";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import CardsArea from "./components/CardsArea";
import { changeTheme } from "./redux/themeActions";

function App() {
    const { theme } = useSelector((state: RootStateOrAny) => state);
    const dispatch = useDispatch();

    return (
        <div className={`App ${theme ? "light-theme" : "dark-theme"}`}>
            <div
                className={`App-header ${theme ? "light-theme" : "dark-theme"}`}
            >
                Pokedex
            </div>

            <div className="btn">
                <button onClick={() => dispatch(changeTheme())}>
                    {theme ? "Go Dark!" : "Go Light!"}
                </button>
            </div>

            <CardsArea />

            <div
                className={`App-footer ${theme ? "light-theme" : "dark-theme"}`}
            >
                <div className="footer-div">Hleb Shypula © 2022</div>
            </div>
        </div>
    );
}

export default App;
