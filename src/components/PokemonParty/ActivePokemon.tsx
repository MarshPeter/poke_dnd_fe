import { Button } from "../ui/button";

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

interface Props {
    pokemon: PokemonBrief;
}

export default function ActivePokemon({ pokemon }: Props) {
    return (
        <div className="flex gap-2 border-2 border-gray-300 rounded-lg shadow-lg">
            <div className="p-1">
                <img
                    src={pokemon.img}
                    alt={`Image of ${pokemon.name}`}
                    className="h-full border-2"
                />
            </div>
            <div className="w-full pr-3">
                <p>{pokemon.name}</p>
                <p>
                    Health: {pokemon.currentHealth}/{pokemon.maxHealth}
                </p>
                <p>Rank: {pokemon.rank}</p>
                <div className="flex gap-2 mb-2 mt-2">
                    <p
                        className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                    >
                        {pokemon.typeOne}
                    </p>
                    {pokemon.typeTwo ? (
                        <p
                            className={`bg-green-600 text-white font-bold pb-1 pt-1 pl-3 pr-3 block rounded-lg shadow-xl`}
                        >
                            {pokemon.typeTwo}
                        </p>
                    ) : null}
                </div>
                <div className="flex justify-between">
                    <Button>View</Button>
                    <Button className="mb-2">Bench</Button>
                </div>
            </div>
        </div>
    );
}
