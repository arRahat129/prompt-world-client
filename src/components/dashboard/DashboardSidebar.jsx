import { Button, Drawer } from "@heroui/react";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import SidebarFooter from "./SidebarFooter";
import { getUserSession } from "@/lib/core/session";
import SidebarLinks from "./SidebarLinks";
import SidebarHeader from "../SidebardHeader";

const DashboardSidebar = async () => {
    const user = await getUserSession();

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 md:flex md:flex-col md:justify-between">
                <SidebarHeader />
                <SidebarLinks user={user} />
                <div className="mt-auto border-t border-default pt-4 w-full">
                    <SidebarFooter />
                </div>
            </aside>
            <Drawer>
                <Button className={'flex justify-between items-center mx-auto md:hidden'} variant="secondary">
                    <VscLayoutSidebarLeft />
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog className="h-full flex flex-col justify-between p-4">
                            <div>
                                <Drawer.CloseTrigger />
                                <Drawer.Header className="px-0 pt-2 pb-4">
                                    <Drawer.Heading className="text-lg font-bold">Navigation</Drawer.Heading>
                                    <Drawer.Heading>
                                        <SidebarHeader />
                                    </Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body className="px-0 overflow-y-auto">
                                    <SidebarLinks user={user} />
                                </Drawer.Body>
                            </div>
                            <div className="mt-auto border-t border-default pt-4 w-full">
                                <SidebarFooter />
                            </div>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
};

export default DashboardSidebar;