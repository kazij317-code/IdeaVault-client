"use client";

import { useState } from "react";
import {
    Button,
    AlertDialog,
    Modal,
    Input,
    TextArea,
    Chip,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const MyIdeaCard = ({ idea }) => {
    const [title, setTitle] = useState(idea.title);
    const [shortDescription, setShortDescription] = useState(
        idea.shortDescription
    );
    const [category, setCategory] = useState(idea.category);

    // delete
    const handleDelete = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/ideas/${idea._id}`,
                {
                    method: "DELETE",
                }
            );

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    // edit
    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedIdea = {
            title,
            shortDescription,
            category,
        };

        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/ideas/${idea._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedIdea),
                }
            );

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="group flex flex-col bg-white dark:bg-[#0f1319] rounded-4xl border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40">
            {/* Image */}
            <div className="relative overflow-hidden aspect-16/10">
                <img
                    src={
                        idea.thumbnail ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
                    }
                    alt={idea.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute top-4 right-4">
                    <Chip
                        color="primary"
                        variant="solid"
                        className="font-bold shadow-lg shadow-blue-600/20"
                    >
                        {idea.category}
                    </Chip>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col grow space-y-4 text-left">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900 dark:text-white">
                        {idea.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                        {idea.shortDescription}
                    </p>
                </div>

                {/* Buttons */}
                <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap gap-3">
                    <Link href={`/ideas/${idea._id}`}>
                        <Button
                            color="primary"
                            variant="flat"
                            className="rounded-xl font-bold"
                        >
                            Details
                        </Button>
                    </Link>
                    
                    {/* EDIT MODAL */}
                    <Modal>
                        <Button color="primary" className="rounded-xl font-bold">
                            <BiEdit className="w-4 h-4" />
                            Edit
                        </Button>

                        <Modal.Backdrop>
                            <Modal.Container>
                                <Modal.Dialog className="sm:max-w-xl bg-white dark:bg-[#0f1319] border dark:border-slate-800/60 text-slate-900 dark:text-white rounded-3xl overflow-hidden shadow-2xl">
                                    <Modal.CloseTrigger className="dark:text-slate-400 dark:hover:text-white" />

                                    <Modal.Header className="border-b dark:border-slate-800/60 p-6">
                                        <Modal.Heading className="text-xl font-black text-slate-900 dark:text-white">
                                            Edit Idea
                                        </Modal.Heading>
                                    </Modal.Header>

                                    <Modal.Body className="p-6">
                                        <form
                                            onSubmit={handleUpdate}
                                            className="space-y-4"
                                        >
                                            <Input
                                                label="Title"
                                                variant="bordered"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                classNames={{
                                                    inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                                                    input: "text-slate-800 dark:text-white placeholder-slate-400",
                                                    label: "text-slate-600 dark:text-slate-400 font-medium"
                                                }}
                                            />

                                            <Input
                                                label="Category"
                                                variant="bordered"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                classNames={{
                                                    inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                                                    input: "text-slate-800 dark:text-white placeholder-slate-400",
                                                    label: "text-slate-600 dark:text-slate-400 font-medium"
                                                }}
                                            />

                                            <TextArea
                                                label="Short Description"
                                                variant="bordered"
                                                value={shortDescription}
                                                onChange={(e) => setShortDescription(e.target.value)}
                                                classNames={{
                                                    inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                                                    input: "text-slate-800 dark:text-white placeholder-slate-400",
                                                    label: "text-slate-600 dark:text-slate-400 font-medium"
                                                }}
                                            />

                                            <Modal.Footer className="px-0 pt-4 border-t dark:border-slate-800/60 flex justify-end gap-3">
                                                <Button
                                                    slot="close"
                                                    variant="flat"
                                                    className="font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl"
                                                >
                                                    Cancel
                                                </Button>

                                                <Button
                                                    type="submit"
                                                    slot="close"
                                                    color="primary"
                                                    className="font-bold rounded-xl shadow-lg shadow-blue-600/20"
                                                >
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </form>
                                    </Modal.Body>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>

                    {/* DELETE */}
                    <AlertDialog>
                        <Button
                            color="danger"
                            variant="flat"
                            className="rounded-xl font-bold"
                        >
                            Delete
                        </Button>

                        <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px] bg-white dark:bg-[#0f1319] border dark:border-slate-800/60 text-slate-900 dark:text-white rounded-3xl overflow-hidden shadow-2xl">
                                    <AlertDialog.CloseTrigger className="dark:text-slate-400 dark:hover:text-white" />

                                    <AlertDialog.Header className="p-6 pb-2 flex items-center gap-3">
                                        <AlertDialog.Icon status="danger" />
                                        <AlertDialog.Heading className="text-lg font-bold text-slate-900 dark:text-white">
                                            Delete idea permanently?
                                        </AlertDialog.Heading>
                                    </AlertDialog.Header>

                                    <AlertDialog.Body className="px-6 py-2">
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            This will permanently delete{" "}
                                            <strong className="text-slate-900 dark:text-white font-semibold">{idea.title}</strong>. This action cannot be undone.
                                        </p>
                                    </AlertDialog.Body>

                                    <AlertDialog.Footer className="p-6 pt-4 flex justify-end gap-3">
                                        <Button
                                            slot="close"
                                            variant="tertiary"
                                            className="font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700/80"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            onClick={handleDelete}
                                            slot="close"
                                            variant="danger"
                                            className="font-bold rounded-xl shadow-lg shadow-red-600/20"
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                            </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default MyIdeaCard;