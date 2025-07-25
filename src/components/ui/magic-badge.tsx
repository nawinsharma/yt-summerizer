interface Props {
	title: string;
}

const MagicBadge = ({ title }: Props) => {
	return (
		<div className="relative inline-flex h-8 select-none overflow-hidden rounded-full p-[1.5px] focus:outline-none">
			<span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6d28d9_0%,#d8b4fe_50%,#6d28d9_100%)]" />
			<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background dark:bg-slate-950 px-4 py-1 font-medium text-sm text-foreground dark:text-white backdrop-blur-3xl border border-border/20 dark:border-transparent">
				{title}
			</span>
		</div>
	);
};

export default MagicBadge;
