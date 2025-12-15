import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import { applyMask } from "@/utils/masks";

export default function ModalEditUser({ dialogTitle, label, typeInput='text', initialValue, onSave, icon: IconComponent, maskType }) {
    const [newValue, setNewValue] = useState(maskType ? applyMask(initialValue, maskType) : initialValue); 
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setNewValue(maskType ? applyMask(initialValue, maskType) : initialValue);
    }, [initialValue, maskType]);

    const handleChange = (e) => {
        const { value } = e.target;
        
        let maskedValue = value;
        if (maskType) {
            maskedValue = applyMask(value, maskType); // <--- APLICA A MÁSCARA AO DIGITAR
        }
        
        setNewValue(maskedValue);
    };

    const handleSave = () => {
        // Se houver máscara, removemos caracteres não numéricos antes de salvar (se for o caso de phone, cnpj, cep)
        let valueToSave = newValue;
        if (maskType && ['phone', 'cnpj', 'cep', 'ie'].includes(maskType)) {
             // Esta regex remove todos os caracteres que não são dígitos (0-9)
            valueToSave = newValue.replace(/\D/g, ''); 
        }
        
        onSave(valueToSave);
        setIsOpen(false); 
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button 
                    type="button" 
                    className="absolute right-0 bg-tertiary text-white text-xl text-center h-full w-10 rounded-r-lg cursor-pointer active:bg-blue-600 hover:bg-blue-500 transition"
                    onClick={() => setNewValue(initialValue)}
                >
                    <FiEdit className="m-auto" />
                </button>
            </DialogTrigger>

            <DialogContent className="font-inter [&>button]:hidden z-500">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
                </DialogHeader>

                <div className='py-4 flex flex-col gap-3'>
                    <label htmlFor="edit-input" className='text-black-custom-500 font-semibold'>{label}</label>
                    
                    <div className='w-full flex relative'>                     
                        {IconComponent && <IconComponent className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>}
                        <input 
                            id="edit-input"
                            name="edit-input" 
                            type={typeInput} 
                            value={newValue}
                            onChange={handleChange}
                            placeholder={`Digite o novo ${label.toLowerCase()}`}
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ${IconComponent ? 'ps-9' : 'ps-4'}`}
                        />
                    </div>
                    <DialogDescription className="text-sm mt-1 text-gray-500">
                        O valor atual é: <strong>{initialValue}</strong>
                    </DialogDescription>
                </div>
                
                <DialogFooter className="flex flex-row justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                    </DialogClose>

                    <Button 
                        className="cursor-pointer bg-tertiary text-white hover:bg-blue-600 transition"
                        onClick={handleSave}
                        disabled={!newValue.trim() || newValue === (maskType ? applyMask(initialValue, maskType) : initialValue)}
                    >
                        Salvar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}