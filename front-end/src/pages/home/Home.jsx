import "./Home.scss";
import Welcome from "../../components/welcome/Welcome.jsx";
import {useParams} from "react-router-dom";
import {getUser} from "../../services/UserService.js";
import {formatUserInfos} from "../../models/UserFactory.js";
import KeyData from "../../components/keyDatas/KeyData.jsx";
import Score from "../../components/score/Score.jsx";

const Home = () => {
    const {userId} = useParams();

    const {data, isLoading} = getUser(userId);
    let user = {};
    if (data && !isLoading) {
        user = formatUserInfos(data.data);
    } else {
        return <div>Loading...</div>
    }

    return (
    <div className="home-container">
        <Welcome userInfos={user.userInfos} />
        <div className="data-wrapper">
            <div className="charts">
                <Score score={user.todayScore} />
            </div>
            <KeyData keyData={user.keyData} />
        </div>
    </div>
  )
}

export default Home