import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  useInteractions,
  useFloating,
  useHover,
  useClick,
  useDismiss,
  arrow,
  offset,
  FloatingArrow,
  flip,
} from "@floating-ui/react";
import "./popover.scss";
import { createPortal } from "react-dom";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: ReactNode;
  trigger?: "hover" | "click";
  placement?: Side | AlignedPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}
export default function Popover(props: PopoverProps) {
  const {
    open,
    onOpenChange,
    content,
    children,
    trigger = "hover",
    placement = "bottom",
    className,
    style,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [offset(10), arrow({ element: arrowRef }), flip()],
  });

  const dismiss = useDismiss(context);
  const hover = useHover(context);
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    trigger === "hover" ? hover : click,
    dismiss,
  ]);
  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;
    document.body.appendChild(el);
    return el;
  }, []);

  const floating = isOpen && (
    <div
      className="popover-floating"
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      {content}
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill="#fff"
        stroke="#000"
        strokeWidth={1}
      />
    </div>
  );
  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
        style={style}
      >
        {children}
      </span>
      {createPortal(floating, el)}
    </>
  );
}
