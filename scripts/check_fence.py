import sys, re

path = sys.argv[1]
with open(path) as f:
    text = f.read()

chunks = len(re.split(r'^\s*`{3,}', text, flags=re.M))
is_balanced = (chunks % 2 == 1)
print(f"{path}: chunks={chunks}, balanced={is_balanced}")
if not is_balanced:
    sys.exit(1)

