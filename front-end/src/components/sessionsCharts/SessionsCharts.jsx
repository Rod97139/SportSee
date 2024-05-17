import "./SessionsCharts.scss";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
const SessionsCharts = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        // eslint-disable-next-line react/prop-types
        const { sessions } = data;

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 280 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Clear previous content
        svg.selectAll('*').remove();

        const x = d3
            .scalePoint()
            .domain(['L', 'M', 'M', 'J', 'V', 'S', 'D'])
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(sessions, d => d.sessionLength)])
            .nice()
            .range([height, 0]);

        const line = d3
            .line()
            .x((d, i) => x(['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]))
            .y(d => y(d.sessionLength))
            .curve(d3.curveCardinal);

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));


        g.append('path')
            .datum(sessions)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);
    }, [data]);

    return <svg ref={svgRef} width={500} height={300} />;
};

export default SessionsCharts;