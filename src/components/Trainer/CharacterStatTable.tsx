import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

interface TrainerStats {
    heart: number;
    brain: number;
    body: number;
    creativity: number;
    support: number;
    healing: number;
    hunting: number;
}

interface Props {
    currentStats: TrainerStats;
    modifyCharacterStat: (
        statName: "heart" | "brain" | "body",
        adjustValue: number
    ) => void;
}

export default function CharacterStatTable({
    currentStats,
    modifyCharacterStat,
}: Props) {
    return (
        <Table>
            <TableCaption>2 + Badge Count</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Stat</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-bold">Heart</TableCell>
                    <TableCell>{currentStats.heart}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() => modifyCharacterStat("heart", 1)}
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() => modifyCharacterStat("heart", -1)}
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Brain</TableCell>
                    <TableCell>{currentStats.brain}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() => modifyCharacterStat("brain", 1)}
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() => modifyCharacterStat("brain", -1)}
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Body</TableCell>
                    <TableCell>{currentStats.body}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() => modifyCharacterStat("body", 1)}
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() => modifyCharacterStat("body", -1)}
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
