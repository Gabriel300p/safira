import { TutorProvider } from "@/app/controle-de-animais/tutores/utils/tutor-context";
import Topbar from "@/components/topbar";
import { PiGear } from "react-icons/pi";

export default function Raca() {
  return (
    <div className="mt-20">
      <TutorProvider>
        <Topbar
          title="Raças"
          subtitle={
            <>
              <PiGear size={20} className="text-neutral-500" />
              <span className="text-neutral-500 text-base font-normal leading-tight">
                Configurações
              </span>
            </>
          }
        />
      </TutorProvider>
    </div>
  );
}
