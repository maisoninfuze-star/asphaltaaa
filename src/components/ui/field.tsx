import { cn } from "@/lib/utils";

const inputBase =
  "w-full border border-warm/20 bg-asphalt px-4 py-4 text-warm placeholder:text-concrete/70 outline-none transition-colors focus:border-hivis";

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="label-mono text-warm/80">{label}</span>
      {children}
      {error && (
        <span className="font-mono text-[0.7rem] text-hivis">{error}</span>
      )}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea {...props} className={cn(inputBase, "min-h-32 resize-y", props.className)} />
  );
}
