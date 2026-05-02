type Planet = {
    name: string;
    orbitRadius: number; // distância do planeta ao sol
    rotationSpeed: number; // velocidade de rotação do planeta
    color: string; // cor do planeta 
    size: number; // tamanho do planeta
}

export const planets: Planet[] = [
    {
        name: 'GDScript',
        orbitRadius: 300,
        rotationSpeed: 0.0015,
        color: 'gray',
        size: 15
    },
    {
        name: 'Mars', //coloquei mars por enquanto só pra combinar com a cor rs
        orbitRadius: 150,
        rotationSpeed: 0.0015,
        color: 'red',
        size: 12
    }
];

export type { Planet };