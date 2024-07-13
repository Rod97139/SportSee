import * as d3 from "d3";
import {useRef, useEffect, useState} from "react";
import "./ActivityCharts.scss";

const ActivityCharts = ({data}) => {
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
        const height = 150 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain([1, 2, 3, 4, 5, 6, 7])
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
            .range(['#282D30', '#E60000']);

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickSize(0));

        svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${width},0)`)
            .call(d3.axisRight(y).tickSize(0).tickValues([60, 72, 84]))
            .call(g => g.select(".domain").remove()) // Suppress the y-axis line

        svg.selectAll('.background-rect')
            .data(data.sessions)
            .enter().append('rect')
            .attr('class', 'background-rect')
            .attr('x', (d, i) => x(i + 1))
            .attr('y', 0)
            .attr('width', x.bandwidth())
            .attr('height', 100)
            .attr('fill', '#C4C4C480')
            .attr('opacity', 0)

        // svg.selectAll('info-rect')
        //     .data(data.sessions)
        //     .enter().append('rect')
        //     .attr('class', 'info-rect')
        //     .attr('x', (d, i) => x(i + 1))
        //     .attr('y', 0)
        //     .attr('width', x.bandwidth())
        //     .attr('height', 100)
        //     .attr('fill', 'red')
        //     .attr('opacity', 0)

        svg.selectAll('.bar-kilogram')
            .data(data.sessions)
            .enter().append('path')
            .attr('class', 'bar-kilogram')
            .attr('d', function(d, i) {
                const x0 = x(i + 1) + x.bandwidth() * 0.32;
                const y0 = y(d.kilogram);
                const barWidth = 9;
                const barHeight = height - y(d.kilogram);
                const rx = 5; // Rayon pour les coins arrondis en haut
                // Commence en bas de la barre pour dessiner vers le haut
                return `M${x0},${y0 + barHeight} 
                        v-${barHeight - rx} 
                        q0,${-rx},${rx},${-rx} 
                        h${barWidth - 2*rx} 
                        q${rx},0,${rx},${rx} 
                        v${barHeight - rx} 
                        Z`;
            })
            .attr('fill', color('kilogram'));

        svg.selectAll('.bar-calories')
            .data(data.sessions)
            .enter().append('path')
            .attr('class', 'bar-calories')
            .attr('d', function(d, i) {
                const x0 = x(i + 1) + x.bandwidth() * 0.58; // Ajustez cette valeur pour positionner les barres rouges à côté des bleues
                const y0 = yCalories(d.calories); // Utilisez la mesure appropriée pour les calories
                const barWidth = 9; // Vous pouvez ajuster la largeur si nécessaire
                const barHeight = height - yCalories(d.calories); // Calculez la hauteur en fonction des calories
                const rx = 5; // Rayon pour les coins arrondis en haut
                // Dessine un chemin avec les coins supérieurs arrondis pour les barres rouges
                return `M${x0},${y0 + barHeight} 
                        v-${barHeight - rx} 
                        q0,${-rx},${rx},${-rx} 
                        h${barWidth - 2*rx} 
                        q${rx},0,${rx},${rx} 
                        v${barHeight - rx} 
                        Z`;
            })
            .attr('fill', color('calories'))

        svg.selectAll('.hover-rect')
            .data(data.sessions)
            .enter().append('rect')
            .attr('class', 'hover-rect')
            .attr('x', (d, i) => x(i + 1))
            .attr('y', 0)
            .attr('width', x.bandwidth())
            .attr('height', 100)
            .attr('fill', '#C4C4C480')
            .attr('opacity', 0)
            .attr('data-id', (d, i) => i)
            .on('mouseover', function() {
                const currentId = d3.select(this).attr('data-id');
                // Sélectionner le rectangle de fond correspondant en utilisant l'index
                const correspondingBackgroundRect = d3.selectAll('.background-rect').filter((d, i) => i === Number(currentId));
                // Modifier l'opacité du rectangle de fond correspondant
                correspondingBackgroundRect.attr('opacity', 0.5);

                

                            // Créer le carré rouge
                const bbox = this.getBBox(); // Obtenir les coordonnées et dimensions de la bougie survolée
                console.log(data.sessions[currentId]);
                const group = d3.select(this.parentNode).append('g')
                    .attr('class', 'info-group')
                if (currentId == 6) {
                    group.attr('transform', `translate(${-( bbox.width + 70)}, ${bbox.y})`); // Positionner le groupe à droite de la bougie // Positionner le groupe à gauche de la bougie
                }
                // Ajoutez le carré rouge au groupe
                group.append('rect')
                    .attr('x', bbox.x + bbox.width + 10) // Positionner à droite de la bougie
                    .attr('y', bbox.y)
                    .attr('width', 50) // Largeur du carré
                    .attr('height', 75) // Hauteur du carré
                    .attr('fill', 'red');

                // Ajoutez le texte au même groupe
                group.append('text')
                    .attr('x', bbox.x + bbox.width + 10 + 25) // Centrer le texte dans le carré, ajustez selon besoin
                    .attr('y', bbox.y + 50) // Centrer verticalement dans le carré, ajustez selon besoin
                    .text(`${data.sessions[currentId].calories}kCal`) // Remplacez par votre texte
                    .attr('fill', 'white') // Couleur du texte
                    .attr('text-anchor', 'middle') // Centrer le texte horizontalement
                    .attr('dominant-baseline', 'middle') // Centrer le texte verticalement
                    .attr('font-size', '12px')

                group.append('text')
                    .attr('x', bbox.x + bbox.width + 10 + 25) // Centrer le texte dans le carré, ajustez selon besoin
                    .attr('y', bbox.y + 20) // Centrer verticalement dans le carré, ajustez selon besoin
                    .text(`${data.sessions[currentId].kilogram}kg`) // Remplacez par votre texte
                    .attr('fill', 'white') // Couleur du texte
                    .attr('text-anchor', 'middle') // Centrer le texte horizontalement
                    .attr('dominant-baseline', 'middle') // Centrer le texte verticalement
                    .attr('font-size', '12px')
            })
            .on('mouseout', function() {
                const currentId = d3.select(this).attr('data-id');
                // Sélectionner le rectangle de fond correspondant en utilisant l'index
                const correspondingBackgroundRect = d3.selectAll('.background-rect').filter((d, i) => i === Number(currentId));
                // Modifier l'opacité du rectangle de fond correspondant

                correspondingBackgroundRect.attr('opacity', 0); // Masquer le rectangle lorsque le survol est terminé

                // Supprimer le carré rouge et le texte
                d3.select(this.parentNode).select('.info-group').remove();
            });


        svg.select('.x-axis')
            .selectAll('text') // Sélectionne tous les textes de l'axe X
            .attr('dy', '20px')
            .style('fill', '#9B9EAC');

        svg.select('.y-axis')
            .selectAll('text')
            .style('fill', '#9B9EAC');

        svg.append('line')
            .attr('x1', x(1) + x.bandwidth() * 0.32 ) // Départ de la ligne à gauche du graphique
            .attr('y1', yCalories(0)) // Position y basée sur la valeur 60
            .attr('x2', x(7) + x.bandwidth() * 0.75) // Fin de la ligne à la largeur totale du graphique
            .attr('y2', yCalories(0)) // Même position y pour une ligne droite
            .attr('stroke', '#DEDEDE') // Couleur de la ligne
            .attr('stroke-width', 1) // Épaisseur de la ligne
            .lower(); // Déplace la ligne derrière les autres éléments SVG

        svg.append('line')
            .attr('x1', x(1) + x.bandwidth() * 0.32 ) // Départ de la ligne à gauche du graphique
            .attr('y1', 50) // Position y basée sur la valeur 72
            .attr('x2', x(7) + x.bandwidth() * 0.75) // Fin de la ligne à la largeur totale du graphique
            .attr('y2', 50) // Même position y pour une ligne droite
            .attr('stroke', '#DEDEDE') // Couleur de la ligne
            .attr('stroke-width', 1) // Épaisseur de la ligne
            .attr('stroke-dasharray', '5,5') // Style de ligne pointillée
            .lower(); // Déplace la ligne derrière les autres éléments SVG

        svg.append('line')
            .attr('x1', x(1) + x.bandwidth() * 0.32 ) // Départ de la ligne à gauche du graphique
            .attr('y1', 1) // Position y basée sur la valeur 72
            .attr('x2', x(7) + x.bandwidth() * 0.75) // Fin de la ligne à la largeur totale du graphique
            .attr('y2', 1) // Même position y pour une ligne droite
            .attr('stroke', '#DEDEDE') // Couleur de la ligne
            .attr('stroke-width', 1) // Épaisseur de la ligne
            .attr('stroke-dasharray', '5,5') // Style de ligne pointillée
            .lower(); // Déplace la ligne derrière les autres éléments SVG

    }, [data], [dimensions]);

    return <svg className={"activity-chart"} ref={svgRef}></svg>;
};

export default ActivityCharts;