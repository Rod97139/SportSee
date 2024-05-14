
// eslint-disable-next-line react/prop-types
const Welcome = ({userInfos}) => {
    return (
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <h1>Bonjour {userInfos.firstName}</h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    )
}

export default Welcome