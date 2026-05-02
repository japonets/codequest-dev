import type { Planet } from "../data/planets";

type PlanetPosition = {
    x: number;
    y: number;
    size: number;
    color: string;
    orbitRadius: number;
}

const drawSun = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); //desenha um círculo no centro do canvas
    ctx.fillStyle = 'yellow'; //cor do sol
    ctx.fill(); //preenche o círculo com a cor definida
}

const drawPlanets = (ctx: CanvasRenderingContext2D, planetPosition: PlanetPosition[], angles: number[], centerX: number, centerY: number) => {

    planetPosition.forEach((planet, index) => { //desenha cada planeta na posição calculada

        planet.x = centerX + planet.orbitRadius * Math.cos(angles[index]); //calcula a nova posição x do planeta com base no ângulo atualizado
        planet.y = centerY + planet.orbitRadius * Math.sin(angles[index]); //calcula a nova posição y do planeta com base no ângulo atualizado

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
    });
}

const drawOrbits = (ctx: CanvasRenderingContext2D, planets: Planet[], centerX: number, centerY: number) => {

    planets.forEach(planet => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2); //desenha a órbita do planeta
        ctx.strokeStyle = 'white'; //cor das órbitas
        ctx.lineWidth = 0.5;
        ctx.stroke();
    });
}

export { drawSun, drawPlanets, drawOrbits }
