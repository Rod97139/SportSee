import "./Score.scss";

// eslint-disable-next-line react/prop-types
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
const Score = ({ percentage }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 140;
        const height = 140;
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


        // Ajoutez le texte au centre du cercle
        g.append('text')
            .text(`${percentage} %`)
            .attr('x', 0)
            .attr('y', -10) // déplace légèrement vers le haut pour faire de la place pour les deux lignes de texte
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', '#000000') // couleur du texte
            .style('font-size', '24px') // taille du texte
            .style('font-weight', 'bold') // poids du texte
            .attr('transform', 'rotate(90)'); // Ajoutez cette ligne pour faire pivoter le texte

        g.append('text')
            .text('de votre')
            .attr('x', 0)
            .attr('y', 20) // positionne au centre pour être entre la première ligne de texte et "objectif"
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', '#74798C') // couleur du texte
            .style('font-size', '14px') // taille du texte
            .style('font-weight', '600') // poids du texte
            .attr('transform', 'rotate(90)'); // Ajoutez cette ligne pour faire pivoter le texte

        g.append('text')
            .text('objectif')
            .attr('x', 0)
            .attr('y', 40) // déplace légèrement vers le bas pour être sous "de votre"
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', '#74798C') // couleur du texte
            .style('font-size', '14px') // taille du texte
            .style('font-weight', '600') // poids du texte
            .attr('transform', 'rotate(90)'); // Ajoutez cette ligne pour faire pivoter le texte


    }, [percentage]);

    return (
        <div className="score">
            <h2 className="title-score">Score</h2>
            <svg ref={ref} width={140} height={140}></svg>
        </div>
    )
        ;
};

export default Score;
