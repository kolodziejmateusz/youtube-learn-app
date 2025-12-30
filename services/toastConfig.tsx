import { ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  error: (props: any) => (
    <ErrorToast {...props} text1NumberOfLines={0} text2NumberOfLines={0} />
  ),
};
