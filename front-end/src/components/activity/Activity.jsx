import "./Activity.scss";


import ActivityCharts from "../activityCharts/ActivityCharts.jsx";
import {getUserActivity} from "../../services/UserService.js";

// eslint-disable-next-line react/prop-types
const Activity = ({id}) => {
    const {data, isLoading} = getUserActivity(id);


    if (!data && isLoading) {
        return <div>Loading...</div>
    }else{
        data && console.log(data.data)
        return (
            <div className={"charts-top"}
                // onMouseMove={onMouseMove}
            >

                {data && <ActivityCharts data={data.data}/>}
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