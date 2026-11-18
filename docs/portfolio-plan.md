# Portfolio plan — six products, four versions each

**Single source of truth for execution** (consolidated 2026-11-19). Each project's `PRD.md` and `docs/07-plan.md` hold the detail; this page links to them, must agree with them, and never duplicates their requirements. If they disagree, fix the project docs and this page together.

## Repositories

| # | Project | PRD | Plan | Docs alignment PR |
|---|---|---|---|---|
| 1 | Tripsmith | [PRD](https://github.com/virajdomadia/tripsmith/blob/main/PRD.md) | [07-plan](https://github.com/virajdomadia/tripsmith/blob/main/docs/07-plan.md) | [#166](https://github.com/virajdomadia/tripsmith/pull/166) |
| 2 | Frontrow | [PRD](https://github.com/virajdomadia/frontrow/blob/main/PRD.md) | [07-plan](https://github.com/virajdomadia/frontrow/blob/main/docs/07-plan.md) | [#18](https://github.com/virajdomadia/frontrow/pull/18) |
| 3 | Pagecraft | [PRD](https://github.com/virajdomadia/pagecraft/blob/main/PRD.md) | [07-plan](https://github.com/virajdomadia/pagecraft/blob/main/docs/07-plan.md) | [#7](https://github.com/virajdomadia/pagecraft/pull/7) |
| 4 | Offcut | [PRD](https://github.com/virajdomadia/offcut/blob/main/PRD.md) | [07-plan](https://github.com/virajdomadia/offcut/blob/main/docs/07-plan.md) | [#5](https://github.com/virajdomadia/offcut/pull/5) |
| 5 | Skillroom | [PRD](https://github.com/virajdomadia/skillroom/blob/main/PRD.md) | [07-plan](https://github.com/virajdomadia/skillroom/blob/main/docs/07-plan.md) | [#4](https://github.com/virajdomadia/skillroom/pull/4) |
| 6 | Platter | [PRD](https://github.com/virajdomadia/platter/blob/main/PRD.md) | [07-plan](https://github.com/virajdomadia/platter/blob/main/docs/07-plan.md) | [#4](https://github.com/virajdomadia/platter/pull/4) |

## The rule

- **v1–v3:** what the product needs: a complete, sellable v1, then the workflows and engineering depth it actually requires.
- **v4:** one unique thing the project proves, small and demonstrable.
- Hardening goes inside each version's close row; a new "v2.5"-style stage needs a reason a reviewer would notice.
- Corrections go into existing requirements, not new features. Add-ons only from time saved.

## Build order (revised 2026-11-19)

1 Tripsmith → 2 Frontrow → 3 Pagecraft → 4 Offcut → 5 Skillroom → 6 Platter

Pagecraft moved up from fifth so the three strongest, most different stories ship first: **AI / tool integration**, **concurrency / distributed systems**, **CRDT collaboration**. Projects 4–6 are conditional on 1–3 reaching release standard.

## Versions, hours, status

| # | Project | Identity | v1 | v2 | v3 | v4 (unique) | Planned h | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | **Tripsmith** | AI agent with tool calling | Agency website (35) | Booking engine (20.5) + v2.5 Strengthen (62.5) + v2.6 Hardening (23) | AI trip planner (21) | **MCP server**: the same 4 tools as a thin adapter over existing services, public catalogue only, never pays (≈ 6, prototype target) | ≈ 168 (v1–v3 ≈ 162 + v4 ≈ 6) | v1–v3 ✅ (14 Nov) · v4 **next** |
| 2 | **Frontrow** | Concurrency + realtime | Box office (18) | Live hall (10) | Full house (10) | **In your pocket**: native Expo app, offline wallet, push, multi-scanner check-in with provisional offline scans (16) | 54 | planned |
| 3 | **Pagecraft** | CRDT / editor engineering | Solo studio (18) | Studio session (14) | Pro (13) | **Your domain, your code**: custom domains, static export, GitHub push, import of Pagecraft's own export (8) | 53 | planned |
| 4 | **Offcut** | Embeddings / vector search | Store (16) | Lens (11) | Full fit (8) | **Share to Offcut**: PWA Web Share Target, Android; upload/paste fallback on iOS (3) | 38 | planned |
| 5 | **Skillroom** | Own video pipeline + creator payouts | Classroom (16) | All-access (11) | Royalties (8) | **Offline lessons**: encrypted offline playback, 48-h device-bound lease (3) | 38 | planned |
| 6 | **Platter** | Geo + realtime dispatch | Kitchen (16) | Rush (11) | Fleet, incl. **native rider app** (16) | **Order together**: group cart + shared tracking (6) | 49 | planned |

**Remaining planned work:** Tripsmith v4 6 + 54 + 53 + 38 + 38 + 49 = **≈ 238 h** (add-ons excluded). Tripsmith's v1–v3 came to ≈ 162 h planned against an original ≈ 66 h, almost all of it from the unplanned v2.5 / v2.6 stages. Hour figures here are plan estimates, not recorded actuals.

## Mobile

| App | Version | Why native (or not) |
|---|---|---|
| Frontrow app | v4 | Offline ticket wallet, camera scanning, push; door scanners lose signal |
| Platter rider app | v3 | Background location: a PWA stops sending GPS when the screen locks. v1 ships a PWA, v3 goes native, and the case study says why |
| Offcut, Skillroom | v4 | PWA is enough: share target / offline cache. Shows knowing when not to go native |

Both native apps: Expo (React Native, TypeScript), the same FastAPI API with bearer-token sessions for native clients (built once in Frontrow, reused in Platter), Android APK + Expo Go, no store listing, builds on GitHub Actions.

## Honest-claims rules (2026-11-19)

| Project | Claim | Precise wording |
|---|---|---|
| Frontrow | Offline scanners | Offline scans are `pending_sync`; on sync the first scan the server commits is `confirmed`, later ones `duplicate_flagged`. Two offline scanners can't prevent a duplicate, only detect it; a ticket refunded or transferred after a scanner's last download stays valid in that snapshot until it reconnects |
| Skillroom | Cost | No per-play platform fees; ₹0 at demo scale within free quotas |
| Skillroom | Protection | Encrypted playback with entitlement checks and a device limit, **not DRM** |
| Skillroom | Worker | A queue-driven script; GitHub Actions is the free runner; at scale it runs as a container worker |
| Pagecraft | Lighthouse | 100s are a target on seeded templates, not a promise for every site |
| Pagecraft | Export | Round-trip guaranteed for Pagecraft's own export format only |
| Platter | ETA | "Measured from our own history" (average ± 1 SD), not "learned" |
| Platter | Events | `order_events` is the durable log; `LISTEN/NOTIFY` is only a wake-up |
| Tripsmith | MCP | Single agency, no tenancy; `createEnquiry` reuses the web form's limits and PII redaction |

## Decisions (resolved 2026-11-19)

- **Frontrow:** offline scanning uses a list of ticket-token hashes **signed with Ed25519**. The private key stays on the server and the public key is in the app; no secret on devices. The list is bound to one showtime, versioned, and expires at showtime end + 2 h. Tampered, foreign, expired or older lists are refused. The v1 ticket design is unchanged.
- **Skillroom:** 2× is the maximum playback speed, enforced by the player. Credited time comes from server-observed elapsed time (the client's delta is only an upper bound), with heartbeat dedupe and per-user/lesson/day caps.
- **Platter:** the ETA band is average ± 1 SD, lower bound floored at 0, labelled "based on the last 20 orders". It is a descriptive range, never called a confidence interval. Native rider testing is done on the APK across a matrix: locked screen, backgrounded, network loss, permission revoked, battery optimisation.
- **Tripsmith:** the public MCP URL stays unconfirmed until the step-3 checklist and the production exit criteria in [tripsmith `docs/07-plan.md`](https://github.com/virajdomadia/tripsmith/blob/main/docs/07-plan.md) pass. The stale pydantic-ai wording in 04 §v4 has been fixed.

## Definition of done (every project)

A project is finished when its **defining engineering claim has a working demonstration on production**, not when its checklist is ticked. Examples: two tabs and one seat (Frontrow), two cursors in one headline (Pagecraft), a photo in and matches out (Offcut), an encrypted segment plus a refused third device (Skillroom), a rider moving with a locked phone (Platter), and Claude Desktop planning a trip through MCP (Tripsmith).
