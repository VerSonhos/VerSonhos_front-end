import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export default function ModalRegister() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="text-tertiary underline hover:text-blue-600 transition-colors cursor-pointer whitespace-normal wrap-break-word" >
                    Termos de Consentimento e Tratamento de Dados
                </span>
            </DialogTrigger>

            <DialogContent className="font-inter [&>button]:hidden">
                <DialogHeader className="">
                    <DialogTitle className="text-2xl">Termos de Consentimento e Tratamento de Dados (LGPD)</DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    <ScrollArea className="text-black-custom h-[300px] rounded-md border-2 shadow p-4">
                        <p className="mb-4">
                            Ao prosseguir com o cadastro da empresa, o representante legal declara estar ciente e de acordo com o tratamento dos dados pessoais e empresariais fornecidos neste formulário, conforme a Lei nº 13.709/2018 (LGPD).
                        </p>

                        <ul className="ps-3 flex flex-col gap-5">
                            <li>
                                <p>
                                    <strong>1. Finalidade do Tratamento:</strong> os dados informados serão utilizados exclusivamente para registro da empresa, comunicação institucional e cumprimento de obrigações legais.
                                </p>
                            </li>

                            <li>
                                <p>
                                    <strong>2. Dados Coletados:</strong> razão social, CNPJ, CPF do representante, e-mail, telefone e endereço.
                                </p>
                            </li>
                            
                            <li>
                                <p>
                                    <strong>3. Armazenamento e Segurança:</strong> os dados são armazenados de forma segura, com acesso restrito e medidas de proteção contra acessos indevidos.
                                </p>
                            </li>
                            
                            <li>
                                <p>
                                    <strong>4. Compartilhamento:</strong> somente com parceiros técnicos, mediante cláusulas de confidencialidade e dentro da finalidade declarada.
                                </p>
                            </li>
                            
                            <li>
                                <p>
                                    <strong>5. Direitos do Titular:</strong> é possível solicitar acesso, correção, exclusão ou revogação do consentimento a qualquer momento pelo e-mail
                                    <span className="font-medium">  equipeversonhos@gmail.com</span>.
                                </p>

                            </li>

                            <li>
                                <p>
                                    <strong>6. Consentimento:</strong> ao marcar a opção de aceite, o representante autoriza o tratamento dos dados conforme descrito.
                                </p>
                            </li>
                        </ul>
                    </ScrollArea>
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