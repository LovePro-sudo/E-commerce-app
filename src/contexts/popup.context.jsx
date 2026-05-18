import { createContext, useState } from "react";

export const PopUpContext = createContext({
  showPopUp: false,
  setShowPopUp: () => {},
  message: "",
  setMessage: () => {},
  title: "",
  setTitle: () => {},
  hasConfirm: false,
  setHasConfirm: () => {},
  selectedItem: null,
  setSelectedItem: () => {}
});

export const PopUpProvider = ({ children }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState(null)
  const [hasConfirm, setHasConfirm] = useState(false);
  const value = {
    showPopUp,
    setShowPopUp,
    message,
    setMessage,
    title,
    setTitle,
    hasConfirm,
    setHasConfirm,
    selectedItem,
    setSelectedItem
  };
  return (
    <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>
  );
};
