# Boys State Mobile App

> **Important Disclaimer:**  
> This application is being developed to support programs affiliated with the American Legion (such as Boys State and Girls State), but it is **not** created, funded, or officially supported by the American Legion or any agent or representative thereof. No endorsement or sponsorship by the American Legion is implied. All branding, configuration, and operational decisions are made independently by the app’s creators and participating programs.

---

## Overview

The Boys State Mobile App is designed to help Boys State and Girls State programs manage and deliver information, schedules, and communications to program participants, staff, and parents.  
This app is **not** specific to any one state or program and is intended to be *configurable and secure* for use by any American Legion-affiliated Boys or Girls State chapter.

- **Multi-program support:** Each program can manage its own branding, users, data, and integrations.
- **Strict data separation:** No overlap or access between programs.
- **Role-based access:** Delegates, counselors, admins/staff, and (optionally) parents.
- **Modern stack:** React Native for mobile, Node.js/Express backend, with future integrations for Google Calendar, Google Docs, Discord, and more.

---

## Project Status

**This project is in the initial setup phase.**  
Core requirements and architecture are being defined. No stable code or release yet.

---

## Planned Features

- Per-program configuration: logo, colours, contact info, etc.
- User roles: delegate, counselor, staff/admin, parent
- Schedule management and push notifications
- Parent/guardian invitations and child progress tracking
- Secure authentication (username/password, Discord OAuth)
- Admin-only web portal for program setup and management
- Integration with Google Calendar, Google Docs, Discord (planned)
- Data isolation, logging, and robust security/compliance practices
- Future modules: elections, resource library, gallery, chat, and more

See [`agents.md`](./agents.md) for full architectural details.

---

## Getting Started

**Project setup has not begun yet.**  
When development starts, instructions will be provided for:

- Project prerequisites (Node.js, npm, Expo CLI, etc.)
- Setting up the repo and installing dependencies
- Running the app in development mode
- Running automated tests

---

## Contribution Guidelines

- All new features, changes, and bug fixes **must** be covered by meaningful automated tests.
- All API endpoints and core modules must be fully documented.
- Follow the architectural standards and agent specs in [`agents.md`](./agents.md).
- Pull requests will not be merged unless all tests pass and code has been reviewed.
- Sensitive data, especially for minors, must be handled according to privacy and security best practices.

---

## Testing

Automated tests are required for **all** changes.  
Tests must cover all logic paths, edge cases, and errors.  
No code will be merged without passing tests and test review.

---

## License

To be determined.

---

## Contact

For more information, contact the project maintainer:  
**Kenneth Hart**  
[revathiest@gmail.com](mailto:revathiest@gmail.com)

---

## Legal

This software is not created, funded, or officially supported by the American Legion or any agent thereof.

---
