import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ModalRegister() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="text-tertiary underline hover:text-blue-600 transition-colors cursor-pointer whitespace-normal break-words" >
                    Editar
                </span>
            </DialogTrigger>

            <DialogContent className="font-inter [&>button]:hidden">
                <DialogHeader className="">
                    <DialogTitle className="text-2xl">Editar dados</DialogTitle>
                </DialogHeader>

                <DialogDescription>

                </DialogDescription>
                
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="cursor-pointer bg-tertiary text-white-custom hover:bg-blue-600">Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}