"use client";

import { useState } from "react";
import {
    Button,
    AlertDialog,
    Modal,
    Input,
    TextArea,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

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
        <div className="border rounded-xl p-5 shadow">
            <img
                src={idea.thumbnail}
                alt={idea.title}
                className="w-full h-52 object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-4">
                {idea.title}
            </h2>

            <p>{idea.shortDescription}</p>

            <div className="flex gap-3 mt-4">

                {/* EDIT MODAL */}
                <Modal>
                    <Button color="primary">
                        <BiEdit />
                        Edit
                    </Button>

                    <Modal.Backdrop>
                        <Modal.Container>
                            <Modal.Dialog className="sm:max-w-xl">
                                <Modal.CloseTrigger />

                                <Modal.Header>
                                    <Modal.Heading>
                                        Edit Idea
                                    </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body>
                                    <form
                                        onSubmit={handleUpdate}
                                        className="space-y-4"
                                    >
                                        <Input
                                            label="Title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Category"
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                        />

                                        <TextArea
                                            label="Short Description"
                                            value={shortDescription}
                                            onChange={(e) =>
                                                setShortDescription(e.target.value)
                                            }
                                        />
                    

                                        <Modal.Footer>
                                            <Button
                                                slot="close"
                                                variant="flat"
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                type="submit"
                                                slot="close"
                                                color="primary"
                                            >
                                                Save
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>


                {/* DELETE MODAL */}
                <AlertDialog>
                    <Button
                        color="danger"
                        variant="flat"
                    >
                        Delete
                    </Button>

                    <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-[400px]">
                                <AlertDialog.CloseTrigger />

                                <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger" />
                                    <AlertDialog.Heading>
                                        Delete idea permanently?
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                    <p>
                                        This will permanently delete{" "}
                                        <strong>{idea.title}</strong>.
                                        This action cannot be undone.
                                    </p>
                                </AlertDialog.Body>

                                <AlertDialog.Footer>
                                    <Button
                                        slot="close"
                                        variant="tertiary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        onClick={handleDelete}
                                        slot="close"
                                        variant="danger"
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
    );
};

export default MyIdeaCard;