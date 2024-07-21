# The `testable` assignment

Point of the assignment is to refactor the application code in the `/client` folder, to make it more testable.

That means it's easy to test:

- the business logic (meeting/event validation, search, filtering, session creation)
- other app logic (e.g.: UI navigation (list -> detail -> edit, ist -> detail -> back,...))

We prefer to write tests, that do not require us to render the UI in tests (so that they're faster and more reliable), but you are not required to do so.

Feel free to decide on how to refactor the application, which tests you decide to write (unit, integration, e2e, ...) and which not.

We'll discuss your decisions and the trade-offs during the interview.

## Requirements

- Node.js v20
- NPM v9

## Installation

```bash
npm i
```

## Running the project

```bash
npm run dev
```

To run the tests:

```bash
# Jest tests
npm run test

# E2E tests via Playwright
npm run e2e
```

## Notes

- The application is a simple meeting/event management application with some basic business/UI logic (see code itself) and styling
- Feel free to use any additional library you might need, change the project structure or refactor the code as you see fit
- Once you're done with the assignment, please push the code to a public/private repository and share the link/access with us
- Optionally, you can also update styling of the application
