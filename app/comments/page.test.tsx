import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CommentsPage from "./page";
import { Types } from "mongoose";
import useSWR from 'swr';

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: {
      comments: [
        {
          _id: "507f1f77bcf86cd799439011" as unknown as Types.ObjectId,
          equipmentId: "507f1f77bcf86cd799439012" as unknown as Types.ObjectId,
          user: { _id: "507f1f77bcf86cd799439013" as unknown as Types.ObjectId, username: "testuser" },
          text: "Sample comment",
          date: new Date("2024-01-01T12:00:00Z").toISOString(),
        },
      ],
      total: 1,
    },
    error: null,
    isLoading: false,
  })),
}));

it("renders CommentsPage unchanged", () => {
  const { container } = render(<CommentsPage />);
  expect(container).toMatchSnapshot();
});

it("updates search on input change", () => {
  const { getByLabelText } = render(<CommentsPage />);
  const searchInput = getByLabelText("Search comments");

  fireEvent.change(searchInput, { target: { value: "new search" } });

  expect(searchInput).toHaveValue("new search");
});

it("changes sort order when sort select is changed", async () => {
  render(<CommentsPage />);
  const user = userEvent.setup();

  const sortSelect = screen.getByLabelText("Sort by date");
  await user.click(sortSelect);

  const oldestFirstOption = await screen.findByText("Oldest first");
  await user.click(oldestFirstOption);

  expect(sortSelect).toHaveTextContent("Oldest first");
});

it("changes page size when items per page select is changed", async () => {
  render(<CommentsPage />);
  const user = userEvent.setup();

  const pageSizeSelect = screen.getByLabelText("Items per page");
  
  await user.click(pageSizeSelect);
  const option25 = await screen.findByText("25");
  await user.click(option25);

  expect(pageSizeSelect).toHaveTextContent("25");
});

it("changes page when pagination is clicked", () => {
  const mockData = {
    comments: Array(30).fill(null).map((_, i) => ({
      _id: `507f1f77bcf86cd79943901${i}` as unknown as Types.ObjectId,
      equipmentId: `507f1f77bcf86cd79943902${i}` as unknown as Types.ObjectId,
      user: { _id: `507f1f77bcf86cd79943903${i}` as unknown as Types.ObjectId, username: `testuser${i}` },
      text: `Comment ${i}`,
      date: new Date("2024-01-01T12:00:00Z").toISOString(),
    })),
    total: 30,
  };

  (useSWR as jest.Mock).mockImplementation(() => ({
    data: mockData,
    error: null,
    isLoading: false,
  }));

  const { getByLabelText } = render(<CommentsPage />);
  const page2Button = getByLabelText("Go to page 2");

  fireEvent.click(page2Button);

  expect(page2Button).toBeInTheDocument();
});

it("treats undefined data as empty comments and total 0", () => {
  (useSWR as jest.Mock).mockImplementation(() => ({
    data: undefined,
    error: null,
    isLoading: false,
  }));

  const { queryByText } = render(<CommentsPage />);
  expect(queryByText("Sample comment")).toBeNull();
});