import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  as?: React.ElementType;
}

export function Container({ className, as: Component = "div", ...props }: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1600px] px-3.5 md:px-5 lg:px-[50px]", className)}
      {...props}
    />
  );
}
