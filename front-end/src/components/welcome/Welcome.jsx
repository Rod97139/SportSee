import "./Welcome.scss";

// eslint-disable-next-line react/prop-types
const Welcome = ({userInfos}) => {
    return (
        <div className="welcome">
            {/* eslint-disable-next-line react/prop-types */}
            <h1 className="welcome-title">Bonjour <span className="welcome-title-firstname">{userInfos.firstName}</span> </h1>
            <p className="welcome-content" >Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    )
}

export default Welcome