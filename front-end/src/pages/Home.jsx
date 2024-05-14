
import Welcome from "../components/welcome/Welcome.jsx";
import {useParams} from "react-router-dom";
import {getUser} from "../services/UserService.js";
import {formatUserInfos} from "../models/UserFactory.js";
import KeyData from "../components/keyDatas/KeyData.jsx";

const Home = () => {
    const {userId} = useParams();

    const {data, isLoading} = getUser(userId);
    let user = {};
    if (data && !isLoading) {
        user = formatUserInfos(data.data);
        console.log(user);
    } else {
        return <div>Loading...</div>
    }

    return (
    <div>
        <Welcome userInfos={user.userInfos} />
        <KeyData keyData={user.keyData} />
    </div>
  )
}

export default Home