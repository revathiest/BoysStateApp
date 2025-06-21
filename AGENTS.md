# Boys State App: Agents Specification

> **Important Disclaimer:**
>
> This application is being developed to support programs affiliated with the American Legion (such as Boys State and Girls State), but it is **not** created, funded, or officially supported by the American Legion or any agent or representative thereof. No endorsement or sponsorship by the American Legion is implied. All branding, configuration, and operational decisions are made independently by the app’s creators and participating programs.

## Overview

This document outlines the *agents*—user roles, software modules, backend services, and integration points—for the Boys State mobile application. This system is designed to support *any* Boys or Girls State program, not limited to a single location or chapter. All branding, configuration, and data storage must be per-program, with robust security and strict isolation of sensitive data. The system is designed for extensibility, with clearly defined areas for future or planned features.

---

## 1. User Role Agents

### 1.1. Delegate Agent

* **Description:** Standard participants; primary app users.
* **Responsibilities:**

  * Log in (see Authentication Agent)
  * View program schedule, announcements, and resources
  * Access maps, program documents, and updates
  * Receive push notifications
  * Invite parents to register (either at registration or later)
  * If eligible: nominate, run for, or accept elected/appointed positions (e.g., offices, awards)

### 1.2. Counselor Agent

* **Description:** Supervisory staff with elevated permissions.
* **Responsibilities:**

  * All delegate functions
  * Access staff-specific resources and restricted information
  * Manage or view groups/teams as applicable

### 1.3. Staff Agent (Admin)

* **Description:** Program administrators.
* **Responsibilities:**

  * All counselor functions
  * Manage schedules, announcements, resources, and communications
  * Manage user roles, permissions, onboarding, and parent invites
  * Configure program branding and settings
  * Manage integrations and elections
  * View logs relevant to their program only

### 1.4. Parent Agent

* **Description:** Parents/guardians invited to the app and tied to one or more delegates (children). (Future-ready)
* **Responsibilities:**

  * Register via invitation from a delegate or staff
  * View all information about any delegates to whom they are linked (progress, accolades, elected/appointed positions, scholarship or awards)
  * Track program schedules, key announcements, and child-specific milestones

---

## 2. Authentication & Account Agents

### 2.1. Authentication Agent

* **Description:** Manages user login and identity verification.
* **Responsibilities:**

  * Supports traditional username/password authentication
  * (Optional) Discord OAuth login, with mandatory linking to an app account
  * Manages sessions, token refresh, and account security
  * Handles login/logout state for all user agents

### 2.2. Account Linking Agent

* **Description:** Ensures users linking Discord or other third-party accounts must confirm identity and explicitly associate with their program app account.
* **Responsibilities:**

  * Prevents account hijacking or accidental cross-program access
  * Provides clear UI/UX for linking and unlinking accounts

### 2.3. Parent-Delegate Linking Agent

* **Description:** Manages relationships between parents and delegates (many-to-many).
* **Responsibilities:**

  * Allows delegates (or staff) to invite parents at any time
  * Manages links between multiple delegates and multiple parents per program

---

## 3. Software/Feature Agents

### 3.1. Schedule Agent

* **Description:** Handles schedule display, updates, and dissemination (potentially integrates with Google Calendar).
* **Responsibilities:**

  * Fetches latest schedule from backend or Google Calendar integration
  * Notifies users of changes or upcoming events
  * Handles user-specific filters (e.g., group schedules)

### 3.2. Notification Agent

* **Description:** Manages push notifications and in-app alerts.
* **Responsibilities:**

  * Receives and displays notifications from backend
  * Supports targeted (role/group) and global broadcasts
  * Ensures notification logs are maintained for audit

### 3.3. Branding/Configuration Agent

* **Description:** Manages program-specific branding, themes, and configuration.
* **Responsibilities:**

  * Loads per-program branding (colours, logos, names, contact info, social media links)
  * Ensures all static and dynamic assets are scoped to the current program
  * Handles feature toggles or custom modules as enabled by each program

### 3.4. API Communication Agent

* **Description:** Manages all app/backend data exchange.
* **Responsibilities:**

  * All API calls for user, schedule, document, and chat data
  * Handles authentication and session management
  * Ensures *all* communication is logged for audit
  * Traps and logs all errors; retries as appropriate

### 3.5. Integration Agents (Planned)

* **Google Calendar Agent:** Syncs and stores external events in the program schedule. Managed by program admins.
* **Google Documents Agent:** Provides access to linked educational materials and communications. Managed per program.
* **Discord Agent:** Enables Discord account linking, passes announcements/info to Discord, and optionally relays staff/alumni communications. Managed per program.

### 3.6. Progress Tracking Agent (Planned)

* **Description:** Handles delegate progress reporting for parent access (e.g., elections, awards, official positions).
* **Responsibilities:**

  * Tracks major delegate milestones, accolades, and recognitions
  * Notifies parents and delegates of achievements
  * Maintains history of awards, nominations, and appointments

### 3.7. Election Agent (Planned)

* **Description:** Manages the setup and execution of elections, nominations, and results.
* **Responsibilities:**

  * Allows staff/admin to configure elections (via app or web portal)
  * Supports secure voting, tallies, and result dissemination
  * Ensures all election actions are logged and auditable

### 3.8. Planned/Future Feature Agents

* *Placeholder for additional modules, e.g., gallery, chat, surveys, voting, resource library, or others as defined.*

---

## 4. Backend Agents

### 4.1. API Service Agent

* **Description:** REST API backend, responsible for business logic and data operations.
* **Responsibilities:**

  * Serves schedule, user, resource, and program data
  * Receives updates from staff/admins
  * *All endpoints must be fully documented via Swagger/OpenAPI*
  * Provides secure endpoints with per-program data isolation
  * Manages user authentication and authorization for all agents
  * Stores all logs indefinitely for audit/compliance

### 4.2. Event/WebSocket Agent (Planned)

* **Description:** Provides real-time updates if required.
* **Responsibilities:**

  * Sends schedule or notification updates instantly to clients
  * Handles connection and fallback to polling as needed

### 4.3. Program Management Website Agent

* **Description:** Provides a secure, admin-only web portal for managing programs and app configuration.
* **Intended Users:** *Program administrators only*—not accessible to delegates, parents, or the public.
* **Responsibilities:**

  * Admin account creation and login
  * Define/configure new programs (branding, contact info, settings, etc.)
  * Add and manage administrators, counselors, staff, and delegate invitations
  * Manage program resources and settings
  * Manage integrations and elections as required
  * View logs for the relevant program only

### 4.4. Delegate Registration Agent

* **Description:** Manages registration and onboarding for delegates.
* **Responsibilities:**

  * Handles registration (via portal or CSV import)
  * Associates delegates with the correct program and permissions
  * Supports inviting parents during or after registration
  * Ensures secure, auditable account creation and assignment

---

## 5. Data Security and Privacy

* **Data Isolation:**
  All data storage must be managed on a *per-program* basis. *No overlap* of user, schedule, or message data between programs is permitted. Each account is tied to only one program (future support for cross-program accounts can be added).
* **Sensitive Data:**
  Personal information for minors must be handled according to the highest standards of data privacy and applicable laws (COPPA, FERPA, GDPR, etc.)
* **Authentication:**
  All access must be authenticated and authorized; anonymous or “public” access is not allowed for sensitive features.
* **Logging:**
  All communication between the app and backend services must be logged and stored indefinitely in the database, with sensitive data redacted as appropriate. Development/troubleshooting logs are not available to program staff/admins.
* **Branding:**
  Any and all app branding must be fully configurable per program (logo, name, colours, contact info, social media links, etc.)
* **Testing:**
  All features, changes, and bug fixes require robust, meaningful automated tests that cover all logic paths, edge cases, and error handling. Security and integration tests must be included as appropriate. Tests must be maintained as part of the codebase and kept up to date.

---

## 6. Agent Interactions

* All mobile app agents communicate exclusively with backend services via secure, documented API endpoints.
* Any integration agents interact with third-party services via backend (never directly from app).
* Communication, error, and event logs must be maintained for all agent interactions.

---

## 7. Development Standards

* **Documentation:**
  All API endpoints must be documented via Swagger/OpenAPI, with examples and security models.
* **Extensibility:**
  New agents or program features must be documented in this file before implementation.
* **Error Handling:**
  All errors must be trapped, logged, and handled gracefully.
* **Security:**
  Encryption for all data in transit. Strong authentication and authorization required. No sharing of accounts or data between programs.
* **Automated Testing:**

  * Every new feature, change, or bug fix must be accompanied by one or more automated tests.
  * Tests must be meaningful: they must verify that code behaves as intended, catch regressions, and cover both expected and failure scenarios.
  * Test coverage must include all logic paths (branches, errors, and edge cases).
  * No code is merged without passing automated tests and code review of the tests themselves.
  * Regression tests must be added for any discovered bugs.
  * Security and integration tests should be included as part of each release, especially when new external dependencies or APIs are integrated.
* **Future Features:**
  This file should always contain a placeholder for planned and future agents/features to ensure extensibility.
