import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

type ThinkingLevel = "off" | "minimal" | "low" | "medium" | "high" | "xhigh";

const SHORTCUT = "ctrl+shift+t";
const LEVELS: readonly ThinkingLevel[] = ["off", "minimal", "low", "medium", "high", "xhigh"];

function nextCandidates(current: ThinkingLevel): ThinkingLevel[] {
	const currentIndex = LEVELS.indexOf(current);
	const startIndex = currentIndex === -1 ? 0 : currentIndex + 1;

	return LEVELS.map((_, offset) => LEVELS[(startIndex + offset) % LEVELS.length]);
}

function notify(ctx: ExtensionContext, message: string, variant: "info" | "warning" = "info"): void {
	if (!ctx.hasUI) return;
	ctx.ui.notify(message, variant);
}

export default function thinkingCycleExtension(pi: ExtensionAPI): void {
	function cycleThinking(ctx: ExtensionContext): void {
		const previous = pi.getThinkingLevel();

		for (const requested of nextCandidates(previous)) {
			pi.setThinkingLevel(requested);
			const actual = pi.getThinkingLevel();

			if (actual !== previous) {
				notify(ctx, `Thinking level: ${previous} → ${actual}`);
				return;
			}
		}

		// No candidate changed the effective level. This usually means the current
		// model does not support configurable reasoning and clamps everything to off.
		pi.setThinkingLevel(previous);
		notify(ctx, `Thinking level stayed at ${previous}; this model has no other available level.`, "warning");
	}

	pi.registerShortcut(SHORTCUT, {
		description: "Cycle thinking level",
		handler: cycleThinking,
	});

	pi.registerCommand("cycle-thinking", {
		description: `Cycle thinking level (${SHORTCUT})`,
		handler: async (_args, ctx) => {
			cycleThinking(ctx);
		},
	});
}
