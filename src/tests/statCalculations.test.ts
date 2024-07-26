import {
    addStatsTogether,
    getMaximumStatValue,
    getMinimumStatValue,
    getTotalOfStats,
    normaliseStatsWithEvolution,
} from "@/lib/statCalculations";
import { PokemonStats } from "@/models/PokeBaseStats";
import { describe, expect, test } from "vitest";

describe("Sum up pokemon stats", () => {
    test("sum of 6 equal stats", () => {
        const stats: PokemonStats = {
            hp: 100,
            attack: 100,
            defense: 100,
            specialAttack: 100,
            specialDefense: 100,
            speed: 100,
        };

        const result = 600;

        expect(getTotalOfStats(stats)).toBe(result);
    });

    test("sum bulbasaur base stats", () => {
        const stats: PokemonStats = {
            hp: 45,
            attack: 49,
            defense: 49,
            specialAttack: 65,
            specialDefense: 65,
            speed: 45,
        };

        const result = 318;

        expect(getTotalOfStats(stats)).toBe(result);
    });
});

describe("get minimum and maximum of stats", () => {
    test("Get max and min stats when all are equal", () => {
        const stats: PokemonStats = {
            hp: 100,
            attack: 100,
            specialAttack: 100,
            defense: 100,
            specialDefense: 100,
            speed: 100,
        };

        const maxResult = 100;
        const minResult = 100;

        expect(getMaximumStatValue(stats)).toBe(maxResult);
        expect(getMinimumStatValue(stats)).toBe(minResult);
    });

    test("Get max and min of Bulbasaur stats", () => {
        const stats: PokemonStats = {
            hp: 45,
            attack: 49,
            defense: 49,
            specialAttack: 65,
            specialDefense: 65,
            speed: 45,
        };

        const maxResult = 65;
        const minResult = 45;

        expect(getMaximumStatValue(stats)).toBe(maxResult);
        expect(getMinimumStatValue(stats)).toBe(minResult);
    });
});

describe("Add stats together to create new pokemon stats", () => {
    const emptyStats = {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
    };

    const basicStats: PokemonStats = {
        hp: 100,
        attack: 100,
        defense: 100,
        specialAttack: 100,
        specialDefense: 100,
        speed: 100,
    };

    const bulbasaurStats: PokemonStats = {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45,
    };

    test("Two sam stat objects with all empty stats will create a stats object wiht all zeroed stats", () => {
        const newStats = addStatsTogether(emptyStats, emptyStats);

        expect(newStats).toEqual({
            hp: 0,
            attack: 0,
            specialAttack: 0,
            defense: 0,
            specialDefense: 0,
            speed: 0,
        });
    });

    test("The same stat objects with varied stats will create a stats object with values that are equal to the addition of all varied stats", () => {
        const newStats = addStatsTogether(bulbasaurStats, bulbasaurStats);
        expect(newStats).toEqual({
            hp: 90,
            attack: 98,
            defense: 98,
            specialAttack: 130,
            specialDefense: 130,
            speed: 90,
        });
    });

    test("Different stat objects with varied stats will create a stats object that are equal to the addition of all varied stats", () => {
        const newStats = addStatsTogether(basicStats, bulbasaurStats);

        expect(newStats).toEqual({
            hp: 145,
            attack: 149,
            defense: 149,
            specialAttack: 165,
            specialDefense: 165,
            speed: 145,
        });
    });

    test("You should be able to add any number of stats together", () => {
        const newStats = addStatsTogether(
            bulbasaurStats,
            emptyStats,
            basicStats,
            basicStats,
            bulbasaurStats
        );

        expect(newStats).toEqual({
            hp: 290,
            attack: 298,
            defense: 298,
            specialAttack: 330,
            specialDefense: 330,
            speed: 290,
        });
    });

    test("Creation of new stats shouldn't modify old stats", () => {
        // we do not care about the return result in this test.
        addStatsTogether(emptyStats, bulbasaurStats, basicStats);

        expect(emptyStats).toEqual({
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0,
        });

        expect(bulbasaurStats).toEqual({
            hp: 45,
            attack: 49,
            defense: 49,
            specialAttack: 65,
            specialDefense: 65,
            speed: 45,
        });

        expect(basicStats).toEqual({
            hp: 100,
            attack: 100,
            defense: 100,
            specialAttack: 100,
            specialDefense: 100,
            speed: 100,
        });
    });
});

describe("Normalise PokemonStats", () => {
    test("Bulbasaur gets normalised correctly", () => {
        const bulbasaurStats: PokemonStats = {
            hp: 45,
            attack: 49,
            defense: 49,
            specialAttack: 65,
            specialDefense: 65,
            speed: 45,
        };

        const bulbasaurNormalisedStats: PokemonStats = {
            hp: 1,
            attack: 1,
            defense: 1,
            specialAttack: 3,
            specialDefense: 3,
            speed: 1,
        };

        expect(normaliseStatsWithEvolution(bulbasaurStats, 1)).toEqual(
            bulbasaurNormalisedStats
        );
    });

    test("Ivysaur gets normalised correctly", () => {
        const ivysaurStats: PokemonStats = {
            hp: 60,
            attack: 62,
            defense: 63,
            specialAttack: 80,
            specialDefense: 80,
            speed: 60,
        };

        const ivysaurNormalisedStats: PokemonStats = {
            hp: 2,
            attack: 2,
            defense: 2,
            specialAttack: 4,
            specialDefense: 4,
            speed: 2,
        };

        expect(normaliseStatsWithEvolution(ivysaurStats, 2)).toEqual(
            ivysaurNormalisedStats
        );
    });

    test("Venusaur gets normalised correctly", () => {
        const venusaurStats: PokemonStats = {
            hp: 80,
            attack: 82,
            defense: 83,
            specialAttack: 100,
            specialDefense: 100,
            speed: 80,
        };

        const venusaurNormalisedStats: PokemonStats = {
            hp: 3,
            attack: 3,
            defense: 3,
            specialAttack: 5,
            specialDefense: 4,
            speed: 3,
        };

        expect(normaliseStatsWithEvolution(venusaurStats, 3)).toEqual(
            venusaurNormalisedStats
        );
    });
});
