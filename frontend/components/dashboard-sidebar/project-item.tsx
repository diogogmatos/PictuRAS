import Link from "next/link";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useDeleteProject, useUpdateProject } from "@/lib/mutations/projects";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/providers/session-provider";
import { Project } from "@/lib/projects";

export default function ProjectItem({ p }: { p: Project }) {
  const router = useRouter();
  const path = usePathname();
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [option, setOption] = useState<"rename" | "delete">("rename");
  const [newName, setNewName] = useState<string>(p.name);

  const session = useSession();
  const deleteProject = useDeleteProject(
    session.user._id,
    p._id,
    session.token,
  );
  const updateProject = useUpdateProject(
    session.user._id,
    p._id,
    session.token,
  );

  useEffect(() => {
    if (deleteProject.isError || updateProject.isError) {
      toast({
        title: "Ups! An error occurred.",
        description:
          deleteProject.error?.message || updateProject.error?.message,
        variant: "destructive",
      });
      if (deleteProject.isError) deleteProject.reset();
      if (updateProject.isError) updateProject.reset();
    }
  }, [deleteProject, updateProject, toast]);

  return (
    <SidebarMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <SidebarMenuButton
          asChild
          isActive={path.includes(`/dashboard/${p._id}`)}
          className="h-fit py-1 flex items-center"
        >
          <Link href={`/dashboard/${p._id}`}>{p.name}</Link>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction className="pb-1">
              <Ellipsis />
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem>
              <DialogTrigger
                className="flex justify-between w-full items-center"
                onClick={() => setOption("rename")}
              >
                <p>Rename</p>
                <Pencil className="size-[1em]" />
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger
                className="flex justify-between w-full items-center"
                onClick={() => setOption("delete")}
              >
                <span>Delete</span>
                <Trash className="size-[1em]" />
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            {option === "rename" ? (
              <DialogTitle>Rename Project</DialogTitle>
            ) : (
              <>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          {option === "rename" && (
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                if (option === "rename")
                  updateProject.mutate({
                    uid: session.user._id,
                    pid: p._id,
                    token: session.token,
                    name: newName,
                  });
                else {
                  router.push("/dashboard");
                  deleteProject.mutate(
                    {
                      uid: session.user._id,
                      pid: p._id,
                      token: session.token,
                    },
                    {
                      onSuccess: () => {
                        toast({
                          title: "Project deleted successfully.",
                        });
                      },
                    },
                  );
                }
                setOpen(false);
              }}
              variant={option === "rename" ? "default" : "destructive"}
            >
              {option === "rename" ? "Save" : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
}
