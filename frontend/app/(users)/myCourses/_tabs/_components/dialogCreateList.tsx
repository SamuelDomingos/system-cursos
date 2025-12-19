import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useList } from "../_hooks/useList";
import { CreateListDto } from "@/lib/api/types/list";

export const DialogCreateList = ({
  listId,
  open,
  setOpen,
}: {
  listId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [formData, setFormData] = useState<CreateListDto>({
    title: "",
    description: "",
    type: "CUSTOM",
  });

  const { onSubmit, isLoading, isEditMode } = useList(listId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isEditMode ? "Edit List" : "Create List"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit List" : "Create List"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the list details below."
                : "Fill in the details below to create a new list."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditMode ? "Save changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
