# Contributing to Boys State App – Mobile App

Thank you for your interest in contributing to the Boys State App mobile project! Whether you’re fixing bugs, improving features, adding tests, or helping with docs, your help is welcome.

---

## Disclaimer

> **This app is being developed to support Boys State & Girls State programs affiliated with the American Legion, but is not created, funded, or officially supported by the American Legion. No endorsement is implied.**

---

## Getting Started

1. **Fork the repository** and clone it to your local machine.
2. **Install dependencies:**

   ```bash
   npm install
   # or yarn
   ```
3. **Set up prerequisites:**

   * Ensure you have the correct version of Node.js and your mobile tooling (Expo, Android Studio, Xcode, etc.).
4. **Set up environment variables:**

   * Copy `.env.example` to `.env` and update as needed for local dev.
5. **Run the app:**

   ```bash
   npm run start
   # or your preferred mobile run command
   ```

---

## Code Standards

* Use clear, meaningful commit messages.
* Follow project code style (see linter rules).
* All new code must include or update automated tests.
* Place tests alongside components/screens, or in the `__tests__/` folder as appropriate.
* Refer to [`AGENTS.md`](./AGENTS.md) for architectural context.
* Do **not** commit sensitive info or credentials.

---

## Submitting Changes

1. Create a feature branch:
   `git checkout -b feature/my-new-feature`
2. Make your changes with clear commits and comments.
3. Run all tests and ensure lint passes:

   ```bash
   npm run test
   npm run lint
   ```
4. Submit a pull request (PR) with a clear summary and reference any related issues or cross-repo work.
5. Tag issues/PRs as appropriate (bug, feature, help wanted, etc).
6. Be ready to answer questions or make changes during code review.

---

## Testing

* All features and bug fixes require automated tests.
* Use `npm test` or `yarn test` for the suite.
* Security, privacy, and integration testing are prioritized.

---

## Cross-Repo Coordination

* For backend/API changes, coordinate with [Backend Services](https://github.com/yourorg/boysstate-backend).
* For admin or config UI changes, see [Web Admin Portal](https://github.com/yourorg/boysstate-admin).
* Major changes that impact more than the mobile app should be discussed in all relevant repos.

---

## Questions?

Open an issue, join the project discussion, or contact a maintainer.
