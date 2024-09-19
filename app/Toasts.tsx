import {
  Toast,
  ToastProvider,
  ToastViewport,
  useToastState,
} from "@tamagui/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Toasts({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <SafeToastViewport />
      <CurrentToast />
    </ToastProvider>
  );
}

const SafeToastViewport = () => {
  const { left, top, right } = useSafeAreaInsets();
  return (
    <ToastViewport
      flexDirection="column-reverse"
      top={top + 40}
      left={left}
      right={right}
    />
  );
};

const CurrentToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      themeInverse
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <Toast.Title>{currentToast.title}</Toast.Title>
    </Toast>
  );
};
