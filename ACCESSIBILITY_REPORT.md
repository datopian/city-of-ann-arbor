# WCAG 2.0 Accessibility Report - City of Ann Arbor Open Data Portal

## Executive Summary

This report evaluates 9 pages on the City of Ann Arbor Open Data Portal (https://data.a2gov.org/) against WCAG 2.0 guidelines using **axe-core** automated accessibility testing.

**Total Unique Accessibility Violations Found**: 3

## Dataset Tab Analysis

Dataset: https://data.a2gov.org/city-of-ann-arbor/monthly-solid-waste-totals/r/08a340f6-6f47-45e5-8fb0-98a7a04b6d4a

### Preview Tab

**Status**: Tab found and analyzed

**Violations**: 1

**Content Analysis**:
| Check | Count |
|-------|-------|
| Data tables | 1 |
| Forms | 0 |
| Form inputs | 0 |
| Unlabeled inputs | 0 |
| Links | 28 |
| Buttons | 51 |

**Violations by Criterion**:
- 1.3.3: 1 violation(s)
  - color-contrast (serious)

---

### Table Schema Tab

**Status**: Tab found and analyzed

**Violations**: 1

**Content Analysis**:
| Check | Count |
|-------|-------|
| Data tables | 1 |
| Forms | 0 |
| Form inputs | 0 |
| Unlabeled inputs | 0 |
| Links | 28 |
| Buttons | 6 |

**Violations by Criterion**:
- 1.3.3: 1 violation(s)
  - color-contrast (serious)

---

### API Tab

**Status**: Tab found and analyzed

**Violations**: 2

**Content Analysis**:
| Check | Count |
|-------|-------|
| Data tables | 0 |
| Forms | 0 |
| Form inputs | 0 |
| Unlabeled inputs | 0 |
| Links | 28 |
| Buttons | 6 |

**Violations by Criterion**:
- 1.3.3: 1 violation(s)
  - color-contrast (serious)
- 2.4.6: 1 violation(s)
  - heading-order (moderate)

---

## Evaluation Ratings

- **Supports**: Functionality meets the criterion without known defects
- **Partially Supports**: Some functionality meets the criterion, some does not
- **Does Not Support**: Majority of functionality does not meet the criterion
- **Not Applicable**: Criterion is not relevant
- **Not Evaluated**: Only used for WCAG Level AAA criteria

## Violation Summary by Criterion

| Criterion | Violations | Impact | WCAG Level |
|-----------|------------|--------|------------|
| 4.1.2 | 1 | Moderate | A |
| 1.3.3 | 1 | Moderate | AAA |
| 2.4.6 | 1 | Moderate | AA |

## Detailed Results by Page

### 1. https://data.a2gov.org/

**Page Information**:
- Title: "City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 62
- Images: 30
- Forms: 1
- Main landmarks: 1

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 3 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 12
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<a class="w-fit bg-ann-arbor-accent-green transition-all hover:bg-opacity-90 text-white font-bold px-3 py-2 rounded-[5px] flex items-center" href="/ci...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.58 (foreground color: #ffffff, background color: #079a6d, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

---

### 2. https://data.a2gov.org/search

**Page Information**:
- Title: "Search Data - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 32
- Images: 12
- Forms: 1
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Search Data - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 2 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 2
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1m:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<a target="_blank" class="underline text-ann-arbor-accent-green font-semibold" href="http://portaljs.com">PortalJS</a>...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.24 (foreground color: #079a6d, background color: #303a40, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1

---

### 3. https://data.a2gov.org/topics

**Page Information**:
- Title: "Topics - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 28
- Images: 18
- Forms: 0
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Topics - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 7 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 2
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1m:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<a target="_blank" class="underline text-ann-arbor-accent-green font-semibold" href="http://portaljs.com">PortalJS</a>...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.24 (foreground color: #079a6d, background color: #303a40, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1

---

### 4. https://data.a2gov.org/search?topic=environment

**Page Information**:
- Title: "Search Data - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 33
- Images: 13
- Forms: 1
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Search Data - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 2 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 4.1.2 (1 violation(s))

###### button-name (critical)
- **Description**: Ensure buttons have discernible text
- **Impact**: critical
- **Affected Elements**: 1
- **Help**: https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright

**Sample Fix Required**:
1. `<button class="ml-1.5">...`
   Fix: Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role="none" or role="presentation"

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 3
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1m:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<div class="inline-flex items-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transpare...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.22 (foreground color: #ffffff, background color: #5e98a4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

---

### 5. https://data.a2gov.org/search?type=dataset

**Page Information**:
- Title: "Search Data - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 32
- Images: 12
- Forms: 1
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Search Data - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 2 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 4.1.2 (1 violation(s))

###### button-name (critical)
- **Description**: Ensure buttons have discernible text
- **Impact**: critical
- **Affected Elements**: 1
- **Help**: https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright

**Sample Fix Required**:
1. `<button class="ml-1.5">...`
   Fix: Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role="none" or role="presentation"

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 3
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1m:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<div class="inline-flex items-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transpare...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.22 (foreground color: #ffffff, background color: #5e98a4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

---

### 6. https://data.a2gov.org/city-of-ann-arbor/aapd-crime-dashboard

**Page Information**:
- Title: "AAPD Crime Dashboard - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 29
- Images: 13
- Forms: 0
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "AAPD Crime Dashboard - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 1 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 3
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<button class="inline-flex items-ce...">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.58 (foreground color: #ffffff, background color: #079a6d, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

---

### 7. https://data.a2gov.org/city-of-ann-arbor/traffic-crashes-dashboard

**Page Information**:
- Title: "Traffic Crashes Dashboard - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 32
- Images: 13
- Forms: 0
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Traffic Crashes Dashboard - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 1 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 3
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<button class="inline-flex items-ce...">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.58 (foreground color: #ffffff, background color: #079a6d, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

---

### 8. https://data.a2gov.org/city-of-ann-arbor/street-trees-inventory

**Page Information**:
- Title: "Street Tree Inventory - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 32
- Images: 13
- Forms: 0
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Street Tree Inventory - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 1 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 3
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<button class="inline-flex items-ce...">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.58 (foreground color: #ffffff, background color: #079a6d, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

---

### 9. https://data.a2gov.org/city-of-ann-arbor/monthly-solid-waste-totals

**Page Information**:
- Title: "Monthly Solid Waste Totals - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal"
- Language: "en"
- Links: 30
- Images: 14
- Forms: 0
- Main landmarks: 2

**Manual Checks**:
| Check | Status | Details |
|-------|--------|---------|
| Skip navigation | ✗ | No skip link found |
| Page title | ✓ | "Monthly Solid Waste Totals - City of Ann Arbor Open Data Portal | City of Ann Arbor Open Data Portal" |
| Language | ✓ | lang="en" |
| Landmark regions | ✓ | main: true, nav: true |
| Heading structure | ✓ | h1: true, h2s: 0 |
| Unique IDs | ✓ | duplicates: 0 |

**Axe Violations**:

##### 1.3.3 (1 violation(s))

###### color-contrast (serious)
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impact**: serious
- **Affected Elements**: 3
- **Help**: https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright

**Sample Fix Required**:
1. `<button class="inline-flex items-ce..." type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.05 (foreground color: #fafafa, background color: #5f99a5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
2. `<a class="inline-flex items-ce..." href="/@city-of-ann-arbor/...">...`
   Fix: Fix any of the following:
  Element has insufficient color contrast of 3.58 (foreground color: #ffffff, background color: #079a6d, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1

##### 2.4.6 (1 violation(s))

###### heading-order (moderate)
- **Description**: Ensure the order of headings is semantically correct
- **Impact**: moderate
- **Affected Elements**: 1
- **Help**: https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright

**Sample Fix Required**:
1. `<h3 class="text-gray-800 text-base font-semibold leading-tight">3 resources</h3>...`
   Fix: Fix any of the following:
  Heading order invalid

---

## Summary by WCAG Principle

### Principle 1: Perceivable

| Criterion | Status | Violations |
|-----------|--------|------------|
| 1.1.1 Non-text Content | Supports | 0 |
| 1.2.1-1.2.5 Time-based Media | Supports | 0 |
| 1.3.1 Info and Relationships | Supports | 0 |
| 1.3.2 Meaningful Sequence | Supports | 0 |
| 1.3.3 Sensory Characteristics | Partially Supports | 1 |
| 1.4.1 Use of Color | Supports | 0 |
| 1.4.2 Audio Control | Supports | 0 |
| 1.4.3 Contrast (Minimum) | Supports | 0 |
| 1.4.4 Resize text | Supports | 0 |
| 1.4.5 Images of Text | Supports | 0 |

### Principle 2: Operable

| Criterion | Status | Violations |
|-----------|--------|------------|
| 2.1.1 Keyboard | Supports | 0 |
| 2.1.2 No Keyboard Trap | Supports | 0 |
| 2.2.1 Timing Adjustable | Supports | 0 |
| 2.2.2 Pause, Stop, Hide | Supports | 0 |
| 2.3.1 Three Flashes | Supports | 0 |
| 2.4.1 Bypass Blocks | Supports | 0 |
| 2.4.2 Page Titled | Supports | 0 |
| 2.4.3 Focus Order | Supports | 0 |
| 2.4.4 Link Purpose | Supports | 0 |
| 2.4.5 Multiple Ways | Supports | 0 |
| 2.4.6 Headings and Labels | Partially Supports | 1 |
| 2.4.7 Focus Visible | Supports | 0 |

### Principle 3: Understandable

| Criterion | Status | Violations |
|-----------|--------|------------|
| 3.1.1 Language of Page | Supports | 0 |
| 3.2.1 On Focus | Supports | 0 |
| 3.2.2 On Input | Supports | 0 |
| 3.2.3 Consistent Navigation | Not Evaluated | N/A |
| 3.2.4 Consistent Identification | Not Evaluated | N/A |
| 3.3.1 Error Identification | Supports | 0 |
| 3.3.2 Labels or Instructions | Supports | 0 |
| 3.3.3 Error Suggestion | Supports | 0 |
| 3.3.4 Error Prevention | Supports | 0 |

### Principle 4: Robust

| Criterion | Status | Violations |
|-----------|--------|------------|
| 4.1.1 Parsing | Supports | 0 |
| 4.1.2 Name, Role, Value | Partially Supports | 1 |

## Report Metadata

- **Generated**: 2026-01-12T14:40:28.833Z
- **Tool**: Playwright with @axe-core/playwright
- **Pages Tested**: 9
