import { render, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";

it("renders SearchInput unchanged", () => {
  const handleChange = jest.fn();
  const { container } = render(<SearchInput value="" onChange={handleChange} />);
  expect(container).toMatchSnapshot();
});

it("calls onChange immediately when no debounce", () => {
  const handleChange = jest.fn();
  const { getByRole } = render(<SearchInput value="" onChange={handleChange} />);
  const input = getByRole("textbox");

  fireEvent.change(input, { target: { value: "test" } });

  expect(handleChange).toHaveBeenCalledWith("test");
});

it("debounces onChange when debounceMs is set", () => {
  jest.useFakeTimers();
  const handleChange = jest.fn();
  const { getByRole } = render(<SearchInput value="" onChange={handleChange} debounceMs={300} />);
  const input = getByRole("textbox");

  // First change
  fireEvent.change(input, { target: { value: "test1" } });
  expect(handleChange).not.toHaveBeenCalled();

  // Second change before timeout expires, should clear first timeout
  jest.advanceTimersByTime(100);
  fireEvent.change(input, { target: { value: "test2" } });
  expect(handleChange).not.toHaveBeenCalled();

  // Advance to after debounce period
  jest.advanceTimersByTime(300);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith("test2");

  jest.useRealTimers();
});
