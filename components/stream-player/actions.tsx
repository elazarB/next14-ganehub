"use client";

import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { onFollow, onUnFollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const router = useRouter();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have Unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sigh-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      size="sm"
      variant="primary"
      onClick={toggleFollow}
      disabled={isPending || isHost}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};


export const ActionsSkeleton =() => {
  return <Skeleton  className="h-10 w-full lg:w-24"/>
}