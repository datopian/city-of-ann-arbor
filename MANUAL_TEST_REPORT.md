# Manual Testing Checklist Report

## Testing Performed via Playwright Automation

This report documents automated testing of manual accessibility checklist items.

**Pages Tested**: 5
**Date**: 2026-01-12T15:13:04.169Z

## Checklist Results Summary

| Checklist Item | Automated Test | Status |
|----------------|----------------|--------|
| Navigate using keyboard only | ✅ Simulated Tab/Enter/Escape | See details |
| Test with screen reader | ⚠️ Cannot automate | Manual required |
| Zoom browser to 400% | ✅ CSS inspection | See details |
| Test at 320px viewport | ✅ Automated | See results |
| Verify focus visible | ✅ Analyzed styles | See details |
| Check color contrast | ✅ Programmatic | See ACCESSIBILITY_REPORT.md |

## Detailed Results by Page

### 1. https://data.a2gov.org/

#### Keyboard Navigation

- **All Focusable Elements Reachable**: ✅ Yes
- **Invisible Focus Count**: 0
- **Elements without outline**: 69
- **Keyboard Traps**: 0
- **Tab Sequence (first 10)**:
  1. A - "no-text"
  2. A - "Data"
  3. A - "Topics"
  4. A - "a2gov "
  5. A - "Environment"
  6. A - "Governance"
  7. A - "Infrastructure"
  8. A - "Planning"
  9. A - "Public Safety"
  10. A - "Transportation"

#### 320px Viewport Test

- **Has Horizontal Scroll**: ✅ No
- **Overflow Issues**: None detected

#### Focus Visibility

- **Elements with focus styles**: 6
- **Elements without outline**: 64
- **Issues**:
  - Many elements lack visible focus indicators

---

### 2. https://data.a2gov.org/search

#### Keyboard Navigation

- **All Focusable Elements Reachable**: ✅ Yes
- **Invisible Focus Count**: 0
- **Elements without outline**: 48
- **Keyboard Traps**: 0
- **Tab Sequence (first 10)**:
  1. A - "no-text"
  2. A - "Data"
  3. A - "Topics"
  4. A - "a2gov "
  5. A - "Monthly Solid Waste TotalsdatasetMonthly solid was"
  6. A - "PFAS Sampling DatadatasetAll of the city's PFAS wa"
  7. A - "Air Quality Sensor DatadatasetHourly air quality d"
  8. A - "Rainfall at City-Operated Rain GaugesdatasetThe Ci"
  9. A - "Zoning DistrictsdatasetGraphically defines the cur"
  10. A - "City of Ann Arbor Area ZipcodesdatasetZipcode feat"

#### 320px Viewport Test

- **Has Horizontal Scroll**: ❌ Yes - issue
- **Overflow Issues**:
  - DIV.bg-white rounded-lg p-6 pt-4 p: auto

#### Focus Visibility

- **Elements with focus styles**: 3
- **Elements without outline**: 46
- **Issues**:
  - Many elements lack visible focus indicators

---

### 3. https://data.a2gov.org/topics

#### Keyboard Navigation

- **All Focusable Elements Reachable**: ✅ Yes
- **Invisible Focus Count**: 0
- **Elements without outline**: 29
- **Keyboard Traps**: 0
- **Tab Sequence (first 10)**:
  1. A - "no-text"
  2. A - "Data"
  3. A - "Topics"
  4. A - "a2gov "
  5. A - "EnvironmentFind information on air quality, waste "
  6. A - "GovernanceExplore data on budgets, contracts, perm"
  7. A - "InfrastructureView data on water treatment and man"
  8. A - "PlanningSee data on land use, boundaries, and dist"
  9. A - "Public SafetyAccess information on crime, emergenc"
  10. A - "TransportationDiscover insights on traffic counts,"

#### 320px Viewport Test

- **Has Horizontal Scroll**: ✅ No
- **Overflow Issues**: None detected

#### Focus Visibility

- **Elements with focus styles**: 7
- **Elements without outline**: 23
- **Issues**:
  - Many elements lack visible focus indicators

---

### 4. https://data.a2gov.org/city-of-ann-arbor/aapd-crime-dashboard

#### Keyboard Navigation

- **All Focusable Elements Reachable**: ✅ Yes
- **Invisible Focus Count**: 0
- **Elements without outline**: 36
- **Keyboard Traps**: 0
- **Tab Sequence (first 10)**:
  1. A - "no-text"
  2. A - "Data"
  3. A - "Topics"
  4. A - "a2gov "
  5. A - "Home"
  6. A - "Data"
  7. A - "Visit dashboard "
  8. A - " RDF"
  9. A - " TTL"
  10. A - "JSON-LD"

#### 320px Viewport Test

- **Has Horizontal Scroll**: ❌ Yes - issue
- **Overflow Issues**:
  - DIV.items-center text-muted-foregr: scroll
  - DIV.flex space-x-4 mb-2 text-base : Element wider than parent

#### Focus Visibility

- **Elements with focus styles**: 3
- **Elements without outline**: 33
- **Issues**:
  - Many elements lack visible focus indicators

---

### 5. https://data.a2gov.org/city-of-ann-arbor/monthly-solid-waste-totals

#### Keyboard Navigation

- **All Focusable Elements Reachable**: ✅ Yes
- **Invisible Focus Count**: 0
- **Elements without outline**: 34
- **Keyboard Traps**: 0
- **Tab Sequence (first 10)**:
  1. A - "no-text"
  2. A - "Data"
  3. A - "Topics"
  4. A - "a2gov "
  5. A - "Home"
  6. A - "Data"
  7. A - "public services,"
  8. A - "public works"
  9. A - "Preview"
  10. A - "Download resource"

#### 320px Viewport Test

- **Has Horizontal Scroll**: ❌ Yes - issue
- **Overflow Issues**:
  - DIV.items-center text-muted-foregr: scroll

#### Focus Visibility

- **Elements with focus styles**: 3
- **Elements without outline**: 32
- **Issues**:
  - Many elements lack visible focus indicators

---

## Summary Across All Pages

| Metric | Total | Status |
|--------|-------|--------|
| Invisible focus elements | 0 | ✅ Good |
| Pages with horizontal scroll at 320px | 3/5 | ⚠️ Fix |
| Elements without focus outline | 198 | ⚠️ Review |

## Recommendations

1. **320px Viewport Issues**: Fix CSS to allow content reflow without horizontal scrolling.
   - Remove fixed widths on containers
   - Use max-width: 100% instead of fixed widths
   - Test with viewport width of 320px

2. **Focus Visibility**: Many elements lack visible focus indicators.
   - Add :focus-visible styles with outline or box-shadow
   - Ensure focus is visible on all interactive elements
   - Use `outline: 2px solid #0056b3` or similar

3. **Screen Reader Testing** (requires manual testing):
   - Test with NVDA (Windows)
   - Test with VoiceOver (Mac)
   - Verify all images have alt text
   - Verify form labels are announced
   - Verify dynamic content updates are announced

## Test Commands

```bash
# Run this manual test script
node keyboard-test.js
```

---

**Note**: This automated testing supplements but does not replace manual accessibility testing by human testers with disabilities.
