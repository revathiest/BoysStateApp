# Boys State App – Mobile App

> **Disclaimer:**
>
> This project is being developed to support programs affiliated with the American Legion (Boys State and Girls State), but is **not** created, funded, or officially supported by the American Legion or any representative. No endorsement or sponsorship is implied. All branding, configuration, and operational decisions are made independently by the app’s creators and participating programs.

## Overview

This repository contains the **mobile app** for Boys State & Girls State programs, focused on delegate, counselor, staff, and parent users. It provides schedules, announcements, maps, notifications, elections (future), and resources to participants during the event.

* Cross-platform (React Native / Flutter / \[replace with stack])
* Secure authentication (username/password, optional Discord OAuth)
* Push and in-app notifications
* Per-program branding, schedule, and resources
* Planned: Elections, progress/award tracking, chat, integrations

## Other Boys State App Repositories

* [Backend Services](https://github.com/yourorg/boysstate-backend): REST API, business logic, integrations, program/data management for both mobile and admin portal clients.
* [Web Admin Portal](https://github.com/yourorg/boysstate-admin): Web-based portal for administrators to manage programs, schedules, elections, integrations, users, and logs.

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   # or yarn
   ```
2. **Set up environment variables:**

    * Copy `.env.example` to `.env` and configure API endpoints, auth keys, and program branding as required.
3. **Run the app:**

   ```bash
   npm run start
   # or your preferred mobile build tool
   ```
4. **Connect to the backend:**

    * Ensure the [Backend Services](https://github.com/yourorg/boysstate-backend) API is running and accessible.

## Agent Specification

See [`AGENTS.md`](./AGENTS.md) in this repo for a full breakdown of all user roles, app modules, and integration points.

## Contributing

* All logic/features must include automated tests and follow repo linting rules.
* Submit pull requests with clear explanations and test coverage.
* See [Backend Services](https://github.com/yourorg/boysstate-backend) and [Web Admin Portal](https://github.com/yourorg/boysstate-admin) for backend/admin changes.
<!-- Repository Note: This project is not affiliated with or endorsed by The American Legion. -->
