# Contributing to the Boys State App

Thank you for your interest in contributing to this project! Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your help is welcome.

---

## Important Disclaimer

> **This application is developed to support programs affiliated with the American Legion (such as Boys State and Girls State), but it is NOT created, funded, or officially supported by the American Legion or any agent or representative thereof. No endorsement or sponsorship by the American Legion is implied.**

---

## How to Get Started

1. **Fork the repository** on GitHub and clone it to your local machine.
2. **Install prerequisites:**

   * [Node.js](https://nodejs.org/) and npm
   * [Expo CLI](https://docs.expo.dev/get-started/installation/)
   * MySQL (for local backend development)
3. **Install dependencies:**

   * For the app: `npm install` (in the `app/` directory)
   * For the backend: `npm install` (in the `backend/` directory)
4. **Set up environment variables:**

   * Copy `.env.example` to `.env` in both `app/` and `backend/` and update values as needed.
5. **Run the project locally:**

   * Start the backend: `npm run dev` (in `backend/`)
   * Start the app: `expo start` (in `app/`)

---

## Coding Standards

* Use meaningful commit messages.
* Follow the architectural patterns described in [`agents.md`](./agents.md).
* Prefer clarity over cleverness—write code that others can easily read and maintain.
* All new code must be covered by meaningful automated tests (see Testing section).
* Ensure no credentials or sensitive data are committed to the repo.

---

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/my-new-feature`
2. Make your changes, with clear commits and comments.
3. Run all tests and ensure they pass.
4. Submit a pull request (PR) with a clear description of your changes.
5. Reference any related Issues in your PR.
6. Be ready to answer questions or make changes during the code review process.

---

## Testing

* **Automated tests are required** for all new features, bug fixes, and changes.
* Tests must cover all logic paths, edge cases, and error handling.
* All PRs will be blocked from merging if tests fail.
* Use `npm test` or `yarn test` (in both `app/` and `backend/` as appropriate).
* Security and integration tests are especially important for code handling sensitive information.

---

## Reporting Issues & Feature Requests

* Use GitHub Issues to report bugs or request features.
* Please include as much relevant detail as possible (steps to reproduce, environment, screenshots, etc.).
* Tag issues with appropriate labels (bug, feature, help wanted, etc.).

---

## Code of Conduct

* Be respectful and considerate in all interactions.
* No harassment, discrimination, or inappropriate language.
* Collaboration and open communication are encouraged.

---

## Questions?

If you have any questions, open an Issue or contact the project maintainer:

* **Kenneth Hart** ([revathiest@gmail.com](mailto:revathiest@gmail.com))

---
