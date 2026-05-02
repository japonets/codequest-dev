import React, { useEffect, useRef } from 'react';
import { planets } from '../../data/planets';
import { drawSun, drawPlanets, drawOrbits, drawStars } from '../../utils/drawHelpers';
import useAnimation from '../../hooks/useAnimation';
import type { Star } from "../../data/stars";

type PlanetPosition = {
  x: number;
  y: number;
  size: number;
  color: string;
  orbitRadius: number;
};

const SolarSystem: React.FC = () => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null); //useRef é um hook do React que permite criar uma referência a um elemento do DOM, nesse caso, o canvas. O tipo HTMLCanvasElement é usado para garantir que a referência seja do tipo correto.

    const planetAngles = useRef(

        planets.map((_, index) => index * 1.5) //inicializa os ângulos de cada planeta com um valor diferente para que eles não fiquem todos alinhados no início da animação

        ); //useRef é usado para armazenar os ângulos de cada planeta, que serão atualizados a cada frame para criar a animação de rotação. 

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const centerRef = useRef({ x: 0, y: 0 });
    const planetPositionRef = useRef<PlanetPosition[]>([]);
    const starsRef = useRef<Star[]>([]);
    

    useEffect(() => {
            const canvas = canvasRef.current;

            if (!canvas) return;
            ctxRef.current = canvas.getContext('2d'); //ctx é o objeto que tem todos os métodos de desenho

            if (!ctxRef.current) return;

            const centerX = centerRef.current.x = canvas.width / 2;
            const centerY = centerRef.current.y = canvas.height / 2;

            planetPositionRef.current = planets.map((planet, index) => ({
                x: centerX + planet.orbitRadius * Math.cos(planetAngles.current[index]),
                y: centerY + planet.orbitRadius * Math.sin(planetAngles.current[index]),
                size: planet.size,
                color: planet.color,
                orbitRadius: planet.orbitRadius,
            }));

            starsRef.current = Array.from({ length: 600 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                opacity: Math.random(),
            }))

    }, []); //o array vazio [] indica que o efeito deve ser executado apenas uma vez, quando o componente for montado.


    useAnimation(() => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const centerX = centerRef.current.x;
      const centerY = centerRef.current.y;

      if (!canvas || !ctx) return;

      const radius = 30;

      ctx.clearRect(0, 0, canvas.width, canvas.height); //limpa o canvas para redesenhar os planetas na nova posição

      //estrelas
      drawStars(ctx, starsRef.current); //chama a função drawStars para desenhar as estrelas no fundo do canvas. O array de estrelas é passado como argumento.

      //sol
      drawSun(ctx, centerX, centerY, radius);

      //orbitas
      drawOrbits(ctx, planets, centerX, centerY);

      planetAngles.current = planetAngles.current.map((angle, index) => angle + planets[index].rotationSpeed); //atualiza os ângulos de cada planeta com base na velocidade de rotação definida em planets

      drawPlanets(ctx, planetPositionRef.current, planetAngles.current, centerX, centerY); //desenha os planetas na nova posição calculada
    });

  return (
    <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ backgroundColor: 'black' }} />
    </div>
  );
};

export default SolarSystem;