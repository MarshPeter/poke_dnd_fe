import { useState } from "react";
import { Button } from "./components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./components/ui/popover";

const MAX_EXPERIENCE = 5;

interface PokemonMoves {
    name: string;
    type: string;
    isPhysicalAttack: boolean;
    hitModifier: number;
    effect: string;
}

interface PokemonBaseStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

interface Pokemon {
    id: number;
    name: string;
    speciesName: string;
    baseStats: PokemonBaseStats;
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

export default function Pokemon() {
    const [pokemon, setPokemon] = useState<Pokemon>({
        id: 1,
        name: "Bulbasaur",
        speciesName: "Bulbasaur",
        baseStats: {
            hp: 45,
            attack: 49,
            defense: 49,
            specialAttack: 65,
            specialDefense: 65,
            speed: 45,
        },
        currentHealth: 10,
        maxHealth: 10,
        level: 0,
        rank: 0,
        experience: 0,
        inspiration: false,
        typeOne: "Grass",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    });

    function modifyNumericalPokemonStat(statistic: keyof Pokemon, amt: number) {
        if (!(statistic in pokemon)) {
            console.error(
                `Pokemon attempted to be accessed with key: ${statistic}. However Key Does not exist`
            );
            return;
        }

        if (typeof pokemon[statistic] !== "number") {
            console.error(
                `You attempted to change the value of key: [${statistic}] but it was not of type number`
            );
            return;
        }

        const newPokemon = { ...pokemon };

        (newPokemon[statistic] as number) =
            (newPokemon[statistic] as number) + amt;

        setPokemon(newPokemon);
    }

    function modifyCurrentHp(amount: number) {
        const newHp = (pokemon.currentHealth += amount);

        setPokemon({ ...pokemon, currentHealth: newHp });
    }

    function invertInspiration() {
        const newInspiration = !pokemon.inspiration;

        setPokemon({ ...pokemon, inspiration: newInspiration });
    }

    return (
        <main className="flex flex-col p-4">
            <div>
                <p className="text-sm text-muted-foreground">Pokemon Name</p>
                <h1 className="text-3xl font-bold">{pokemon.name}</h1>
            </div>
            <div className="flex mt-4 justify-center">
                <img
                    src={pokemon.image}
                    alt={`Image of ${pokemon.speciesName}`}
                    className="border-2 w-2/3"
                />
            </div>
            <div className="flex pt-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Pokemon species
                    </p>
                    <p className="text-lg font-bold">{pokemon.speciesName}</p>
                </div>
                <div className="flex gap-2 ml-auto mt-auto mb-auto items-center">
                    <p
                        className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                    >
                        {pokemon.typeOne}
                    </p>
                    {pokemon.typeTwo ? (
                        <p
                            className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                        >
                            Grass
                        </p>
                    ) : null}
                </div>
            </div>
            <div>
                <div className="flex justify-evenly">
                    <div className="flex flex-col text-center">
                        <p>Level: {pokemon.level}</p>
                        <div className="flex gap-2 pb-2">
                            <Button
                                onMouseDown={() =>
                                    modifyNumericalPokemonStat("level", 1)
                                }
                            >
                                Inc
                            </Button>
                            <Button
                                onMouseDown={() =>
                                    modifyNumericalPokemonStat("level", -1)
                                }
                            >
                                Dec
                            </Button>
                        </div>
                        <div>
                            <p>Exp: {pokemon.experience} / 5</p>
                            <div className="flex gap-2 pb-2">
                                <Button
                                    onMouseDown={() =>
                                        modifyNumericalPokemonStat(
                                            "experience",
                                            1
                                        )
                                    }
                                >
                                    Inc
                                </Button>
                                <Button
                                    onMouseDown={() =>
                                        modifyNumericalPokemonStat(
                                            "experience",
                                            -1
                                        )
                                    }
                                >
                                    Dec
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-center">
                        <div>
                            <p>Rank: {pokemon.rank}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap items-center justify-between pl-2 pr-2">
                <p className="">
                    Current HP: {pokemon.currentHealth} / {pokemon.maxHealth}
                </p>
                <div className="flex gap-2">
                    <Button onMouseDown={() => modifyCurrentHp(1)}>Inc</Button>
                    <Button
                        onMouseDown={() => {
                            modifyCurrentHp(-1);
                        }}
                    >
                        Dec
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">inspiration</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Button onMouseDown={() => invertInspiration()}>
                            {pokemon.inspiration ? "Remove" : "Add"}
                        </Button>
                    </PopoverContent>
                </Popover>
                <p>{pokemon.inspiration ? "Yes" : "No"}</p>
            </div>
        </main>
    );
}
