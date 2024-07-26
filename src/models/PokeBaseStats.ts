export interface PokemonMoves {
    name: string;
    type: string;
    isPhysicalAttack: boolean;
    hitModifier: number;
    effect: string;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface PokemonInfo {
    id: number;
    name: string;
    speciesName: string;
    evolution: 1;
    baseStats: PokemonStats;
    rankStats: PokemonStats;
    levelStats: PokemonStats;
    currentHealth: number;
    maxHealth: number;
    level: number;
    rank: number;
    experience: number;
    inspiration: boolean;
    typeOne: string;
    typeTwo?: string;
    image: string;
}
