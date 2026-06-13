## Cookie Consent Functionality Plan

### 1. Centralize consent state and persistence
- Replace the current one-value `choice` behavior with a typed preference model:
  - `necessary: true`
  - `analytics`, `marketing`, and `preferences` booleans
  - `consentGiven: true`
  - `updatedAt` timestamp
- Add safe LocalStorage read/write helpers for `sag:cookies`, including validation and backward-compatible handling of the existing `{ choice, ts }` records.
- Keep banner visibility, dialog visibility, editable draft preferences, and saved preferences as separate React state so opening Customize never records consent or prematurely dismisses the flow.

### 2. Build the working preferences dialog
- Use the existing Radix/shadcn Dialog and Switch primitives.
- Show Necessary Cookies as enabled and non-editable; provide labeled toggles for Analytics, Marketing, and Preference Cookies.
- Implement Save Preferences, Accept All, Reject Non-Essential, and Close actions with consistent persistence behavior.
- Ensure Close and Escape dismiss only the dialog without recording unsaved changes; on first visit, the banner remains available.
- Make the dialog scroll safely on small screens and keep every action reachable.

### 3. Connect every entry point
- Update banner buttons so Accept All and Reject Non-Essential save the complete preference object and dismiss the banner.
- Make Customize Preferences open the dialog without saving or hiding the banner incorrectly.
- Add a real “Cookie Settings” button in the footer that opens the same dialog and loads the current saved selections.
- Lift consent control into a shared provider mounted at the root so the footer and banner use one source of truth.

### 4. Accessibility behavior
- Preserve Radix focus trapping, Escape handling, overlay behavior, and focus restoration.
- Provide a titled/described dialog, associated labels and descriptions for every switch, clear disabled semantics for Necessary Cookies, and accessible names for close/actions.
- Use proper Button components and keyboard-reachable controls throughout.

### 5. Functional verification
- Clear consent and verify the first-visit banner.
- Exercise Accept All, Reject Non-Essential, Customize, toggle changes, Save Preferences, Close, and footer Cookie Settings.
- Inspect LocalStorage after each save and verify refresh does not restore the banner after consent.
- Confirm saved selections reload when reopened from the footer.
- Test the complete interaction on mobile, tablet, and desktop viewports, including keyboard Escape/focus behavior.
- Check browser console output for errors after the interaction suite.