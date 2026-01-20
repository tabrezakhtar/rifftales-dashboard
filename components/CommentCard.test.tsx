import { render } from "@testing-library/react";
import CommentCard from "./CommentCard";
import { Types } from "mongoose";
import type { Comment } from "@/types";

it("renders CommentCard unchanged", () => {
const sampleComment: Comment = {
  _id: "507f1f77bcf86cd799439011" as unknown as Types.ObjectId,
  equipmentId: "507f1f77bcf86cd799439012" as unknown as Types.ObjectId,
  user: {
    _id: "507f1f77bcf86cd799439013" as unknown as Types.ObjectId,
    username: "testuser",
  },
  text: "This is a snapshot test",
  date: new Date("2024-01-01T12:00:00Z").toISOString(),
};


  const { container } = render(<CommentCard comment={sampleComment} />);
  expect(container).toMatchSnapshot();
});
