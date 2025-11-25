import { GetStartedButton } from "@/components/getstarted-button";
import { HeaderBread } from "@/components/header-breadcrum";
import { threeLatestPost } from "@/data/posts-data";
import { PostCategory } from "@/lib/generated/prisma/enums";

export default async function Page() {

  const latestMusic = await threeLatestPost(PostCategory.ENTERTAINMENT);
  const latestIT = await threeLatestPost(PostCategory.TECHNOLOGY);
  const latestDEV = await threeLatestPost(PostCategory.DEVELOPMENT);
  if (!latestMusic || !latestIT || !latestDEV) {
    return (
      <span>Error fetching latests posts</span>
    )
  }
  return (
    <>
      <HeaderBread />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Music Posts</p>
            {latestMusic.map((postM) => (
              <div key={postM.id} className="flex-row">
                <span className="w-1/4 after:content-['_:']">
                  {postM.user.name}{" "}
                </span>
                <span className="w-3/4 ml-1 overflow-x-hidden">{postM.title} </span>
              </div>
            ))}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Informatique Posts</p>
            {latestIT.map((postIT) => (
              <div key={postIT.id} className="flex-row">
                <span className="w-1/4 after:content-['_:']">
                  {postIT.user.name}{" "}
                </span>
                <span className="w-3/4 ml-1 overflow-x-hidden">{postIT.title} </span>
              </div>
            ))}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Dev Posts</p>
            {latestDEV.map((postDEV) => (
              <div key={postDEV.id} className="flex-row">
                <span className="w-1/4 after:content-['_:']">
                  {postDEV.user.name}{" "}
                </span>
                <span className="w-3/4 ml-1 overflow-x-hidden">
                  {postDEV.title}{" "}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen text-center justify-center p-2 pt-4 flex-1 rounded-xl md:min-h-min">
          <GetStartedButton />
        </div>
      </div>
    </>
  );
}
