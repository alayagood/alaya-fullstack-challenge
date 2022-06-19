import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

/**
 * @see https://usehooks.com/useDebounce/
 * @param {any} value
 * @param {() => any} reduxAction
 * @param {number} delay Default 500
 * @returns
 */
function useReduxDebounce(value, reduxAction, delay = 500) {
  // State and setters for debounced value
  const dispatch = useDispatch();
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        reduxAction && dispatch(reduxAction(value));
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [dispatch, reduxAction, value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default useReduxDebounce;
