import { useState } from "react";
import { Button } from "./components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table";
import { Form, useNavigate } from "react-router-dom";
import ItemList from "./components/Trainer/ItemList";
import { z } from "zod";

const trainerItems = [
    {
        id: 1,
        name: "Potion",
        usage: "1 pokemon gains 20 HP",
        quantity: 2,
    },
    {
        id: 2,
        name: "Pokeball",
        usage: "Gives 1 attempt to catch a Pokemon",
        quantity: 5,
    },
    {
        id: 3,
        name: "Pecha Berry",
        usage: "Remove poison from pokemon",
        quantity: 5,
    },
];

const itemSchema = z.object({});

interface TrainerStats {
    heart: number;
    brain: number;
    body: number;
    creativity: number;
    support: number;
    healing: number;
    hunting: number;
}

interface TrainerStatsAccessor {
    key<K extends keyof TrainerStats>(k: K): TrainerStats[K];
}

export default function Trainer() {
    const navigate = useNavigate();
    const [currentHealth, setCurrentHealth] = useState(10);
    const [maxHealth, setMaxHealth] = useState(10);
    const [currentBadges, setCurrentBadges] = useState(0);
    const [currentStats, setCurrentStats] = useState<TrainerStats>({
        heart: 0,
        brain: 0,
        body: 0,
        creativity: 0,
        support: 0,
        healing: 0,
        hunting: 0,
    });
    const [heartStat, setHeartStat] = useState(0);
    const [bodyStat, setBodyStat] = useState(0);
    const [brainStat, setBrainStat] = useState(0);
    const [creativityStat, setCreativityStat] = useState(0);
    const [supportStat, setSupportStat] = useState(0);
    const [healingStat, setHealingStat] = useState(0);
    const [huntingStat, setHuntingStat] = useState(0);
    const [items, setItems] = useState(trainerItems);
    const [isNewItem, setIsNewItem] = useState(false);
    const [newItem, setNewItem] = useState("");

    function navigateToPokemonParty() {
        navigate("/trainer/1/pokemon");
    }

    function characterStatsUnderLimit(): boolean {
        const totalStats =
            currentStats.heart + currentStats.body + currentStats.brain;
        return totalStats < 2 + currentBadges;
    }

    function trainerStatsUnderLimit(): boolean {
        const totalStats =
            currentStats.creativity +
            currentStats.support +
            currentStats.healing +
            currentStats.hunting;
        return totalStats < 1 + currentBadges;
    }
    // heart: 0,
    // brain: 0,
    // body: 0,
    // creativity: 0,
    // support: 0,
    // healing: 0,
    // hunting: 0,

    function modifyTrainerStat(
        statName: "creativity" | "support" | "healing" | "hunting",
        adjustValue: number = 1
    ) {
        // incrementing test
        if (adjustValue > 0 && !trainerStatsUnderLimit()) {
            return;
        }

        modifySpecificTrainerStatByValue(statName, adjustValue);
    }

    function modifyCharacterStat(
        statName: "heart" | "brain" | "body",
        adjustValue: number = 1
    ) {
        // incrementing test
        if (adjustValue > 0 && !characterStatsUnderLimit()) {
            return;
        }

        modifySpecificTrainerStatByValue(statName, adjustValue);
    }

    function modifySpecificTrainerStatByValue(
        statName:
            | "heart"
            | "brain"
            | "body"
            | "creativity"
            | "support"
            | "healing"
            | "hunting",
        adjustValue: number = 1
    ) {
        console.log("Incrementing value: " + statName);
        const newStats: TrainerStats = {
            ...currentStats,
        };

        newStats[statName] = newStats[statName] + adjustValue;

        setCurrentStats({ ...newStats });
    }

    function incrementHealth() {
        setCurrentHealth(currentHealth + 1);
    }

    function decrementHealth() {
        setCurrentHealth(currentHealth - 1);
    }

    function incrementBadges() {
        setCurrentBadges(currentBadges + 1);
    }

    function decrementBadges() {
        if (currentBadges > 0) {
            setCurrentBadges(currentBadges - 1);
        }
    }

    return (
        <main className="flex flex-col p-4">
            <h1>Brock</h1>
            {/* Image would go here eventually */}
            <div className="flex flex-col gap-2">
                <div>
                    <h2>Stats</h2>
                </div>
                <div className="flex items-center justify-evenly">
                    <p>
                        HP: {currentHealth} / {maxHealth}
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button onMouseDown={incrementHealth}>inc</Button>
                        <Button onMouseDown={decrementHealth}>dec</Button>
                    </div>
                </div>
                <div className="flex items-center justify-evenly">
                    <p>Badges: {currentBadges}</p>
                    <div className="flex flex-col gap-2">
                        <Button onMouseDown={incrementBadges}>inc</Button>
                        <Button onMouseDown={decrementBadges}>dec</Button>
                    </div>
                </div>
                <Button onMouseDown={navigateToPokemonParty}>
                    View Pokemon
                </Button>
                <div className="flex flex-col items-center">
                    <h3>Character Stats</h3>
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
                            {/* THE CODE BELOW WORKS, I JUST WANT TO SEE IF I CAN
                            DRY IT */}
                            <TableRow>
                                <TableCell className="font-bold">
                                    Heart
                                </TableCell>
                                <TableCell>{currentStats.heart}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={() =>
                                            modifyCharacterStat("heart", 1)
                                        }
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={() =>
                                            modifyCharacterStat("heart", -1)
                                        }
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Brain
                                </TableCell>
                                <TableCell>{currentStats.brain}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={() =>
                                            modifyCharacterStat("brain", 1)
                                        }
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={() =>
                                            modifyCharacterStat("brain", -1)
                                        }
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Body
                                </TableCell>
                                <TableCell>{currentStats.body}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={() =>
                                            modifyCharacterStat("body", 1)
                                        }
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={() =>
                                            modifyCharacterStat("body", -1)
                                        }
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-col items-center">
                    <h3>Trainer Stats</h3>
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
                                <TableCell className="font-bold">
                                    Creativity
                                </TableCell>
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
                                <TableCell className="font-bold">
                                    Support
                                </TableCell>
                                <TableCell>{currentStats.support}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={() =>
                                            modifyTrainerStat("support", 1)
                                        }
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={() =>
                                            modifyTrainerStat("support", -1)
                                        }
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Healing
                                </TableCell>
                                <TableCell>{currentStats.healing}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={() =>
                                            modifyTrainerStat("healing", 1)
                                        }
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={() =>
                                            modifyTrainerStat("healing", -1)
                                        }
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Hunting
                                </TableCell>
                                <TableCell>{currentStats.hunting}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={() =>
                                            modifyTrainerStat("hunting", 1)
                                        }
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={() =>
                                            modifyTrainerStat("hunting", -1)
                                        }
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <ItemList trainerItems={trainerItems}></ItemList>
                </div>
                <div>
                    <Form></Form>
                </div>
            </div>
        </main>
    );
}
