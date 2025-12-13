"use client";

import Label from "@/components/label";
import Select from "@/components/select";
import {categories, types} from "@/lib/consts";
import Input from "@/components/input";
import Button from "@/components/button";
import {useForm} from "react-hook-form";

export default function TransactionForm() {
    const { register, handleSubmit, watch, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label className="mb-1">Type</Label>
                <Select {...register("type")}>
                    { types.map((type) => {
                        return <option key={type}>{type}</option>
                    }) }
                </Select>
            </div>
            <div>
                <Label className="mb-1">Category</Label>
                <Select { ...register("category")}>
                    { categories.map((category) => {
                        return <option key={category}>{category}</option>
                    }) }
                </Select>
            </div>
            <div>
                <Label className="mb-1">Date</Label>
               <Input {...register("created_at")} />
            </div>
            <div>
                <Label className="mb-1">Amount</Label>
                <Input type="number" {...register("amount", {
                    required: "The amount is required",
                })} />
                {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            </div>
            <div className="col-span-1 md:col-span-2">
                <Label className="mb-1">Description</Label>
                <Input {...register("description")} />
            </div>
            <div className="md:col-span-2 flex justify-end">
                <Button type="submit">Save</Button>
            </div>
        </div>
    </form>)
}