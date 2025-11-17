import { GetStartedButton } from "@/components/getstarted-button";
import { HeaderBread } from "@/components/header-breadcrum";
import { threeLatestPost } from "@/data/posts-data";
import { PostCategory } from "@/lib/generated/prisma/enums";

export default async function Page() {

  const latestMusic = await threeLatestPost(PostCategory.ENTERTAINMENT);
  const latestIT = await threeLatestPost(PostCategory.TECHNOLOGY);
  if (!latestMusic || !latestIT) {
    return (
      <span>Error fetching posts</span>
    )
  }
  return (
    <>
      <HeaderBread />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Music Post</p>

            {latestMusic.map((postM) => (
              <div key={postM.id} className="grid-cols-3 grid">
                <span className="grid-cols-1">{postM.user.name} </span>
                <span className="grid-cols-1">{postM.title} </span>
                <span className="grid-cols-1">
                  {postM.createdAt.toLocaleDateString()}{" "}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Informatique Post</p>
            {latestIT.map((postIT) => (
              <div key={postIT.id} className="grid-cols-3 grid">
                <span className="grid-cols-1">{postIT.user.name} </span>
                <span className="grid-cols-1">{postIT.title} </span>
                <span className="grid-cols-1">
                  {postIT.createdAt.toLocaleDateString()}{" "}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Informations News</p>
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen text-center justify-center p-2 pt-4 flex-1 rounded-xl md:min-h-min">
          <GetStartedButton />
        </div>
      </div>
    </>
  );
}
