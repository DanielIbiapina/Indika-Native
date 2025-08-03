import Toast from "react-native-toast-message";

export const useToast = () => {
  const showSuccess = (title, message) => {
    Toast.show({
      type: "success",
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showError = (title, message) => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showInfo = (title, message) => {
    Toast.show({
      type: "info",
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showWarning = (title, message) => {
    Toast.show({
      type: "warning",
      text1: title,
      text2: message,
      visibilityTime: 3500,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
