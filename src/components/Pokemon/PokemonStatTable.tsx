import { PokemonInfo, PokemonStats } from "@/models/PokeBaseStats";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    addStatsTogether,
    normaliseStatsWithEvolution,
} from "@/lib/statCalculations";

interface Props {
    pokemon: PokemonInfo;
}

export default function PokemonStatTable({ pokemon }: Props) {
    const normalisedBaseStats = normaliseStatsWithEvolution(
        pokemon.baseStats,
        pokemon.evolution
    );
    return (
        <Table>
            <TableCaption>A collection of all your stats</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>HP</TableHead>
                    <TableHead>ATK</TableHead>
                    <TableHead>DEF</TableHead>
                    <TableHead>SP.ATK</TableHead>
                    <TableHead>SP.DEF</TableHead>
                    <TableHead>Speed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Base</TableCell>
                    {Object.keys(normalisedBaseStats).map(
                        (key: string, idx: number) => {
                            return (
                                <TableCell key={idx}>
                                    {
                                        normalisedBaseStats[
                                            key as keyof PokemonStats
                                        ]
                                    }
                                </TableCell>
                            );
                        }
                    )}
                </TableRow>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    {Object.keys(pokemon.rankStats).map(
                        (key: string, idx: number) => {
                            return (
                                <TableCell key={idx}>
                                    {
                                        pokemon.rankStats[
                                            key as keyof PokemonStats
                                        ]
                                    }
                                </TableCell>
                            );
                        }
                    )}
                </TableRow>
                <TableRow>
                    <TableCell>Level</TableCell>
                    {Object.keys(pokemon.levelStats).map(
                        (key: string, idx: number) => {
                            return (
                                <TableCell key={idx}>
                                    {
                                        pokemon.levelStats[
                                            key as keyof PokemonStats
                                        ]
                                    }
                                </TableCell>
                            );
                        }
                    )}
                </TableRow>
                <TableRow className="border-t-4">
                    <TableCell>Total</TableCell>
                    {Object.keys(
                        addStatsTogether(
                            pokemon.baseStats,
                            pokemon.rankStats,
                            pokemon.levelStats
                        )
                    ).map((key: string, idx: number) => {
                        return (
                            <TableCell key={idx}>
                                {pokemon.levelStats[key as keyof PokemonStats]}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableBody>
        </Table>
    );
}
