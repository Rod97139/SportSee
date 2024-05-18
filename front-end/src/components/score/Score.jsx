import "./Score.scss";

// eslint-disable-next-line react/prop-types
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
const Score = ({ percentage }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 200;
        const height = 200;
        const thickness = 8;
        const radius = (Math.min(width, height) / 2) - (thickness / 2);

        // Clear previous content
        svg.selectAll('*').remove();

        // Create the arc
        const arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle((2 * Math.PI) * (percentage / 100))
            .cornerRadius(10);

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2}) rotate(-90)`);

        g.append('path')
            .attr('d', arc)
            .attr('fill', '#E60000')
            .attr('stroke', '#E60000')
            .attr('stroke-linecap', 'round');

        g.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', radius - thickness) // Le rayon du cercle doit être inférieur au rayon de l'arc
            .attr('fill', '#FFFFFF'); // Définissez la couleur du cercle à #FFFFFF



    }, [percentage]);

    return (
        <div className="score">
            <svg ref={ref} width={200} height={200}></svg>
        </div>
    )
        ;
};

export default Score;
