Shot lists live at `scripts/shots/<slug>.json`: `{ "base": "https://…", "images": [{ "name", "path", "wait?", "steps?" }], "clips": [{ "name", "path", "seconds", "wait?", "steps?" }] }` (names a-z0-9-, https base, clip seconds 1–30).
Step vocabulary: `goto {path}`, `click {sel}`, `fill {sel,text}`, `press {key}`, `hover {sel}`, `scroll {y}`, `wait {ms}`.
Tripsmith checkout runs in Razorpay test mode only; never script a real payment.
