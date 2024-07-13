import "./Activity.scss";


import ActivityCharts from "../activityCharts/ActivityCharts.jsx";
import {getUserActivity} from "../../services/UserService.js";
import ChartWithDimensions from "../activityCharts/ChatWithDimensions.jsx";

// eslint-disable-next-line react/prop-types
const Activity = ({id}) => {
    const {data, isLoading} = getUserActivity(id);


    if (!data && isLoading) {
        return <div>Loading...</div>
    }else{
        data && console.log(data.data)
        return (
            <div className={"charts-top"}>
                <h2 className="title-activity">Activité quotidienne</h2>
                <h3 className="legend-weight">Poids (kg)</h3>
                <h3 className="legend-calories">Calories brûlées (kCal)</h3>
                {data && <ActivityCharts data={data.data} />}
                {/* {data && <ChartWithDimensions />} */}
            </div>
        );
    }


    //
    // function onMouseMove(event) {
    //     const [x, y] = d3.pointer(event);
    //     setDataActivity(dataActivity.slice(-200).concat(Math.atan2(x, y)));
    // }


}

export default Activity;