import { flip } from "@floating-ui/core";
import {
  useFloating,
  useInteractions,
  useDismiss,
  useClick,
} from "@floating-ui/react-dom-interactions";
import { useEffect } from "react";

export const useMenu = (props: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) => {
  const { onOpenChange, open } = props;
  const { context, x, y, reference, floating, strategy } = useFloating({
    middleware: [flip()],
    placement: "right-start",
    onOpenChange,
    open,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {}),
  ]);

  useEffect(() => {}, [floating]);

  return {
    triggerProps: getReferenceProps({
      ref: reference,
    }),
    menuProps: getFloatingProps({
      ref: floating,
      style: {
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      },
    }),
  };
};
