import Topbar from "@/components/topbar";

export default function Home() {
  return (
    <>
      <Topbar title="Início" />
      <div className="flex flex-col items-center justify-center py-2">
        Olá mundo
      </div>
    </>
  );
}
