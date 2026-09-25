"""Append the shared glass control skin without changing header markup."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINK = '<link rel="stylesheet" href="/assets/shared-glass-controls.css?v=20260925-2" />'


def main() -> None:
    count = 0
    for path in ROOT.rglob("index.html"):
        if any(part.startswith(".") for part in path.relative_to(ROOT).parts):
            continue
        if "internal" in path.relative_to(ROOT).parts:
            continue
        source = path.read_text(encoding="utf-8")
        if "<main" not in source or LINK in source:
            continue
        if "</head>" not in source:
            raise ValueError(path)
        source = source.replace("</head>", f"  {LINK}\n  </head>", 1)
        path.write_text(source, encoding="utf-8", newline="\n")
        count += 1
    print(f"Updated glass controls on {count} pages")


if __name__ == "__main__":
    main()
