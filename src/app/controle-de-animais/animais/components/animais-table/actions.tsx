import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Animal } from "../../utils/schema";
import AnimaisForm from "../animais-form";

interface AnimalTableActionsProps {
  animal: Animal;
  onUpdateAnimal: (updatedAnimal: Animal) => Promise<void>;
}

export default function AnimalTableActions({
  animal,
}: AnimalTableActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="w-fit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() => navigator.clipboard.writeText(String(animal.id))}
          >
            Copiar ID do animal
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ver detalhes do animal</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleEditClick}>
            Editar animal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <AnimaisForm
            animalId={animal.id}
            onClose={() => setIsDialogOpen(false)}
            animalDataClick={animal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
