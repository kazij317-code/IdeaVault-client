"use client";


import { AlertDialog, Button } from "@heroui/react";

const CancelEnrollButton = () => {

    return (
        <AlertDialog>
            <Button
                color="danger"
                variant="light"
                size="sm"
            >
                Cancel
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Confirm Withdrawal</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p className="text-slate-600">
                                Are you sure you want to withdraw your backing from this idea? This action cannot be undone and you
                                will remove this from your backed ideas workspace.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                slot="close"
                                variant="tertiary"
                            >
                                Keep Backing
                            </Button>
                            <Button
                                slot="close"
                                color="danger"
                                className="font-bold"

                            >
                                Yes, Withdraw
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default CancelEnrollButton;