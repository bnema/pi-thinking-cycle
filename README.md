# pi-thinking-cycle

Cycle Pi's active thinking level with one shortcut.

## What it does

- Adds `Ctrl+Shift+T` in interactive Pi.
- Adds `/cycle-thinking` from the prompt.
- Skips thinking levels that the current model clamps away.

## Install

```bash
pi install git:github.com/bnema/pi-thinking-cycle
```

If installed into a running Pi session, reload extensions:

```text
/reload
```

## Use

Press `Ctrl+Shift+T`, or run:

```text
/cycle-thinking
```

The cycle is:

```text
off → minimal → low → medium → high → xhigh → off
```

## Develop

```bash
npm install
npm run typecheck
pi -e .
```
