import { combineReducers } from "redux";
import loginState from './loginState';
import carousel from './carousel'
import tutorText from './tutorText';
import researchText from './researchText';
import publication from './publication';
import members from './members';
import news from './news';
import activity from './activity';

const reducer = combineReducers({
    loginState,
    carousel,
    tutorText,
    researchText,
    publication,
    members,
    news,
    activity,
});
export default reducer;