import { CHANGE_THEME } from "./themeTypes";

const initialState = {
    theme: true,
};

export default function themeReducer(state = initialState, action: any) {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                theme: !state.theme,
            };

        default:
            return state;
    }
}
