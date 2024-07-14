import "./Home.scss";
import Welcome from "../../components/welcome/Welcome.jsx";
import {useParams} from "react-router-dom";
import {getUser} from "../../services/UserService.js";
import {formatUserInfos} from "../../models/UserFactory.js";
import KeyData from "../../components/keyDatas/KeyData.jsx";
import Score from "../../components/score/Score.jsx";
import Activity from "../../components/activity/Activity.jsx";
import Performance from "../../components/performance/Performance.jsx";
import Sessions from "../../components/sessions/Sessions.jsx";


const Home = () => {
    const {userId} = useParams();

    const {data, isLoading} = getUser(userId);
    console.log(isLoading, data, "isloading");
    let user = null;
    if (data) {
        user = formatUserInfos(data.data);
    }






    return (
         (isLoading || !user) ? (<div className="loader"></div>) :
        <div className="home-container">
            <Welcome userInfos={user.userInfos} />
            <div className="data-wrapper">
                <div className="charts">
                    <Activity id={userId} />
                    <div className="charts-bottom">
                        <Sessions id={userId} />
                        <Performance id={userId} />
                        <Score percentage={user.todayScore*100} />
                    </div>
                </div>
                <KeyData keyData={user.keyData} />
            </div>
        </div>
    )
}

export default Home