import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PerformanceCharts =  ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 300;
        const height = 300;
        const maxSize = 200;
        const numHexagons = 5;
        const rotation = Math.PI / 6; // 30 degrees to point upwards

        // Clear previous content
        svg.selectAll('*').remove();

        const hexagonPoints = (size) => {
            const angle = Math.PI / 3;
            return Array.from({ length: 6 }, (_, i) => [
                size * Math.cos(angle * i - rotation),
                size * Math.sin(angle * i - rotation),
            ]);
        };


        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Draw hexagons
        for (let i = 0; i < numHexagons; i++) {
            const size = (maxSize / numHexagons) * (i + 1) / 2;


            g.append('polygon')
                .attr('points', hexagonPoints(size).map(point => point.join(',')).join(' '))
                .attr('fill', 'none')
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', 2);
        }

        // Get the points of the largest hexagon
        const largestHexagonPoints = hexagonPoints(maxSize / 2);

        // Add labels to the points of the largest hexagon
        largestHexagonPoints.forEach((point, index) => {
            g.append('text')
                .attr('x', point[0]*1.28)
                .attr('y', point[1]*1.28)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .attr('fill', '#FFFFFF')
                .text(data.kind[index + 1]);
        });
    }, [data]);

    return (
        <svg ref={ref} width={300} height={300}></svg>
    );
};

export default PerformanceCharts;
