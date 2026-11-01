export interface SystemModule {
  id: string;
  icon: string;
  title: string;
  description: string;
  difficulty: 'INICIANTE' | 'INTERMEDIÁRIO' | 'AVANÇADO';
  theme: 'purple' | 'orange' | 'green' | 'pink' | 'blue' | 'gray';
}

export const systemsData: SystemModule[] = [
  {
    id: 'checkpoints',
    icon: '◆',
    title: 'CHECKPOINTS',
    description: 'Salve o progresso e retome a aventura.',
    difficulty: 'INICIANTE',
    theme: 'purple'
  },
  {
    id: 'portas-chaves',
    icon: '▣',
    title: 'PORTAS E CHAVES',
    description: 'Controle acesso, inventário e objetivos.',
    difficulty: 'INICIANTE',
    theme: 'orange'
  },
  {
    id: 'coletaveis',
    icon: '✦',
    title: 'COLETÁVEIS',
    description: 'Crie recompensas com feedback claro.',
    difficulty: 'INTERMEDIÁRIO',
    theme: 'green'
  },
  {
    id: 'dano-invencibilidade',
    icon: '♥',
    title: 'DANO E INVENCIBILIDADE',
    description: 'Implemente combate com regras justas.',
    difficulty: 'INTERMEDIÁRIO',
    theme: 'pink'
  },
  {
    id: 'fisica-basica',
    icon: '↗',
    title: 'FÍSICA BÁSICA',
    description: 'Ajuste movimento, colisões e sensação.',
    difficulty: 'AVANÇADO',
    theme: 'blue'
  },
  {
    id: 'sistema-save',
    icon: '▤',
    title: 'SISTEMA DE SAVE',
    description: 'Persista escolhas e estados importantes.',
    difficulty: 'AVANÇADO',
    theme: 'gray'
  }
];