import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PerformanceCharts =  ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 200;
        const height = 200;
        const maxSize = 200;
        const numHexagons = 4;
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

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Draw hexagons
        for (let i = 0; i < numHexagons; i++) {
            const size = (maxSize / numHexagons) * (i + 1) / 2;

            g.append('polygon')
                .attr('points', hexagonPoints(size).map(point => point.join(',')).join(' '))
                .attr('fill', 'none')
                .attr('stroke', colorScale(i))
                .attr('stroke-width', 2);
        }

        // Get the points of the largest hexagon
        const largestHexagonPoints = hexagonPoints(maxSize / 2);

        // Add labels to the points of the largest hexagon
        largestHexagonPoints.forEach((point, index) => {
            g.append('text')
                .attr('x', point[0])
                .attr('y', point[1])
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .text(data.kind[index + 1]);
        });
    }, [data]);

    return (
        <svg ref={ref} width={200} height={200}></svg>
    );
};

export default PerformanceCharts;
