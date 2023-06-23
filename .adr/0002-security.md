# Security

## Context
There are a couple of things to consider with regards to security when implementing the login feature.
The first one is passwords need to be stored encrypted, preferrebly with some sort of salt.
The other one is JWT needs a secret in order to work. Ideally it would be a secret available only through a secure means (AWS secret, a Github repo secret...)

## Options
Password
1. Encryption
2. No encryption
JWT secret
1. Stored in secure location
2. Stored in repository

## Decision
In both cases, for the sake of simplicity and expedience, I'm going to go with the unsafe option (**option 2**).

This is highly debatable as security is harder to add later down a project, but I'm going for this assuming it's an experiment very reduced in scope that will either be thrown to the bin altogether or properly implemented if proven useful.