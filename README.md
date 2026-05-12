# pi-thinking-cycle

A tiny [pi](https://pi.dev) package that adds a fast shortcut for changing the active thinking level.

## What it adds

- `Ctrl+Shift+T` cycles the effective thinking level.
- `/cycle-thinking` does the same thing from the prompt.

The extension skips levels that the current model clamps away. For example, if a model supports `off`, `low`, and `medium`, cycling from `medium` goes back to `off` instead of getting stuck trying `high`/`xhigh`.

## Install

From GitHub:

```bash
pi install https://github.com/bnema/pi-thinking-cycle
```

Or with the git shorthand:

```bash
pi install git:github.com/bnema/pi-thinking-cycle
```

Local development install:

```bash
pi install /home/brice/dev/projects/pi-thinking-cycle
```

One-session test without installing:

```bash
pi -e /home/brice/dev/projects/pi-thinking-cycle
```

After installing into an already-running pi session, run:

```text
/reload
```

## Usage

Press `Ctrl+Shift+T` in interactive pi to cycle through:

```text
off → minimal → low → medium → high → xhigh → off
```

The active model may support fewer effective levels. In that case pi clamps unsupported values and this extension keeps cycling to the next level that actually changes.

You can also run:

```text
/cycle-thinking
```

## Development

```bash
npm install
npm run typecheck
```

## Package layout

```text
extensions/index.ts  # pi extension entrypoint
package.json         # pi package manifest
```

## License

MIT
