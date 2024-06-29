import { useState } from "react";
import { Button } from "./components/ui/button";
import { Form, useNavigate } from "react-router-dom";
import ItemList from "./components/Trainer/ItemList";
import { z } from "zod";
import CharacterStatTable from "./components/Trainer/CharacterStatTable";
import TrainerStatTable from "./components/Trainer/TrainerStatTable";

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
                    <CharacterStatTable
                        currentStats={currentStats}
                        modifyCharacterStat={modifyCharacterStat}
                    ></CharacterStatTable>
                </div>
                <div className="flex flex-col items-center">
                    <h3>Trainer Stats</h3>
                    <TrainerStatTable
                        currentStats={currentStats}
                        modifyTrainerStat={modifyTrainerStat}
                    ></TrainerStatTable>
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
