# Accessibility Improvement Plan

## Overview

This plan provides remediation steps for accessibility issues found on the City of Ann Arbor Open Data Portal. Issues are prioritized based on WCAG level and impact severity.

**Summary**:
- Total Unique Violations: 3
- Pages Analyzed: 9
- Estimated Fix Time: 2-3 weeks

## Dataset Tab Analysis

### Preview Tab

**Status**: Analyzed

**Violations Found**: 1

**Content Elements**:
- Data tables: 1
- Forms: 0
- Form inputs: 0
- Unlabeled inputs: 0
- Links: 28
- Buttons: 51

**Specific Violations**:
- color-contrast (serious): 8 elements

### Table Schema Tab

**Status**: Analyzed

**Violations Found**: 1

**Content Elements**:
- Data tables: 1
- Forms: 0
- Form inputs: 0
- Unlabeled inputs: 0
- Links: 28
- Buttons: 6

**Specific Violations**:
- color-contrast (serious): 35 elements

### API Tab

**Status**: Analyzed

**Violations Found**: 2

**Content Elements**:
- Data tables: 0
- Forms: 0
- Form inputs: 0
- Unlabeled inputs: 0
- Links: 28
- Buttons: 6

**Specific Violations**:
- color-contrast (serious): 3 elements
- heading-order (moderate): 1 elements

## Priority 1: Critical (WCAG Level A)

### 4.1.2: Name, Role, Value

**Status**: Partially Supports

**Violations Found**: 1

#### button-name
- **Impact**: critical
- **Description**: Ensure buttons have discernible text
- **Elements Affected**: 1

**Remediation Steps**:
1. Reference: https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright
2. Identify all 1 affected elements
3. Apply fixes:
   - Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role="none" or role="presentation"

## Priority 2: Important (WCAG Level AA)

### 2.4.6: Headings and Labels

**Violations**: 1

#### heading-order (moderate)
- Ensure the order of headings is semantically correct
- Elements: 1

## Priority 3: Recommended (Level AAA & Best Practices)

### Additional Issues

| Criterion | Violations | Rule |
|-----------|------------|------|
| 1.3.3 | 12 | color-contrast |

## Implementation Roadmap

### Week 1: Critical Fixes

- [ ] Fix all 1.1.1 violations (images, buttons, inputs)
- [ ] Add skip navigation links to all pages (2.4.1)
- [ ] Verify page titles are descriptive (2.4.2)
- [ ] Add lang attribute to html element (3.1.1)
- [ ] Fix duplicate IDs (4.1.1)
- [ ] Add accessible names to buttons/links (4.1.2)

### Week 2: Important Fixes

- [ ] Fix color contrast issues (1.4.3)
- [ ] Correct heading hierarchy (1.3.1, 2.4.6)
- [ ] Add labels to form inputs (3.3.2)
- [ ] Improve link text context (2.4.4)
- [ ] Ensure logical focus order (2.4.3)

### Week 3: Testing & Validation

- [ ] Run automated axe-core scan
- [ ] Keyboard-only navigation test
- [ ] Screen reader testing (NVDA/VoiceOver)
- [ ] Zoom and text resize test (up to 400%)
- [ ] Cross-browser compatibility test

## Testing Commands

```bash
# Run accessibility test
node wcag-test-extended.js
```

## Resources

- **axe-core**: https://www.deque.com/axe/
- **WCAG 2.1**: https://www.w3.org/TR/WCAG21/
- **WebAIM Checklist**: https://webaim.org/standards/wcag/checklist
- **WAI-ARIA Practices**: https://www.w3.org/WAI/ARIA/apg/

## Report Details

- **Date**: 2026-01-12T14:40:28.840Z
- **Tool**: Playwright + @axe-core/playwright
- **Pages Scanned**: 9
