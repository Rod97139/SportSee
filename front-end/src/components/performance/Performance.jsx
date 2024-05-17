import PerformanceCharts from "../peformanceCharts/PerformanceCharts.jsx";
import {getUserPerformance} from "../../services/UserService.js";
import "./Performance.scss";

// eslint-disable-next-line react/prop-types
const Performance = ({id}) => {
    const {data, isLoading} = getUserPerformance(id);
    if (!data && isLoading) {
        return <div>Loading...</div>
    }else{
        data && console.log(data.data)
        return (
            <div className={"charts-performance"}>
                {data && <PerformanceCharts data={data.data}/>}
            </div>
        );
    }
}

export default Performance;