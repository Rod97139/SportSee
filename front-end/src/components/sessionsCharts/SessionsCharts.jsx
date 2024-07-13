import "./SessionsCharts.scss";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SessionsCharts = ({ data }) => {
    const svgRef = useRef();



    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const { sessions } = data;

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 130;
        const height = 180 - margin.top - margin.bottom;

        // Clear previous content
        svg.selectAll('*').remove();

        const x = d3
            .scaleOrdinal()
            .domain(['L', 'M1', 'M2', 'J', 'V', 'S', 'D'])
            .range([0, width/6, width/3, width/2, 2*width/3, 5*width/6, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(sessions, d => d.sessionLength) + 40])
            .nice()
            .range([height-40, 0]);

        const line = d3
            .line()
            .x((d, i) => x(['L', 'M1', 'M2', 'J', 'V', 'S', 'D'][i]))
            .y(d => y(d.sessionLength))
            .curve(d3.curveCardinal);

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat((d, i) => ['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]).tickSize(0).tickSizeOuter(0))
            .selectAll("text")
            .attr("fill", "#FFFFFF");

        // Ajoutez le dégradé à l'élément svg
        const defs = svg.append("defs");

        const gradient = defs.append("linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")
            .attr("spreadMethod", "pad");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "rgba(255, 255, 255, 0.4032)")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "rgba(255, 255, 255, 1)")
            .attr("stop-opacity", 1);

        g.append('path')
            .datum(sessions)
            .attr('fill', 'none')
            .attr('stroke', 'url(#gradient)') // Utilisez l'ID du dégradé ici
            .attr('stroke-width', 3)
            .attr('d', line);
    }, [data]);

    return <svg className={"average-sessions"} ref={svgRef} width={180} height={180} />;
};

export default SessionsCharts;