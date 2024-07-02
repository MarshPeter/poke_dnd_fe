import { useState } from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import ItemList from "./components/Trainer/ItemList";
import { z } from "zod";
import CharacterStatTable from "./components/Trainer/CharacterStatTable";
import TrainerStatTable from "./components/Trainer/TrainerStatTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";

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

const itemSchema = z.object({
    name: z
        .string()
        .min(4, {
            message: "Item names must be at least 4 characters long.",
        })
        .max(40, {
            message: "Item names must be at most 40 characters long.",
        }),
    description: z
        .string()
        .min(10, {
            message: "Item description must be at least 10 characters long.",
        })
        .max(128, {
            message: "Item description must be at least 128 characters long.",
        }),
});

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

    // Eventually would like items to be searched if they exist in the database, before description is added
    // const [isNewItem, setIsNewItem] = useState(false);

    const itemForm = useForm<z.infer<typeof itemSchema>>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    function onItemFormSubmit(values: z.infer<typeof itemSchema>) {
        let alreadyExists = false;

        for (const item of trainerItems) {
            if (values.name.toLowerCase() === item.name.toLowerCase()) {
                itemForm.setError("name", {
                    type: "custom",
                    message: `You already have the item:  ${item.name}`,
                });
                return;
            }
        }

        console.log(values);
    }

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
                    <Form {...itemForm}>
                        <form
                            onSubmit={itemForm.handleSubmit(onItemFormSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={itemForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Item name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={itemForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Item description"
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        <FormDescription>
                                            This is the description of your new
                                            Item.
                                        </FormDescription>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>
                            <Button type="submit">Make Item</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
}
