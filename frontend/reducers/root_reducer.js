import { combineReducers } from "redux";

import entitiesReducer from "./combined_red/entities_reducer";
import sessionReducer from "./session_reducer";
import errorsReducer from "./combined_red/errors_reducer";

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer

});

export default rootReducer