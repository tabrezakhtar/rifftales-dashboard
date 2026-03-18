import { render } from "@testing-library/react";
import CommentsList from "./CommentsList";
import type { ClientComment } from "@/types";

it("renders CommentsList unchanged", () => {
  const comments: ClientComment[] = [
    {
      _id: "507f1f77bcf86cd799439011",
      equipmentId: "507f1f77bcf86cd799439012",
      user: { _id: "507f1f77bcf86cd799439013", username: "testuser1" },
      text: "First comment",
      date: new Date("2024-01-01T12:00:00Z").toISOString(),
    },
    {
      _id: "507f1f77bcf86cd799439014",
      equipmentId: "507f1f77bcf86cd799439015",
      user: { _id: "507f1f77bcf86cd799439016", username: "testuser2" },
      text: "Second comment",
      date: new Date("2024-01-02T15:30:00Z").toISOString(),
    },
  ];

  const { container } = render(<CommentsList comments={comments} />);
  expect(container).toMatchSnapshot();
});
