import "./Sessions.scss";
import {getUserSessions} from "../../services/UserService.js";
import SessionsCharts from "../sessionsCharts/SessionsCharts.jsx";

// eslint-disable-next-line react/prop-types
const Sessions = ({id}) => {
    const {data, isLoading} = getUserSessions(id);
    if (!data && isLoading) {
        return <div>Loading...</div>
    }else{
        data && console.log(data.data)
        return (
            <div className={"charts-sessions"}>
                {data && <SessionsCharts data={data.data}/>}
            </div>
        );
    }
}

export default Sessions;