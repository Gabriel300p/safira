"use client";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

const DialogForm = DialogPrimitive.Root;

const DialogFormTrigger = DialogPrimitive.Trigger;

const DialogFormPortal = DialogPrimitive.Portal;

const DialogFormClose = DialogPrimitive.Close;

const DialogFormOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/30", className)}
    {...props}
  />
));
DialogFormOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogFormContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title: string;
    subtitle: string;
    tabs: { label: string; icon: string }[];
    currentStep: number;
    onStepChange: (step: number) => void;
    onClose: () => void;
    footer: React.ReactNode;
    progress: number;
  }
>(
  (
    {
      className,
      children,
      title,
      subtitle,
      tabs,
      currentStep,
      onStepChange,
      onClose,
      footer,
      progress,
      ...props
    },
    ref
  ) => (
    <DialogFormPortal>
      <DialogFormOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-[900px] h-[85vh] translate-x-[-50%] translate-y-[-50%] border border-neutral-200 bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        <div className="flex h-full">
          {/* Left column (40%) */}
          <div className="w-2/5 p-6 bg-neutral-50 rounded-l-lg flex flex-col overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-sm text-neutral-500 mb-6">{subtitle}</p>
            <div className="space-y-2 flex-grow">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => onStepChange(index + 1)}
                  className={`flex items-center w-full text-left p-2 rounded ${
                    currentStep === index + 1
                      ? "bg-orange-100 text-orange-500 font-medium"
                      : "text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <div className="text-sm text-neutral-500 mb-2">
                Passo {currentStep} de {tabs.length}
              </div>
              <Progress value={progress} className="w-full" />
              <div className="text-sm text-neutral-500 mt-2">
                {progress}% concluído
              </div>
            </div>
          </div>

          {/* Right column (60%) */}
          <div className="w-3/5 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {tabs[currentStep - 1].label}
              </h3>
              <DialogPrimitive.Close
                onClick={onClose}
                className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
            <div className="flex-grow overflow-y-auto pr-2">{children}</div>
            <Separator className="my-6" />
            <div className="mt-auto">{footer}</div>
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogFormPortal>
  )
);
DialogFormContent.displayName = DialogPrimitive.Content.displayName;

export { DialogForm, DialogFormClose, DialogFormContent, DialogFormTrigger };
