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

        const totalWidth = 180;
        const numberOfDays = sessions.length;
        const rectWidth = totalWidth / numberOfDays;

        svg.selectAll('.background-session-rect')
            .data(sessions)
            .enter().append('rect')
            .attr('class', 'background-session-rect')
            .attr('x', (d, i) => {
                if (i === 1) {
                    return i * rectWidth + 22;
                }

                return i * rectWidth + 40 / i
            })

            .attr('y', 15)
            .attr('width', 180)
            .attr('height', 150)
            .attr('fill', 'black')
            .attr('opacity', 0)
            .lower();

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

        const newWidth = 151 / sessions.length;

        svg.selectAll('.hover-rect')
            .data(sessions)
            .enter().append('rect')
            .attr('class', 'hover-rect')
            .attr('x', (d, i) => x(i )+ 30)
            .attr('y', 15)
            .attr('width', newWidth)
            .attr('height', 150)
            .attr('fill', '#C4C4C480')
            .attr('opacity', 0)
            .attr('data-id', (d, i) => i)
            .on('mouseover', function() {
                const currentId = d3.select(this).attr('data-id');
                const oppositeId = sessions.length - 1 - Number(currentId);
                // Sélectionner le rectangle de fond correspondant en utilisant l'index
                const correspondingBackgroundRect = d3.selectAll('.background-session-rect').filter((d, i) => i === Number(oppositeId) );
                // // Modifier l'opacité du rectangle de fond correspondant
                correspondingBackgroundRect.attr('opacity', 0.18);

                g.append('circle') // Assurez-vous d'utiliser le bon groupe SVG pour ajouter le cercle
                    .attr('class', 'highlight-point')
                    .attr('cx', x(['L', 'M1', 'M2', 'J', 'V', 'S', 'D'][currentId])) // Utilisez votre échelle X pour obtenir la position réelle
                    .attr('cy', y(sessions[currentId].sessionLength)) // Utilisez votre échelle Y pour obtenir la position réelle
                    .attr('r', 5) // Taille du cercle
                    .attr('fill', 'white'); // Couleur du cercle

                const infoGroup = g.append('g')
                    .attr('class', 'info-group')

                    // Ajouter un carré blanc
                infoGroup.append('rect')
                    .attr('class', 'info-box')
                    .attr('x', x(['L', 'M1', 'M2', 'J', 'V', 'S', 'D'][currentId]) - 20) // Ajustez selon la position souhaitée
                    .attr('y', y(sessions[currentId].sessionLength) - 30) // Ajustez selon la position souhaitée
                    .attr('width', 40) // Largeur du carré
                    .attr('height', 20) // Hauteur du carré
                    .attr('fill', 'white');

                // Ajouter du texte pour la durée
                infoGroup.append('text')
                    .attr('class', 'info-text')
                    .attr('x', x(['L', 'M1', 'M2', 'J', 'V', 'S', 'D'][currentId]) - 15) // Ajustez pour centrer le texte
                    .attr('y', y(sessions[currentId].sessionLength) - 15) // Ajustez pour centrer le texte verticalement dans le carré
                    .text(`${sessions[currentId].sessionLength}min`) // Texte à afficher
                    .attr('fill', 'black') // Couleur du texte
                    .attr('font-size', '10px'); // Taille du texte

                    console.log(currentId);

                if (currentId == 0) {
                    infoGroup.attr('transform', `translate(40, 0)`);
                } else if (currentId == 6) {
                    infoGroup.attr('transform', `translate(-40, 0)`);
                }

                console.log(sessions)

            })
            .on('mouseout', function() {
                const currentId = d3.select(this).attr('data-id');
                // Sélectionner le rectangle de fond correspondant en utilisant l'index
                const oppositeId = sessions.length - 1 - Number(currentId);
                // Sélectionner le rectangle de fond correspondant en utilisant l'index
                const correspondingBackgroundRect = d3.selectAll('.background-session-rect').filter((d, i) => i === Number(oppositeId) );
                // // Modifier l'opacité du rectangle de fond correspondant
                // Modifier l'opacité du rectangle de fond correspondant

                correspondingBackgroundRect.attr('opacity', 0); // Masquer le rectangle lorsque le survol est terminé
                g.select('.highlight-point').remove();
                g.select('.info-group').remove();

            });

    }, [data]);

    return <svg className={"average-sessions"} ref={svgRef} width={180} height={180} />;
};

export default SessionsCharts;