# Recovered website source

The complete October 30 website was committed locally in `/Users/discoverycore/src/Light-Company.github.io`, on `rebrand/order-investors` at `3acee9d`. It had a clean working tree and no stashes. GitHub main ended at `0cbf251` before the benchmark work, so selecting only the latest remote main missed seven local commits.

Recovered content includes the 43.627-second lab hero compiled from MVI_0096–0099, the blue-beam Light Company mark, animated ASCII footer, rebranded preorder and investor pages, their navigation links, and the inquiry-worker source. The existing Sites Worker and D1 form endpoint remain the active hosting path; the separately configured inquiry worker has not been deployed as part of this recovery.

`restore/complete-website` starts from that recovered branch and merges `design/impeccable-benchmarks` at `d559c45`. Benchmark UI, data, Impeccable installation, and hooks are preserved exactly. Footer conflicts combine the recovered navigation with Benchmarks; the current lab hero remains authoritative.

Validation: recovered baseline passed 51 tests; combined release passes 55. Deployment pruning checks current rendered routes and runtime assets, keeps all dynamic gallery previews, and omits unused generated media. Media provenance records do not force retired clips into the hosting build. Source originals remain in the full GitHub repository. The compact artifact is approximately 226 MiB.
