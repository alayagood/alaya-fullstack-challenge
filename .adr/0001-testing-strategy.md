# Testing strategy

## Context
There are no tests whatsoever in the repo.

Before adding any new features I should add some tests to cover the current use cases, because refactorings and new code can create regressions.

## Options
1. Unit tests
2. Integration tests
3. E2E tests
4. Contract tests

## Decision
I'm going to go for **option 3** for the moment, because I want certainty that the *main use cases* work. This is even though the usual recommendation is for the majority of tests be unit and integration for speed reasons (see the test pyramid, for example) - the thing is as we only have a couple of use cases right now, they're fast to run, so this is a test tech debt I want to take.

These E2E tests will cover both the client and the server use cases (that is, there'll be tests for the browser use cases with stubbed responses from the backend and tests for the API use cases, with no browser involved).

Depending on the time I have I'll add options 1 and 2 as well. This is to try to add a faster and more granular level of testing.

Option 4 seems like overkill at this moment.