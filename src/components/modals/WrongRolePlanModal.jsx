"use client";

import { Button, Modal } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function WrongRolePlanModal({ plan }) {
    const { data: session } = useSession();
    const userRole = session?.user?.role;

    const router = useRouter();

    const handleSignOutAndSwitch = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Loggin Out...')
                    router.push("/auth/signin");
                },
            },
        });
    };

    return (
        <div className="flex flex-wrap gap-4">
            <Modal>
                <Button
                    className={`block w-full text-center text-xs font-semibold px-4 py-3 rounded-xl transition duration-200 ${plan.isPopular // Fixed: changed from plan.popular to plan.isPopular to match your data structure
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                        }`}
                >
                    Upgrade?
                </Button>
                <Modal.Backdrop variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-95">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-danger/10 text-danger border border-danger/20">
                                    <FiLogOut className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Role Conflict Detected</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-sm opacity-80 leading-relaxed">
                                    You are currently signed in as a <span className="font-bold uppercase text-primary">{userRole}</span>, but you are trying to upgrade to a{" "}
                                    <span className="font-bold uppercase text-primary">{plan.for}</span> tier.
                                </p>
                                <p className="text-xs opacity-60 mt-2">
                                    Would you like to sign out and log back in with a creator workspace credential profile?
                                </p>
                            </Modal.Body>
                            <Modal.Footer className="flex">
                                <Button
                                    variant="danger"
                                    className="w-full font-semibold"
                                    onClick={handleSignOutAndSwitch}
                                >
                                    Sign Out & Switch
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}