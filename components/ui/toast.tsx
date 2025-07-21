"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, X, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col space-y-2",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-gray-200",
        success: "bg-green-500 text-white border-green-500",
        warning: "bg-yellow-400 text-black border-yellow-500",
        destructive: "bg-red-500 text-white border-red-500",
        loading: "bg-gray-100 text-gray-800 border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const variantIcons = {
  success: <CheckCircle className="h-5 w-5 text-white shrink-0 mt-1" />,
  warning: <AlertTriangle className="h-5 w-5 text-black shrink-0 mt-1" />,
  destructive: <X className="h-5 w-5 text-white shrink-0 mt-1" />,
  loading: (
    <Loader2 className="h-5 w-5 animate-spin text-gray-600 shrink-0 mt-1" />
  ),
};

type CustomToastProps = {
  hideClose?: boolean;
} & React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  CustomToastProps
>(({ className, variant, hideClose, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      duration={3000}
      {...props}
    >
      {children}
      {/* Remove ToastClose when hideClose is true */}
      {!hideClose && (
        <button
          className="absolute right-2 bottom-2 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground focus:outline-none focus:ring-1"
          onClick={() => ToastPrimitives.dismiss(props.id)}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  type ToastProps,
  type ToastActionElement,
  variantIcons,
};
