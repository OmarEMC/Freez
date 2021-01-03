import { useState } from "react";

const useVisibility = defaultIsVisible => {
  const [isVisible, setVisible] = useState(defaultIsVisible || false);
  const Toggle = () => setVisible(!isVisible);
  return { isVisible, Toggle };
};

export default useVisibility;