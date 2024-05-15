import "./KeyData.scss";

// eslint-disable-next-line react/prop-types
const KeyData = ({keyData}) => {
    return (
        <ul className="keyData-container">
            {Object.entries(keyData).map(([key, value], index) => {
                const unity = [];
                switch (key){
                    case "calorieCount": value = "" + (value/1000).toFixed(3);
                                         value = value.replace(".", ",");
                                         unity.push("Calories");
                                         unity.push("kCal");
                                         break;
                    case "proteinCount": unity.push("Protéines");
                                         unity.push("g");
                                         break;
                    case "carbohydrateCount": unity.push("Glucides");
                                              unity.push("g");
                                              break;
                    case "lipidCount": unity.push("Lipides");
                                       unity.push("g");
                                       break;
                }
                return (
                    <li className={"keyData-card keyData-card-" + key} key={index}>
                        <div className={"text-wrapper"}>
                            <span className="keyData-value">{value}{unity[1]}</span>
                            <span className="keyData-name">{unity[0]}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default KeyData;