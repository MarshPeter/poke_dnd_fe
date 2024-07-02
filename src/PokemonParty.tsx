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
    ]);

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
                                    <ActivePokemon pokemon={p}></ActivePokemon>
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
                                                    {p.name}
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
                {/* <div className="flex gap-2 border-2 border-gray-300 rounded-lg shadow-lg">
                    <div className="p-1">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                            alt="Bulbasaur"
                            className="h-full border-2"
                        />
                    </div>
                    <div>
                        <p>Bulbasaur</p>
                        <p>Health: 10/10</p>
                        <p>Rank: 1</p>
                        <div className="flex gap-2 mb-2 mt-2">
                            <p
                                className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                            >
                                Grass
                            </p>
                            <p
                                className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                            >
                                Grass
                            </p>
                        </div>
                        <Button className="mb-2">Bench</Button>
                    </div>
                </div> */}
            </div>
        </main>
    );
}
