import "./Score.scss";

// eslint-disable-next-line react/prop-types
const Score = ({ score }) => {
    return (
        <div className="score">
            <span className="score-text">Score: {score}</span>
        </div>
    );
}

export default Score;