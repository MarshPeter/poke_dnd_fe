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

export default function Trainer() {
    const navigate = useNavigate();
    const [currentHealth, setCurrentHealth] = useState(10);
    const [maxHealth, setMaxHealth] = useState(10);
    const [currentBadges, setCurrentBadges] = useState(0);
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
        return heartStat + bodyStat + brainStat < 2 + currentBadges;
    }

    function trainerStatsUnderLimit(): boolean {
        return (
            creativityStat + supportStat + healingStat + huntingStat <
            1 + currentBadges
        );
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

    function incrementBodyStat() {
        if (characterStatsUnderLimit()) {
            setBodyStat(bodyStat + 1);
        }
    }

    function decrementBodyStat() {
        setBodyStat(bodyStat - 1);
    }

    function incrementBrainStat() {
        if (characterStatsUnderLimit()) {
            setBrainStat(brainStat + 1);
        }
    }

    function decrementBrainStat() {
        setBrainStat(brainStat - 1);
    }

    function incrementHeartStat() {
        if (characterStatsUnderLimit()) {
            setHeartStat(heartStat + 1);
        }
    }

    function decrementHeartStat() {
        setHeartStat(heartStat - 1);
    }

    function incrementCreativityStat() {
        if (trainerStatsUnderLimit()) {
            setCreativityStat(creativityStat + 1);
        }
    }

    function decrementCreativityStat() {
        setCreativityStat(creativityStat - 1);
    }

    function incrementSupportStat() {
        if (trainerStatsUnderLimit()) {
            setSupportStat(supportStat + 1);
        }
    }

    function decrementSupportStat() {
        setSupportStat(supportStat - 1);
    }

    function incrementHealingStat() {
        if (trainerStatsUnderLimit()) {
            setHealingStat(healingStat + 1);
        }
    }

    function decrementHealingStat() {
        setHealingStat(healingStat - 1);
    }

    function incrementHuntingStat() {
        if (trainerStatsUnderLimit()) {
            setHuntingStat(huntingStat + 1);
        }
    }

    function decrementHuntingStat() {
        setHuntingStat(huntingStat - 1);
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
                            <TableRow>
                                <TableCell className="font-bold">
                                    Heart
                                </TableCell>
                                <TableCell>{heartStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button onMouseDown={incrementHeartStat}>
                                        inc
                                    </Button>
                                    <Button onMouseDown={decrementHeartStat}>
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Brain
                                </TableCell>
                                <TableCell>{brainStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button onMouseDown={incrementBrainStat}>
                                        inc
                                    </Button>
                                    <Button onMouseDown={decrementBrainStat}>
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Body
                                </TableCell>
                                <TableCell>{bodyStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button onMouseDown={incrementBodyStat}>
                                        inc
                                    </Button>
                                    <Button onMouseDown={decrementBodyStat}>
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
                                <TableCell>{creativityStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button
                                        onMouseDown={incrementCreativityStat}
                                    >
                                        inc
                                    </Button>
                                    <Button
                                        onMouseDown={decrementCreativityStat}
                                    >
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Support
                                </TableCell>
                                <TableCell>{supportStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button onMouseDown={incrementSupportStat}>
                                        inc
                                    </Button>
                                    <Button onMouseDown={decrementSupportStat}>
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Healing
                                </TableCell>
                                <TableCell>{healingStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button onMouseDown={incrementHealingStat}>
                                        inc
                                    </Button>
                                    <Button onMouseDown={decrementHealingStat}>
                                        dec
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">
                                    Hunting
                                </TableCell>
                                <TableCell>{huntingStat}</TableCell>
                                <TableCell className="flex flex-col gap-2">
                                    <Button onMouseDown={incrementHuntingStat}>
                                        inc
                                    </Button>
                                    <Button onMouseDown={decrementHuntingStat}>
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
