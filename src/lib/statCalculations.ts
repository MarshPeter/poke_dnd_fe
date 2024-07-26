import { PokemonStats } from "@/models/PokeBaseStats";

const BASE_STAT_AMOUNT = 10;

export function getTotalOfStats(stats: PokemonStats): number {
    let total: number = 0;

    for (const [, v] of Object.entries(stats)) {
        total += v;
    }

    return total;
}

export function getMinimumStatValue(stats: PokemonStats): number {
    let minValue = Number.MAX_VALUE;

    for (const [, v] of Object.entries(stats)) {
        if (v < minValue) {
            minValue = v;
        }
    }

    return minValue;
}

export function getMaximumStatValue(stats: PokemonStats): number {
    let maxValue = Number.MIN_VALUE;

    for (const [, v] of Object.entries(stats)) {
        if (v > maxValue) {
            maxValue = v;
        }
    }

    return maxValue;
}

export function addStatsTogether(...stats: PokemonStats[]): PokemonStats {
    const newStats: PokemonStats = {
        hp: 0,
        attack: 0,
        specialAttack: 0,
        defense: 0,
        specialDefense: 0,
        speed: 0,
    };

    for (const stat of stats) {
        newStats.hp = newStats.hp + stat.hp;
        newStats.attack = newStats.attack + stat.attack;
        newStats.specialAttack = newStats.specialAttack + stat.specialAttack;
        newStats.defense = newStats.defense + stat.defense;
        newStats.specialDefense = newStats.specialDefense + stat.specialDefense;
        newStats.speed = newStats.speed + stat.speed;
    }

    return newStats;
}

// use this function with pokemon base stats to get a more game acfcurate set of stats
export function normaliseStatsWithEvolution(
    baseStats: PokemonStats,
    evolution: number
): PokemonStats {
    const decrease =
        Math.min(
            baseStats.hp,
            baseStats.attack,
            baseStats.defense,
            baseStats.specialAttack,
            baseStats.specialDefense,
            baseStats.speed
        ) / 1.5;

    let adjustedHp = baseStats.hp - decrease;
    let adjustedAttack = baseStats.attack - decrease;
    let adjustedDefense = baseStats.defense - decrease;
    let adjustedSpecialAttack = baseStats.specialAttack - decrease;
    let adjustedSpecialDefense = baseStats.specialDefense - decrease;
    let adjustedSpeed = baseStats.speed - decrease;

    // evolutions are 1, 2, 3, we want evolution 2 to be base + 5, evolution 3 to be base + 10
    let totalGoal = BASE_STAT_AMOUNT + (evolution - 1) * 5;

    const total =
        adjustedHp +
        adjustedAttack +
        adjustedDefense +
        adjustedSpecialAttack +
        adjustedSpecialDefense +
        adjustedSpeed;

    adjustedHp = (adjustedHp / total) * totalGoal;
    adjustedAttack = (adjustedAttack / total) * totalGoal;
    adjustedDefense = (adjustedDefense / total) * totalGoal;
    adjustedSpecialAttack = (adjustedSpecialAttack / total) * totalGoal;
    adjustedSpecialDefense = (adjustedSpecialDefense / total) * totalGoal;
    adjustedSpeed = (adjustedSpeed / total) * totalGoal;

    const newStats: PokemonStats = {
        hp: Math.floor(adjustedHp),
        attack: Math.floor(adjustedAttack),
        defense: Math.floor(adjustedDefense),
        specialAttack: Math.floor(adjustedSpecialAttack),
        specialDefense: Math.floor(adjustedSpecialDefense),
        speed: Math.floor(adjustedSpeed),
    };

    // bumps stats up if total < goal
    while (getTotalOfStats(newStats) < totalGoal) {
        let highestId = -1;
        let difference = -10;

        if (adjustedHp - newStats.hp > difference) {
            highestId = 0;
            difference = adjustedHp - newStats.hp;
        }

        if (adjustedAttack - newStats.attack > difference) {
            highestId = 1;
            difference = adjustedAttack - newStats.attack;
        }

        if (adjustedDefense - newStats.defense > difference) {
            highestId = 2;
            difference = adjustedDefense - newStats.defense;
        }

        if (adjustedSpecialAttack - newStats.specialAttack > difference) {
            highestId = 3;
            difference = adjustedSpecialAttack - newStats.specialAttack;
        }

        if (adjustedSpecialDefense - newStats.specialDefense > difference) {
            highestId = 4;
            difference = adjustedSpecialDefense - newStats.specialDefense;
        }

        if (adjustedSpeed - newStats.speed > difference) {
            highestId = 5;
            difference = adjustedSpeed - newStats.speed;
        }

        switch (highestId) {
            case 0:
                newStats.hp += 1;
                break;
            case 1:
                newStats.attack += 1;
                break;
            case 2:
                newStats.defense += 1;
                break;
            case 3:
                newStats.specialAttack += 1;
                break;
            case 4:
                newStats.specialDefense += 1;
                break;
            case 5:
                newStats.speed += 1;
                break;
            default:
                return newStats;
        }
    }

    // bumps stats down if total < goal
    while (getTotalOfStats(newStats) > totalGoal) {
        let highestId = -1;
        let difference = 10;

        if (adjustedSpeed - newStats.speed < difference) {
            highestId = 5;
            difference = adjustedSpeed - newStats.speed;
        }

        if (adjustedSpecialDefense - newStats.specialDefense < difference) {
            highestId = 4;
            difference = adjustedSpecialDefense - newStats.specialDefense;
        }

        if (adjustedSpecialAttack - newStats.specialAttack < difference) {
            highestId = 3;
            difference = adjustedSpecialAttack - newStats.specialAttack;
        }

        if (adjustedDefense - newStats.defense < difference) {
            highestId = 2;
            difference = adjustedDefense - newStats.defense;
        }

        if (adjustedAttack - newStats.attack < difference) {
            highestId = 1;
            difference = adjustedAttack - newStats.attack;
        }

        if (adjustedHp - newStats.hp < difference) {
            highestId = 0;
            difference = adjustedHp - newStats.hp;
        }

        switch (highestId) {
            case 0:
                newStats.hp -= 1;
                break;
            case 1:
                newStats.attack -= 1;
                break;
            case 2:
                newStats.defense -= 1;
                break;
            case 3:
                newStats.specialAttack -= 1;
                break;
            case 4:
                newStats.specialDefense -= 1;
                break;
            case 5:
                newStats.speed -= 1;
                break;
            default:
                return newStats;
        }
    }

    // This is a final modifier for balance reasons
    totalGoal += Math.floor(
        Math.min(newStats.attack, newStats.specialAttack) / 2
    );

    while (getTotalOfStats(newStats) < totalGoal) {
        let highestId = -1;
        let difference = -10;

        if (adjustedHp - newStats.hp > difference) {
            highestId = 0;
            difference = adjustedHp - newStats.hp;
        }

        if (adjustedAttack - newStats.attack > difference) {
            highestId = 1;
            difference = adjustedAttack - newStats.attack;
        }

        if (adjustedDefense - newStats.defense > difference) {
            highestId = 2;
            difference = adjustedDefense - newStats.defense;
        }

        if (adjustedSpecialAttack - newStats.specialAttack > difference) {
            highestId = 3;
            difference = adjustedSpecialAttack - newStats.specialAttack;
        }

        if (adjustedSpecialDefense - newStats.specialDefense > difference) {
            highestId = 4;
            difference = adjustedSpecialDefense - newStats.specialDefense;
        }

        if (adjustedSpeed - newStats.speed > difference) {
            highestId = 5;
            difference = adjustedSpeed - newStats.speed;
        }

        switch (highestId) {
            case 0:
                newStats.hp += 1;
                break;
            case 1:
                newStats.attack += 1;
                break;
            case 2:
                newStats.defense += 1;
                break;
            case 3:
                newStats.specialAttack += 1;
                break;
            case 4:
                newStats.specialDefense += 1;
                break;
            case 5:
                newStats.speed += 1;
                break;
            default:
                return newStats;
        }
    }

    console.log("Hello world", newStats);

    return newStats;
}
