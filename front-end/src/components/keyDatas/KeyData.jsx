// eslint-disable-next-line react/prop-types
const KeyData = ({keyData}) => {

    console.log(Object.entries(keyData), 'keyData')

    return (
        <div>
            {Object.entries(keyData).map(([key, value], index) => {
                const unity = [];
                switch (key){
                    case "calorieCount": unity.push("Calories");
                                         unity.push("kcal");
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
                      <div key={index}>
                         <h2>{unity[0]}: {value}{unity[1]}</h2>
                      </div>
                  )
                }
            )}
        </div>
    )
}

export default KeyData;