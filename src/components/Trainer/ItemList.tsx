import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

interface TrainerItem {
    id: number;
    name: string;
    usage: string;
    quantity: number;
}

interface Props {
    trainerItems: TrainerItem[];
}

export default function ItemList({ trainerItems }: Props) {
    const [items, setItems] = useState(trainerItems);

    function incrementItem(id: number) {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            })
        );
    }

    function decrementItem(id: number) {
        setItems(
            items.map((item) => {
                if (item.id === id && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            })
        );
    }

    function deleteItem(id: number): void {
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <>
            <h3>Item Inventory</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="hidden">Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">
                                            {item.name}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <h4>Usage</h4>
                                        <p>{item.usage}</p>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <>
                                <Button
                                    onMouseDown={() => incrementItem(item.id)}
                                >
                                    inc
                                </Button>
                                <Button
                                    onMouseDown={() => decrementItem(item.id)}
                                >
                                    dec
                                </Button>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="bg-red-400">
                                            del
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="flex flex-col gap-2">
                                            <h4>Are you sure?</h4>
                                            <p>
                                                You will have to search the item
                                                again to add it
                                            </p>
                                            <Button
                                                onClick={() =>
                                                    deleteItem(item.id)
                                                }
                                            >
                                                DELETE
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
