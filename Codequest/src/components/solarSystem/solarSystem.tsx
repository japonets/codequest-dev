import React, { useEffect, useRef } from 'react';
import { planets } from '../../data/planets';
import { drawSun, drawPlanets, drawOrbits, drawStars } from '../../utils/drawHelpers';
import useAnimation from '../../hooks/useAnimation';
import type { Star, ShinyStar } from "../../data/stars";
import type { PlanetPosition } from "../../data/planets";
import sol from "../../assets/sol.png"

const SolarSystem: React.FC = () => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null); //useRef é um hook do React que permite criar uma referência a um elemento do DOM, nesse caso, o canvas. O tipo HTMLCanvasElement é usado para garantir que a referência seja do tipo correto.

    const planetAngles = useRef(

        planets.map((_, index) => index * 1.5) //inicializa os ângulos de cada planeta com um valor diferente para que eles não fiquem todos alinhados no início da animação

        ); //useRef é usado para armazenar os ângulos de cada planeta, que serão atualizados a cada frame para criar a animação de rotação. 

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const centerRef = useRef({ x: 0, y: 0 });
    const planetPositionRef = useRef<PlanetPosition[]>([]);
    const starsRef = useRef<Star[]>([]);
    const shinyStarsRef = useRef<ShinyStar[]>([]);
    const sunImageRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        
        const handleResize = () => { 

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            centerRef.current.x = canvas.width / 2;
            centerRef.current.y = canvas.height / 2;

            starsRef.current = Array.from({ length: 300 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                opacity: Math.random(),
            }))
        
            shinyStarsRef.current = Array.from({ length: 100 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3,
                opacity: Math.random(),
                shine: 0.01 + Math.random() * 0.01, //velocidade de brilho aleatória para cada estrela brilhante, criando um efeito mais natural de piscar
            }));
            
        }//função para lidar com o redimensionamento da janela, garantindo que o canvas se ajuste ao novo tamanho

        const centerX = centerRef.current.x = canvas.width / 2;
        const centerY = centerRef.current.y = canvas.height / 2;

        
        planetPositionRef.current = planets.map((planet, index) => ({
            x: centerX + planet.orbitRadius * Math.cos(planetAngles.current[index]),
            y: centerY + planet.orbitRadius * Math.sin(planetAngles.current[index]),
            size: planet.size,
            color: planet.color,
            orbitRadius: planet.orbitRadius,
        }));
        
        window.addEventListener('resize', handleResize)
        
        ctxRef.current = canvas.getContext('2d'); //ctx é o objeto que tem todos os métodos de desenho
        if (!ctxRef.current) return;
        
        const img = new Image()
        img.src = sol
        img.onload = () => { sunImageRef.current = img }

        starsRef.current = Array.from({ length: 300 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random(),
        }))
        
        shinyStarsRef.current = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3,
            opacity: Math.random(),
            shine: 0.01 + Math.random() * 0.01, //velocidade de brilho aleatória para cada estrela brilhante, criando um efeito mais natural de piscar
        }));

        return () => window.removeEventListener('resize', handleResize)

    }, []); //o array vazio [] indica que o efeito deve ser executado apenas uma vez, quando o componente for montado.
    
    
    useAnimation(() => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const centerX = centerRef.current.x;
      const centerY = centerRef.current.y;
      
      if (!canvas || !ctx) return;

      const radius = 30;

      ctx.clearRect(0, 0, canvas.width, canvas.height); //limpa o canvas para redesenhar os planetas na nova posição

      //background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.75); //cria um gradiente radial para o fundo do canvas, com o centro no sol e se expandindo até as bordas do canvas

      gradient.addColorStop(0,   '#220144')  // roxo escuro no centro
      gradient.addColorStop(0.2, '#190331')  // azul escuro
      gradient.addColorStop(0.5, '#0e0730')  // roxo/azul médio
      gradient.addColorStop(0.75, '#0f051b')  // quase preto
      gradient.addColorStop(1,   '#000000')  // preto nas bordas
      ctx.fillStyle = gradient; //define o estilo de preenchimento como o gradiente criado
      ctx.fillRect(0, 0, canvas.width, canvas.height); //preenche todo o canvas com o gradiente

      //estrelas
      drawStars(ctx, starsRef.current, shinyStarsRef.current); 

      //sol
      drawSun(ctx, centerX, centerY, radius, sunImageRef.current!); 

      //orbitas
      drawOrbits(ctx, planets, centerX, centerY);

      planetAngles.current = planetAngles.current.map((angle, index) => angle + planets[index].rotationSpeed); //atualiza os ângulos de cada planeta com base na velocidade de rotação definida em planets

      drawPlanets(ctx, planetPositionRef.current, planetAngles.current, centerX, centerY); //desenha os planetas na nova posição calculada
    });

  return (
    <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default SolarSystem;