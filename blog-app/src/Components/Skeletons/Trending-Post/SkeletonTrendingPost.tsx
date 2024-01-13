import { Skeleton } from "@mui/material";
import './SkeletonTrendingPost.scss';
import { skeleton_background_color } from "@/Utils/Constants";
const SkeletonTrendingPost=()=>{
    return (
      <div className="skeleton-trending-post-wrapper">
        <Skeleton
          variant="text"
          width="25%"
          height={50}
          sx={{ bgcolor: skeleton_background_color }}
        />
        <Skeleton
          variant="rounded"
          sx={{ bgcolor: skeleton_background_color }}
          width="100%"
          height="60vh"
        />
      </div>
    );
}

export default SkeletonTrendingPost;