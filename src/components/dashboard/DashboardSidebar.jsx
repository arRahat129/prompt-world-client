import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { VscLayoutSidebarLeft } from "react-icons/vsc";

const DashboardSidebar = () => {
    const navItems = [
        { icon: House, href: "/", label: "Home" },
        { icon: Magnifier, href: "/dashboard/creator/my-prompts", label: "My Prompts" },
        { icon: Bell, href: "/dashboard/creator/my-prompts/add-prompts", label: "Add Prompt" },
        { icon: Envelope, href: "/dashboard/creator", label: "Dashboard" },
        { icon: Person, href: "/dashboard/creator/my-profile", label: "Profile" },
        { icon: Gear, href: "/dashboard/my-prompts", label: "Settings" },
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
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 md:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className={'block md:hidden'} variant="secondary">
                    <VscLayoutSidebarLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                <nav className="flex flex-col gap-1">
                                    {navContent}
                                </nav>
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
};

export default DashboardSidebar;