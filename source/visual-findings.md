# Visual inspection findings

The first render of folio 209 showed a Science chapter-introduction page and did not contain the figure for Questions 506–507. The correct source is folio 210.

Folio 210 contains the printed heading “Questions 506 and 507 are based on the following figure.” The figure is a force diagram for an airplane, with arrows labeled Lift upward, Weight downward, Drag leftward, and Thrust rightward. Questions 506 and 507 appear directly below the figure on the same source folio. The exact source render is stored at `/home/ubuntu/webdev-static-assets/ged-figures/folio-210.png` and uploaded for the web app at `/manus-storage/folio-210_76c26582.png`.

Implementation requirement: Questions 506–507 must display this actual folio image as their shared visual context, with the extracted question text shown separately below it. The source PDF iframe should not be the only visual fallback for this group.

## Verification update

The grouped dataset now records `visualPage: 210` for Questions 506–507, and the mapped uploaded asset is `/manus-storage/folio-210_76c26582.png` (the generated visual map uses the corrected v2 upload path). The reader renders the actual source folio image above the linked Questions 506 and 507 cards, while the placeholder sentence is suppressed for visual-only contexts. A shareable query form `/?group=group-506-507` was added for direct verification.

## Final verification

The latest grouped-reader screenshot for `/?group=group-506-507` confirms the question set is linked directly to the corrected actual visual folio asset. The dataset records `visualPage: 210`, the asset map contains the folio-210 upload, and the placeholder sentence is no longer rendered for that visual group.
