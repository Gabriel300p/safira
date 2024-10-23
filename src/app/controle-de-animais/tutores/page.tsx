import Topbar from "@/components/topbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PiPawPrint } from "react-icons/pi";
import { z } from "zod";
import AnimaisFormNew from "../animais/components/animais-form-new/AnimaisFormNew";
// import AnimaisFormNew from "../animais/components/animais-form-new/AnimaisFormNew";

export default function Tutores() {
  return (
    <>
      <Topbar
        title="Tutores"
        subtitle={
          <>
            <PiPawPrint size={20} className="text-neutral-500" />
            <span className="text-neutral-500 text-base font-normal leading-tight">
              Controle de animais
            </span>
          </>
        }
      />
      <div className="flex items-center justify-center h-screen">tutores</div>
    </>
  );
}
