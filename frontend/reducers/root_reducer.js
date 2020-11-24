import { combineReducers } from "redux";

import entitiesReducer from "./combined_red/entities_reducer";
import sessionReducer from "./session_reducer";
import errorsReducer from "./combined_red/errors_reducer";
import uiReducer from "./combined_red/ui_reducer";

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    ui: uiReducer
});

export default rootReducer