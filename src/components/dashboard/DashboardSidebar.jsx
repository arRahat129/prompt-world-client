import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import SidebarFooter from "./SidebarFooter";
import { getUserSession } from "@/lib/core/session";

const DashboardSidebar = async () => {
    const user = await getUserSession();

    const navItems = [
        { icon: House, href: "/", label: "Home" },
        { icon: Magnifier, href: `/dashboard/${user?.role}/my-prompts`, label: "My Prompts" },
        { icon: Bell, href: `/dashboard/${user?.role}/my-prompts/add-prompts`, label: "Add Prompt" },
        { icon: Envelope, href: `/dashboard/${user?.role}`, label: "Dashboard" },
        { icon: Person, href: `/dashboard/${user?.role}/my-profile`, label: "Profile" },
        { icon: Gear, href: `/dashboard/${user?.role}/my-bookmarks`, label: "Bookmarks" },
    ];

    const navContent = navItems.map((item) => (
        <Link href={item.href} key={item.label}>
            <button
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default cursor-pointer"
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </button>
        </Link>
    ))


    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 md:flex md:flex-col md:justify-between">
                <div className="w-full flex flex-col gap-1">
                    {navContent}
                </div>
                <div className="mt-auto border-t border-default pt-4 w-full">
                    <SidebarFooter />
                </div>
            </aside>
            <Drawer>
                <Button className={'flex justify-between items-center gap-3 md:hidden'} variant="secondary">
                    <VscLayoutSidebarLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog className="h-full flex flex-col justify-between p-4">
                            <div>
                                <Drawer.CloseTrigger />
                                <Drawer.Header className="px-0 pt-2 pb-4">
                                    <Drawer.Heading className="text-lg font-bold">Navigation</Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body className="px-0 overflow-y-auto">
                                    {navContent}
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