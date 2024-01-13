import { Skeleton } from "@mui/material";
import "./PostSectionSkeleton.scss";
import { skeleton_background_color } from "@/Utils/Constants";

const PostSectionSkeleton = () => {
    const arr=new Array(3).fill(0);
  return (
    <div className="post-section-skeleton-wrapper">
        {arr.map((item) => (
          <Skeleton
            sx={{ bgcolor: skeleton_background_color }}
            className="card"
            height="400px"
          />
        ))}
    </div>
  );
};

export default PostSectionSkeleton;
