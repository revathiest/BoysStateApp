# Boys State App: Agents Specification

> **Important Disclaimer:**
>
> This application is being developed to support programs affiliated with the American Legion (such as Boys State and Girls State), but it is **not** created, funded, or officially supported by the American Legion or any agent or representative thereof. No endorsement or sponsorship by the American Legion is implied. All branding, configuration, and operational decisions are made independently by the app’s creators and participating programs.

## Overview

This document outlines the agents—user roles, software modules, backend services, and integration points—for the Boys State mobile application. The system is designed to support any Boys or Girls State program, not limited to a single location or chapter. Branding, configuration, and data storage are per-program, with robust security and strict isolation of sensitive data. This document covers agents relevant to the mobile app only.

---

## 1. User Role Agents

### 1.1. Delegate Agent

**Description:** Standard participant (primary app user).

**Responsibilities:**

* Login (see Authentication Agent)
* View program schedule, announcements, resources
* Access maps, program documents, and updates
* Receive push notifications
* Invite parents to view select information
* Participate in elections (if eligible; subject to permissions and program config)

### 1.2. Counselor Agent

**Description:** Supervisory staff with elevated permissions.

**Responsibilities:**

* All delegate functions
* Access staff-specific resources and restricted information
* Manage or view groups/teams as applicable

### 1.3. Staff Agent (Admin)

**Description:** Program administrators (for mobile functions).

**Responsibilities:**

* All counselor functions
* Approve/oversee schedule, announcements, and mobile resources
* Send targeted or global announcements/notifications
* May access logs/audits for their program (read-only, if enabled)

### 1.4. Parent Agent

**Description:** Parents/guardians invited to the app and linked to one or more delegates (future-ready, limited current functionality).

**Responsibilities:**

* Register via invitation from a delegate or staff
* View limited program information for linked delegates (schedule, milestones, awards, etc.)
* Track program progress, key announcements, and child-specific milestones

---

## 2. Authentication & Account Agents

### 2.1. Authentication Agent

**Description:** Manages user login and identity verification.

**Responsibilities:**

* Supports username/password authentication
* (Optional) Discord OAuth login with mandatory linking to a program account
* Handles sessions, token refresh, and account security
* Handles login/logout for all user roles

### 2.2. Account Linking Agent

**Description:** Ensures users linking Discord or other third-party accounts are properly associated with their program account.

**Responsibilities:**

* Prevents account hijacking and accidental cross-program access
* Provides clear UI for linking/unlinking accounts

### 2.3. Parent-Delegate Linking Agent

**Description:** Manages relationships between parents and delegates (many-to-many support).

**Responsibilities:**

* Allows delegates or staff to invite parents at any time
* Manages links between multiple delegates and multiple parents per program

---

## 3. Mobile Software/Feature Agents

### 3.1. Schedule Agent

**Description:** Displays program schedules and session info (with potential Google Calendar integration).

**Responsibilities:**

* Fetches latest schedule from backend or Google Calendar integration
* Notifies users of schedule changes or upcoming events
* Supports user- and group-specific schedule filtering

### 3.2. Notification Agent

**Description:** Manages push/in-app notifications and alerts.

**Responsibilities:**

* Receives and displays notifications from backend
* Supports targeted (role/group) and global broadcast notifications
* Ensures notification logs are maintained for audit and troubleshooting

### 3.3. Branding/Config Agent

**Description:** Loads program-specific branding, theme, and config for the mobile app.

**Responsibilities:**

* Loads per-program branding (colors, logos, names, etc.) and assets
* Ensures all dynamic/static assets are scoped to the current program
* Handles feature toggles and custom mobile modules as enabled

### 3.4. API Comm Agent

**Description:** Handles secure communication between mobile app and backend.

**Responsibilities:**

* All API calls for user, schedule, document, and chat data
* Manages authentication and session
* Ensures all communication is logged for audit
* Handles errors, retries, and failure gracefully

---

## 4. Future/Planned Feature Agents (Mobile)

* **Google Calendar Agent:** Integration for syncing external events (handled by backend; consumed by mobile)
* **Google Docs Agent:** Access to program-linked documents/resources (future)
* **Discord Agent:** Linking, in-app announcements relay (future)
* **Progress Tracking Agent:** Delegate milestones/awards tracking; notifies parents; maintains achievement history (future)
* **Election Agent:** Secure mobile voting/ballot system; supports setup, voting, and results display (future)
* **Other Modules:** Placeholders for chat, surveys, voting, galleries, and resource library (as enabled per program)

---

## 5. Data Security & Privacy (Mobile App)

* All data storage and access is strictly per-program; no cross-program sharing.
* Sensitive data (especially for minors) is handled with the highest privacy standards (COPPA, FERPA, GDPR, etc.).
* All mobile-backend communication is authenticated and authorized.
* All app API activity is logged; sensitive data redacted as appropriate.
* All app branding and features are scoped/configured per program.

---

## 6. Agent Interactions (Mobile App)

* All mobile app agents communicate securely with backend services via documented API endpoints.
* Integration agents (e.g., Google, Discord) interact with third-party services through the backend only (never directly from mobile app).
* All communication, errors, and events are logged for troubleshooting and audit.

---

## 7. Development & Testing Standards (Mobile App)

* Automated tests must verify all app logic, user flows, error handling, and edge cases.
* New features or bug fixes require passing tests before deployment.
* All logic changes must be reviewed and covered by regression tests as appropriate.
* Security and integration tests are included for all new API dependencies or external integrations.
* Placeholder sections for future features/agents must be maintained in this file as the app evolves.
