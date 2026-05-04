type Planet = {
    name: string;
    orbitRadius: number; // distância do planeta ao sol
    rotationSpeed: number; // velocidade de rotação do planeta
    color: string; // cor do planeta 
    size: number; // tamanho do planeta
}

type PlanetPosition = {
  x: number;
  y: number;
  size: number;
  color: string;
  orbitRadius: number;
};

export const planets: Planet[] = [
    {
        name: 'GDScript',
        orbitRadius: 300,
        rotationSpeed: 0.0015,
        color: '#15e974',
        size: 15
    },
    {
        name: 'Mars', //coloquei mars por enquanto só pra combinar com a cor rs
        orbitRadius: 150,
        rotationSpeed: 0.0018,
        color: '#a01919',
        size: 12
    },
    {
        name: 'Earth',
        orbitRadius: 220,
        rotationSpeed: 0.002,
        color: '#3f0cca',
        size: 14
    }
];

export type { Planet, PlanetPosition };