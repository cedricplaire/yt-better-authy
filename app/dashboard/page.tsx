import { GetStartedButton } from "@/components/getstarted-button";
import { HeaderBread } from "@/components/header-breadcrum";

export default function Page() {
  return (
    <>
      <HeaderBread />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Cadre 1 Informations</p>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Cadre 2 Informatique</p>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Cadre 3 Musique</p>
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen text-center justify-center p-2 pt-4 flex-1 rounded-xl md:min-h-min">
          <GetStartedButton />
        </div>
      </div>
    </>
  );
}
