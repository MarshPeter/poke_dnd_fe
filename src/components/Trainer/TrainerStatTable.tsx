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
    modifyTrainerStat: (
        statName: "creativity" | "support" | "healing" | "hunting",
        adjustValue: number
    ) => void;
}

export default function TrainerStatTable({
    currentStats,
    modifyTrainerStat,
}: Props) {
    return (
        <Table>
            <TableCaption>1 + Badge Count</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Stat</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-bold">Creativity</TableCell>
                    <TableCell>{currentStats.creativity}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() =>
                                modifyTrainerStat("creativity", 1)
                            }
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() =>
                                modifyTrainerStat("creativity", -1)
                            }
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Support</TableCell>
                    <TableCell>{currentStats.support}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() => modifyTrainerStat("support", 1)}
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() => modifyTrainerStat("support", -1)}
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Healing</TableCell>
                    <TableCell>{currentStats.healing}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() => modifyTrainerStat("healing", 1)}
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() => modifyTrainerStat("healing", -1)}
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold">Hunting</TableCell>
                    <TableCell>{currentStats.hunting}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                        <Button
                            onMouseDown={() => modifyTrainerStat("hunting", 1)}
                        >
                            inc
                        </Button>
                        <Button
                            onMouseDown={() => modifyTrainerStat("hunting", -1)}
                        >
                            dec
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
