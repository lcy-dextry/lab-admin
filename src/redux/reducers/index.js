import { combineReducers } from "redux";
import loginState from './loginState';
import tutorText from './tutorText';
import publication from './publication';
import members from './members';
import news from './news';
import activity from './activity';

const reducer = combineReducers({
    loginState,
    tutorText,
    publication,
    members,
    news,
    activity,
});
export default reducer;