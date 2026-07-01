import React, { useEffect, useRef, useState } from 'react';
import { planets } from '../../data/planets';
import { drawSun, drawPlanets, drawOrbits, drawStars, drawBackground } from '../../utils/drawHelpers';
import useAnimation from '../../hooks/useAnimation';
import type { Star, ShinyStar } from "../../data/stars";
import type { PlanetPosition } from "../../data/planets";
import sol from "../../assets/sol.png"

const SolarSystem: React.FC = () => {

    const [tema, setTema] = useState<'dark' | 'light'>('dark'); //useState é um hook do React que permite criar um estado, nesse caso, para o tema, que pode ser "dark" ou "light". O tipo <"dark" | "light"> é usado para garantir que o estado só possa ter esses dois valores.

    const zoomRef = React.useRef(1); //valor inicial 1 representa o zoom padrão
    const transitionRef = React.useRef(0); //controle de transição entre temas escuro e claro

    //refs para controle do arrastar
    const isDraggingRef = React.useRef(false); //indica se o usuário está arrastando o mouse
    const dragStartRef = React.useRef({ x: 0, y: 0 }); //armazena a posição inicial do mouse quando o usuário começa a arrastar
    const cameraOffsetRef = React.useRef({ x: 0, y: 0 }); //armazena o deslocamento da câmera, que será usado para mover a visão do sistema solar quando o usuário arrasta o mouse
    
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
        
        if(tema === 'light' && transitionRef.current < 1) {
            transitionRef.current += 0.02;
        }
        
        if(tema === 'dark' && transitionRef.current > 0) {
            transitionRef.current -= 0.02;
        }
        
        if (!canvas || !ctx) return;
        
        const radius = 30;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height); //limpa o canvas para redesenhar os planetas na nova posição
        //background
        drawBackground(ctx, canvas.width, canvas.height, transitionRef.current, centerX, centerY);
        //estrelas
        drawStars(ctx, starsRef.current, shinyStarsRef.current); 
        
        ctx.save(); //salva o estado atual do canvas, incluindo transformações e estilos
        ctx.translate(centerX, centerY); //translada o canvas para a posição do mouse, permitindo que o usuário mova a visão do sistema solar com o mouse
        ctx.scale(zoomRef.current, zoomRef.current); //aplica o zoom no canvas
        ctx.translate(-centerX, -centerY); //translada o canvas de volta para a posição original, garantindo que o zoom seja aplicado corretamente
        
        ctx.translate(cameraOffsetRef.current.x, cameraOffsetRef.current.y); //aplica o deslocamento da câmera, permitindo que o usuário arraste a visão do sistema solar com o mouse

        //sol
        drawSun(ctx, centerX, centerY, radius, sunImageRef.current!); 
        
        //orbitas
        drawOrbits(ctx, planets, centerX, centerY);
        
        planetAngles.current = planetAngles.current.map((angle, index) => angle + planets[index].rotationSpeed); //atualiza os ângulos de cada planeta com base na velocidade de rotação definida em planets
        
        drawPlanets(ctx, planetPositionRef.current, planetAngles.current, centerX, centerY); //desenha os planetas na nova posição calculada
        
        ctx.restore();//restaura o estado do canvas para o que era antes do ctx.save(), garantindo que as transformações aplicadas não afetem outros elementos desenhados no canvas
    });
    
    const handleZoom = (event: React.WheelEvent<HTMLCanvasElement>) => {
        const zoom = event.deltaY > 0 ? 0.9 : 1.1; //se o usuário rolar para baixo, o zoom será reduzido (0.9), se rolar para cima, o zoom será aumentado (1.1)
        zoomRef.current *= zoom; //atualiza o valor do zoom multiplicando pelo fator de zoom calculado
        zoomRef.current = Math.min(Math.max(0.5, zoomRef.current), 2); //limita o zoom entre 0.5x e 2x
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        isDraggingRef.current = true;
        dragStartRef.current = { x: event.clientX, y: event.clientY }; //armazena a posição inicial do mouse quando o usuário começa a arrastar
    }
    
    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const limitx = 1000; 
        const limity = 300;
        if (isDraggingRef.current) {
            const dx = event.clientX - dragStartRef.current.x;
            const dy = event.clientY - dragStartRef.current.y;

            cameraOffsetRef.current = {
                x: cameraOffsetRef.current.x + dx > limitx ? limitx : cameraOffsetRef.current.x + dx < -limitx ? -limitx : cameraOffsetRef.current.x + dx,
                y: cameraOffsetRef.current.y + dy > limity ? limity : cameraOffsetRef.current.y + dy < -limity ? -limity : cameraOffsetRef.current.y + dy
            };
            dragStartRef.current = { x: event.clientX, y: event.clientY };
        }
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

  return (
    <div>
        <canvas onWheel={handleZoom} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>
        <label className="mode-toggle">
            <span className="icon">
               <img src={tema === 'light' ? 'src/assets/light-mode.png' : 'src/assets/dark-mode.png'} alt={tema === 'light' ? "Light Mode" : "Dark Mode"} />
            </span>
            <label className="switch">
                <input type="checkbox" onChange={() => setTema(tema === 'light' ? 'dark' : 'light')} />
                <span className="slider round"></span>
            </label>
        </label>
    </div>
  );
};

export default SolarSystem;