import { render } from "@testing-library/react";
import CommentCard from "./CommentCard";
import type { ClientComment } from "@/types";

it("renders CommentCard unchanged", () => {
  const sampleComment: ClientComment = {
    _id: "507f1f77bcf86cd799439011",
    equipmentId: "507f1f77bcf86cd799439012",
    user: {
      _id: "507f1f77bcf86cd799439013",
      username: "testuser",
    },
    text: "This is a snapshot test",
    date: new Date("2024-01-01T12:00:00Z").toISOString(),
  };

  const { container } = render(<CommentCard comment={sampleComment} />);
  expect(container).toMatchSnapshot();
});
