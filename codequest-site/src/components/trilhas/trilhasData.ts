export type Trilha = {
  numero: string;
  titulo: string;
  descricao: string;
  cta: string;
  cor: string;
};

export const trilhas: Trilha[] = [
  {
    numero: '01',
    titulo: 'Fundamentos',
    descricao:
      'Entenda cenas, nós, scripts e sinais construindo sua primeira experiência.',
    cta: 'Começar do zero',
    cor: '#865ee5',
  },
  {
    numero: '02',
    titulo: 'Missões e Narrativa',
    descricao:
      'Crie diálogos, objetivos, itens e progressão para dar sentido à exploração.',
    cta: 'Criar uma missão',
    cor: '#e45aa6',
  },
  {
    numero: '03',
    titulo: 'Ação e Sistemas',
    descricao:
      'Implemente movimento, dano, física e feedback para jogos mais dinâmicos.',
    cta: 'Partir para ação',
    cor: '#48c7ad',
  },
];
