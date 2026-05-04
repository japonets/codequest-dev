import type { Planet, PlanetPosition } from "../data/planets";
import type { Star, ShinyStar } from "../data/stars";


const drawSun = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, image: HTMLImageElement) => {

    if (!image) return  // se ainda não carregou, pula
    ctx.drawImage(image, centerX - radius*2.5, centerY - radius*2.5, radius * 5, radius * 5)
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

const drawStars = (ctx: CanvasRenderingContext2D, stars: Star[], shinyStars: ShinyStar[]) => {

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });

    shinyStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        star.opacity += star.shine; 
        if (star.opacity < 0 || star.opacity > 1) { 
            star.shine = -star.shine; //inverte a direção do brilho quando a opacidade atinge os limites de 0 ou 1, criando um efeito de piscar
        }
        ctx.fill();
    });
};

export { drawSun, drawPlanets, drawOrbits, drawStars };
