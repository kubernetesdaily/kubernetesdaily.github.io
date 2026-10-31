import glob, sys, re

failed = []
files = glob.glob("priv/static/kubedaily/blog/*.md") + glob.glob("priv/static/kubedaily/labs/*.md")
for path in files:
    with open(path) as f:
        text = f.read()
    chunks = len(re.split(r'^\s*`{3,}', text, flags=re.M))
    if chunks % 2 != 1:
        failed.append((path, chunks))

print(f"Checked {len(files)} markdown files.")
if failed:
    print("FAILED files:", failed)
    sys.exit(1)
else:
    print("ALL files have strictly balanced code fences!")

