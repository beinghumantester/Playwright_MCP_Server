# OrangeHRM (opensource-demo) — Detailed Test Plan

Scope: Full functional exploratory test plan for https://opensource-demo.orangehrmlive.com

Preconditions:
- Tester has network access to the demo site.
- Browser supported: Chrome/Edge/Firefox latest.

Global test data:
- Valid credentials: Username: Admin, Password: admin123

1) Login Page
- Objective: Verify authentication flows, form validation and security controls.

- Positive tests:
  1. Login with valid credentials -> Expect dashboard page and employee welcome visible.
 2. Remember me (if present) persists login across browser restart.

- Negative tests:
  1. Empty username and password -> Expect inline validation error and no navigation.
 2. Valid username + empty password -> Expect password-required message.
 3. Empty username + valid password -> Expect username-required message.
 4. Wrong username/password combinations (common typos) -> Expect "Invalid credentials".
 5. SQL/meta characters in username/password (e.g., ' OR '1'='1) -> Expect handled input, no login, no error leakage.

- Edge cases:
  1. Very long username/password (e.g., 1024 chars) -> Expect controlled validation or rejection.
 2. Leading/trailing whitespace in credentials -> Trim or reject consistently.
 3. Rapid repeated login attempts -> Observe rate-limiting / lockout behavior.
 4. Special unicode characters and emoji in username/password -> Handled safely.
 5. Submit via Enter key and via Login button -> both should work consistently.

2) Dashboard / Home (post-login)
- Objective: Verify widgets, quick-launches, table data and navigation links.

- Positive tests:
  1. Successful login lands on Dashboard showing widgets (performance, quick launch, etc.).
  2. Clicking a dashboard widget navigates to the appropriate module page.

- Negative tests:
  1. Broken/empty widgets should show friendly message rather than stack trace.

- Edge cases:
  1. Dashboard when no data exists (fresh user) -> verify empty states.
  2. Large dataset shown in widgets -> UI remains usable (scroll/pagination).

3) Admin Module
- Objective: Users & Roles, Job, Organization configs — verify CRUD, search, filters and permissions.

- Positive tests:
  1. Navigate to Admin -> System Users. Create a new user with valid data -> record appears in list.
 2. Search/filter users by username, role, status -> expected results.
 3. Edit user details and save -> changes persist.

- Negative tests:
  1. Attempt to create user with duplicate username -> Expect unique constraint error.
  2. Blank required fields in user creation -> field-level validation messages.
  3. Invalid email formats in user details -> validation rejection.

- Edge cases:
  1. Very large number of users in listing -> pagination performance and UI stability.
  2. CSV/JSON export of users (if available) -> validate content and encoding.

4) PIM (Personal Information Management)
- Objective: Employee CRUD, search, bulk actions, file uploads for profile picture.

- Positive tests:
  1. Create employee with minimal required fields -> appears in employee list and searchable.
 2. Update employee details and save -> persists.
  3. Upload profile photo (valid image) -> thumbnail shows correctly.

- Negative tests:
  1. Upload unsupported file type as photo -> reject with message.
  2. Create employee missing required fields -> form should block submission.

- Edge cases:
  1. Very large image file upload -> app rejects or compresses gracefully.
  2. Employee name containing uncommon characters/unicode -> displayed correctly.

5) Leave Module
- Objective: Leave request creation, approval workflow, calendar display.

- Positive tests:
  1. Create leave request for valid date range -> status Pending and calendar shows.
  2. Approver approves request -> status changes to Approved.

- Negative tests:
  1. Request leave for past dates (if disallowed) -> expect validation message.
  2. Overlapping leaves that exceed allowance -> reject or warn.

- Edge cases:
  1. Request leave crossing DST boundary -> correct date/time handling.
  2. Maximum length leave (e.g., 1 year) -> system handles or rejects with message.

6) Time / Attendance
- Objective: Timesheet entries, punches, approvals.

- Positive tests:
  1. Submit timesheet with valid entries -> persists and can be approved.

- Negative tests:
  1. Invalid time ranges (end before start) -> validation error.

- Edge cases:
  1. Entries spanning midnight -> verify date attribution.

7) Recruitment
- Objective: Job vacancies, candidates, application processing.

- Positive tests:
  1. Create a vacancy and add candidate -> candidate record appears and resumes upload works.

- Negative tests:
  1. Upload of very large resume file -> reject gracefully.

- Edge cases:
  1. Candidate with identical email -> duplication handling.

8) My Info (Employee self-service)
- Objective: Employee can view/edit own personal details, contact info, emergency contacts.

- Positive tests:
  1. Update contact telephone and save -> persists and visible on next load.

- Negative tests:
  1. Invalid phone format -> validation error.

- Edge cases:
  1. Concurrent update: simulate two sessions updating same field -> last-write-wins or conflict detection.

9) Performance / Appraisal
- Objective: Goals, reviews, attaching documents.

- Tests: Create/edit review cycles, attach supporting documents, verify permission gating.

10) Directory / Organization Chart
- Objective: People lookup, reporting lines.

- Tests: Search by name/role, verify org-chart expands/collapses, fallback when no data.

11) Maintenance / System Settings
- Objective: Backups, system diagnostics, logs (if accessible in demo). Verify access controlled by admin role.

12) Buzz / Social Feed
- Objective: Post messages, upload images, like/comment functionality.

- Tests:
  1. Post a new message and verify visibility to users.
 2. Upload an image to a post -> preview and permissions.

Common Cross-Cutting Test Areas
- Authentication & Security:
  - Session timeout behavior (idle timeout).
  - CSRF token presence and renew on login.
  - Password field masking and not showing in logs.

- Accessibility & UI:
  - Keyboard navigation across pages and focus order.
  - ARIA attributes for form errors and modal dialogs.

- Localization/Encoding:
  - Special characters in names, resumes, comments.

- Performance:
  - Module load time under normal and large data sets.

Test Data & Environment Notes
- Prefer a disposable account for creating test users/employees.
- When possible, revert created entities or record cleanup steps.

Deliverables in this workspace
- Test plan saved here: tests/orangehrm_test_plan.md

Next steps (suggested):
- Option A: Run automated exploratory script to capture live locators and screenshots for every page and element described above.
- Option B: I can expand any module above into a per-element, line-by-line test-case table (fields, locators, exact expected messages).
