jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown) => ({
      json: async () => body,
    }),
  },
}));

import { fetchComments } from "@/lib/comments";
import { GET } from "./route";

jest.mock("@/lib/comments", () => ({
  fetchComments: jest.fn(),
}));

beforeEach(() => {
  (fetchComments as jest.Mock).mockReset();
});

it("calls fetchComments with default parameters and returns JSON", async () => {
  (fetchComments as jest.Mock).mockResolvedValue({ comments: [{ id: "1" }], total: 1 });

  const req = ({ url: "http://localhost/api/comments" } as unknown) as Request;
  const res = await GET(req);
  const data = await (res as Response).json();

  expect(fetchComments).toHaveBeenCalledWith(1, 10, "desc", "");
  expect(data).toEqual({ comments: [{ id: "1" }], total: 1 });
});

it("parses query params and returns supplied sort/search/page/pageSize", async () => {
  const mockComments = [{ id: "a" }, { id: "b" }];
  (fetchComments as jest.Mock).mockResolvedValue({ comments: mockComments, total: 2 });

  const url = "http://localhost/api/comments?page=2&pageSize=5&sort=asc&search=term";
  const req = ({ url } as unknown) as Request;
  const res = await GET(req);
  const data = await (res as Response).json();

  expect(fetchComments).toHaveBeenCalledWith(2, 5, "asc", "term");
  expect(data).toEqual({ comments: mockComments, total: 2 });
});

it("defaults to desc when sort is not 'asc'", async () => {
  (fetchComments as jest.Mock).mockResolvedValue({ comments: [], total: 0 });

  const req = ({ url: "http://localhost/api/comments?sort=invalid" } as unknown) as Request;
  const res = await GET(req);
  await (res as Response).json();

  expect(fetchComments).toHaveBeenCalledWith(1, 10, "desc", "");
});
