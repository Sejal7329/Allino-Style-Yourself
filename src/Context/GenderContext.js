
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GenderContext = createContext(null);

export function GenderProvider({ children }) {
  const [gender, setGender] = useState("women");

  useEffect(() => {
    document.body.setAttribute(
      "data-shopping-mode",
      gender
    );

    return () => {
      document.body.removeAttribute(
        "data-shopping-mode"
      );
    };
  }, [gender]);

  const switchGender = (nextGender) => {
    if (nextGender === "women" || nextGender === "men") {
      setGender(nextGender);
    }
  };

  return (
    <GenderContext.Provider
      value={{
        gender,
        switchGender,
        isWomen: gender === "women",
        isMen: gender === "men",
      }}
    >
      {children}
    </GenderContext.Provider>
  );
}

export function useGender() {
  const context = useContext(GenderContext);

  if (!context) {
    throw new Error(
      "useGender must be used inside GenderProvider"
    );
  }

  return context;
}
