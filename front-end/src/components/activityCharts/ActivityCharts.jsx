import * as d3 from "d3";
import {useRef, useEffect, useState} from "react";

const ActivityCharts = ({data }) => {
    const svgRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    });


    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const svgContainer = d3.select(svgRef.current.parentNode);
        const svgContainerSize = svgContainer.node().getBoundingClientRect();
        const width = svgContainerSize.width - margin.left - margin.right;
        const height = 240 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.sessions.map(d => new Date(d.day)))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([60, 83])
            .nice()
            .range([height, 0]);

        // Define a specific scale for calories
        const yCalories = d3.scaleLinear()
            .domain([0, d3.max(data.sessions, d => d.calories)])
            .range([height, 0.1 * height]); // Adjust this value to change the maximum

        const color = d3.scaleOrdinal()
            .domain(['kilogram', 'calories'])
            .range(['#1f77b4', '#ff7f0e']);

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).tickSize(0))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${width},0)`)
            .call(d3.axisRight(y));

        svg.selectAll('.bar-kilogram')
            .data(data.sessions)
            .enter().append('rect')
            .attr('class', 'bar-kilogram')
            .attr('x', d => x(new Date(d.day)))
            .attr('y', d => y(d.kilogram))
            .attr('width', x.bandwidth() / 2)
            .attr('height', d => height - y(d.kilogram))
            .attr('fill', color('kilogram'));

        svg.selectAll('.bar-calories')
            .data(data.sessions)
            .enter().append('rect')
            .attr('class', 'bar-calories')
            .attr('x', d => x(new Date(d.day)) + x.bandwidth() / 2)
            .attr('y', d => yCalories(d.calories))
            .attr('width', x.bandwidth() / 2)
            .attr('height', d => height - yCalories(d.calories))
            .attr('fill', color('calories'));
    }, [data], [dimensions]);

    return <svg ref={svgRef} style={{width: "100%"}}></svg>;
};

export default ActivityCharts;