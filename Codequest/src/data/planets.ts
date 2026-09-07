type Planet = {
    name: string;
    orbitRadius: number; // distância do planeta ao sol
    rotationSpeed: number; // velocidade de rotação do planeta
    color: string; // cor do planeta 
    lightColor: string; //cor do planeta no tema claro
    size: number; // tamanho do planeta
}

type PlanetPosition = {
  x: number;
  y: number;
  size: number;
  color: string;
  lightColor: string; //cor do planeta no tema claro
  orbitRadius: number;
};

export const planets: Planet[] = [
    {
        name: 'GDScript',
        orbitRadius: 300,
        rotationSpeed: 0.0015,
        color: '#15e974',
        lightColor: '#00ad00', //cor do planeta no tema claro
        size: 30
    },
    {
        name: 'Mars', //coloquei mars por enquanto só pra combinar com a cor rs
        orbitRadius: 150,
        rotationSpeed: 0.0018,
        color: '#e600ff',
        lightColor: '#760083', //cor do planeta no tema claro
        size: 25
    },
    {
        name: 'Earth',
        orbitRadius: 220,
        rotationSpeed: 0.002,
        color: '#3f0cca',
        lightColor: '#000089', //cor do planeta no tema claro
        size: 15
    }
];

export type { Planet, PlanetPosition };