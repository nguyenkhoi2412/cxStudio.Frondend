import * as React from "react";
import {
  useReducer,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import queryString from "query-string";

export class hookInstance {
  static useDocumentTitle = (title) => {
    React.useEffect(() => {
      document.title = title;
    }, [title]);
  };

  /*
   * useDarkMode
   */
  static useDarkSide = () => {
    const [theme, setTheme] = React.useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    React.useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);

      localStorage.setItem("theme", theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
  };

  /*
   * useWindowSize
   * Call hook when window resize
   * const [width, height] = useWindowSize();
   */
  static useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      const handleResize = helpersExtension.debounce(() => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 1000);
      // Add event listener
      window.addEventListener("resize.windowResize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () =>
        window.removeEventListener("resize.windowResize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  };

  /*
   * useDrag
   */
  static useDrag = () => {
    const [clicked, setClicked] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const position = React.useRef(0);

    const dragStart = React.useCallback((ev) => {
      position.current = ev.clientX;
      setClicked(true);
    }, []);

    const dragStop = React.useCallback(
      () =>
        // NOTE: need some delay so item under cursor won't be clicked
        window.requestAnimationFrame(() => {
          setDragging(false);
          setClicked(false);
        }),
      []
    );

    const dragMove = (ev, cb) => {
      const newDiff = position.current - ev.clientX;

      const movedEnough = Math.abs(newDiff) > 5;

      if (clicked && movedEnough) {
        setDragging(true);
      }

      if (dragging && movedEnough) {
        position.current = ev.clientX;
        cb(newDiff);
      }
    };

    return {
      dragStart,
      dragStop,
      dragMove,
      dragging,
      position,
      setDragging,
    };
  };
  /*
   * useOnClickOutside
   * Call hook passing in the ref and a function to call on outside click
   * const [isModalOpen, setModalOpen] = useState(false);
   * useOnClickOutside(ref, () => setModalOpen(false));
   */
  static useOnClickOutside = (ref, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }

          handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  };

  /*
   * useHover
   * How to use it?
   * const [hoverRef, isHovered] = useHover();
   * <div ref={hoverRef} style={{backgroundColor: isHovered ? '#00e3e3' : '#ccc'}} ></div>
   */
  static useHover = () => {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener("mouseover", handleMouseOver);
          node.addEventListener("mouseout", handleMouseOut);

          return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
          };
        }
      },
      [ref.current] // Recall only if ref changes
    );

    return [ref, value];
  };

  /*
   * useLocalStorage
   * How to use it?
   * const [name, setName] = useLocalStorage();
   * <input
      type="text"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
   */
  static useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to React.useState so logic is only executed once
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of React.useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as React.useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  };

  /*
   * useRouter
   * How to use it?
   * const router = useRouter();
   * // Get value from query string (?postId=123) or route param (/:postId)
   * router.query.postId
   * // Get current pathname
   * router.pathname
   */
  static useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const history = useNavigate();
    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => {
      return {
        // For convenience add push(), replace(), pathname at top level
        push: history.push,
        replace: history.replace,
        pathname: location.pathname,
        // Merge params and parsed query string into single "query" object
        // so that they can be used interchangeably.
        // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
        query: {
          ...queryString.parse(location.search), // Convert string to object
          ...params,
        },
        // Include match, location, history objects so we have
        // access to extra React Router functionality if needed.
        location,
        history,
      };
    }, [params, location, history]);
  };

  /*
   * useNavigate
   * How to use it?
   * const { state, set, undo, redo, clear, canUndo, canRedo } = useNavigate({});
   */
  static useNavigate = (initialPresent) => {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
      present: initialPresent,
    });
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
    // Setup our callback functions
    // We memoize with useCallback to prevent unnecessary re-renders
    const undo = useCallback(() => {
      if (canUndo) {
        dispatch({ type: "UNDO" });
      }
    }, [canUndo, dispatch]);
    const redo = useCallback(() => {
      if (canRedo) {
        dispatch({ type: "REDO" });
      }
    }, [canRedo, dispatch]);
    const set = useCallback(
      (newPresent) => dispatch({ type: "SET", newPresent }),
      [dispatch]
    );
    const clear = useCallback(
      () => dispatch({ type: "CLEAR", initialPresent }),
      [dispatch]
    );
    // If needed we could also return past and future state
    return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
  };

  /*
   * usePrevious
   * How to use it?
   * const [count, setCount] = useState(0);
   * const prevCount = usePrevious(count);
   */
  static usePrevious = (value) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  };

  /*
   * useToggle
   * How to use it?
   * const [isTextChanged, setIsTextChanged] = useToggle();
   * <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
   */
  static useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState((state) => !state), []);

    return [state, toggle];
  };

  /*
   * useAsync
   * How to use it?
   * const { execute, status, value, error } = useAsync(myFunction, false);
   * <button onClick={execute} disabled={status === "pending"}>
        {status !== "pending" ? "Click me" : "Loading..."}
     </button>
   * const myFunction = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const rnd = Math.random() * 10;
          rnd <= 5
            ? resolve("Submitted successfully 🙌")
            : reject("Oh no there was an error 😞");
        }, 2000);
      });
    };
   */
  static useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction()
        .then((response) => {
          setValue(response);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }, [asyncFunction]);
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
      if (immediate) {
        execute();
      }
    }, [execute, immediate]);
    return { execute, status, value, error };
  };

  /*
   * useHistory
   * How to use it?
   * const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});
   * <button onClick={undo} disabled={!canUndo}>
      Undo
     </button>
   */
  static useHistory = (initialPresent) => {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
      present: initialPresent,
    });
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
    // Setup our callback functions
    // We memoize with useCallback to prevent unnecessary re-renders
    const undo = useCallback(() => {
      if (canUndo) {
        dispatch({ type: "UNDO" });
      }
    }, [canUndo, dispatch]);
    const redo = useCallback(() => {
      if (canRedo) {
        dispatch({ type: "REDO" });
      }
    }, [canRedo, dispatch]);
    const set = useCallback(
      (newPresent) => dispatch({ type: "SET", newPresent }),
      [dispatch]
    );
    const clear = useCallback(
      () => dispatch({ type: "CLEAR", initialPresent }),
      [dispatch]
    );
    // If needed we could also return past and future state
    return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
  };

  /*
   * useKeyPress
   * How to use it?
   * const happyPress = useKeyPress("h");
   * {happyPress && "😊"}
   */
  static useKeyPress = (targetKey) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState < boolean > false;
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
  };
}
