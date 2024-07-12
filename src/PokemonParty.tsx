import { useState } from "react";
import { Button } from "./components/ui/button";
import ActivePokemon from "./components/PokemonParty/ActivePokemon";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "./components/ui/popover";

interface PokemonBrief {
    id: number;
    name: string;
    maxHealth: number;
    currentHealth: number;
    rank: number;
    typeOne: string;
    typeTwo?: string;
    inParty: boolean;
    img: string;
}

export default function PokemonParty() {
    const [pokemon, setPokemon] = useState<PokemonBrief[]>([
        {
            id: 1,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            inParty: true,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 2,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            inParty: true,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 3,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            typeTwo: "Grass",
            inParty: true,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 4,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            inParty: false,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 5,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            typeTwo: "Grass",
            inParty: false,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 6,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            typeTwo: "Grass",
            inParty: false,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 7,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            typeTwo: "Grass",
            inParty: false,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
            id: 8,
            name: "Bulbasaur",
            maxHealth: 10,
            currentHealth: 10,
            rank: 1,
            typeOne: "Grass",
            typeTwo: "Grass",
            inParty: false,
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
    ]);

    function partyHasMaxPokemon() {
        const maxPokemonPartySize = 6;
        const pokemonInParty = pokemon.reduce((acc, p) => {
            if (p.inParty) {
                console.log("testing");
                return (acc += 1);
            }

            return acc;
        }, 0);

        return maxPokemonPartySize <= pokemonInParty;
    }

    function changePlaceOfPokemon(id: number) {
        const newPokemonParty: PokemonBrief[] = [];

        for (const p of pokemon) {
            // is this the pokemon?
            if (p.id !== id) {
                newPokemonParty.push(p);
                continue;
            }

            // if in party, remove it
            if (p.inParty) {
                p.inParty = false;
                newPokemonParty.push(p);
                continue;
            }

            // if not in party, see if party is max size
            if (partyHasMaxPokemon()) {
                newPokemonParty.push(p);
                continue;
            }

            // party is not max size, add it
            p.inParty = true;
            newPokemonParty.push(p);
        }

        setPokemon(newPokemonParty);
    }

    return (
        <main className="flex flex-col p-4">
            <div>
                <p className="text-sm text-muted-foreground">Trainer Name</p>
                <h1 className="text-3xl font-bold">Brock</h1>
            </div>
            <div>
                <section className="pb-4">
                    <h2>Active Pokemon Party</h2>
                    <div className="flex flex-col gap-4">
                        {pokemon
                            .filter((p) => p.inParty)
                            .map((p) => {
                                return (
                                    <ActivePokemon
                                        pokemon={p}
                                        onBenchPress={changePlaceOfPokemon}
                                    ></ActivePokemon>
                                );
                            })}
                    </div>
                </section>
                <section>
                    <h2>PC Pokemon</h2>
                    <div>
                        <Table className="border-2 border-gray">
                            <TableCaption>Pokemon current in PC</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pokemon Name</TableHead>
                                    <TableHead>Max Health</TableHead>
                                    <TableHead>Types</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pokemon
                                    .filter((p) => !p.inParty)
                                    .map((p) => {
                                        return (
                                            <TableRow key={p.id}>
                                                <TableCell className="font-medium">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button variant="outline">
                                                                {p.name}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <Button
                                                                onMouseDown={() =>
                                                                    changePlaceOfPokemon(
                                                                        p.id
                                                                    )
                                                                }
                                                            >
                                                                To Party
                                                            </Button>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                                <TableCell>
                                                    {p.maxHealth}
                                                </TableCell>
                                                <TableCell className="flex flex-col gap-1">
                                                    <p
                                                        className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                                                    >
                                                        {p.typeOne}
                                                    </p>
                                                    {p.typeTwo ? (
                                                        <p
                                                            className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                                                        >
                                                            {p.typeTwo}
                                                        </p>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </div>
        </main>
    );
}
