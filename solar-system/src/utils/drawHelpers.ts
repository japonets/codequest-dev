import type { Planet, PlanetPosition } from "../data/planets";
import type { Star, ShinyStar } from "../data/stars";

const hexToRgb = (hex: string) => ({ //função para converter uma cor hexadecimal em RGB
  r: parseInt(hex.slice(1, 3), 16), 
  g: parseInt(hex.slice(3, 5), 16),  
  b: parseInt(hex.slice(5, 7), 16),  
})

const lerp = (a: number, b: number, t: number) => a + (t * (b - a))//função para interpolar entre dois valores a e b com base em um fator t (0 a 1)

const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, transitionRef: number, centerX: number, centerY: number) => {

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.75); //cria um gradiente radial para o fundo do canvas, com o centro no sol e se expandindo até as bordas do canvas

    const darkColors = ['#220144', '#190331', '#0e0730', '#0f051b', '#000000']
    const lightColors = ['#ffffff', '#d2d2d2', '#a2a2a2', '#6f6f6f', '#494949']
    let index = 0;

    for(let i = 0; i <= 1; i += 0.25) { //faz uma transicao suave entre os temas claro e escuro, interpolando as cores do gradiente com base no valor de transitionRef (0 a 1)

        const rgbA = hexToRgb(darkColors[index])  
        const rgbB = hexToRgb(lightColors[index]) 

        const r = lerp(rgbA.r, rgbB.r, transitionRef)
        const g = lerp(rgbA.g, rgbB.g, transitionRef)
        const b = lerp(rgbA.b, rgbB.b, transitionRef)

        gradient.addColorStop(i, `rgb(${r}, ${g}, ${b})`); 

        index++;
    }
        
    ctx.fillStyle = gradient; //define o estilo de preenchimento como o gradiente criado
    ctx.fillRect(0, 0, width, height); //preenche todo o canvas com o gradiente
}

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

export { drawSun, drawPlanets, drawOrbits, drawStars, drawBackground };
