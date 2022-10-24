# HSE_DEP_OF_AI

## Install

```bash
git clone git@github.com:GlushnevaDasha/HSE_DEP_OF_AI.git
```

## Commits

The project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). This allows to automatically generate a CHANGELOG.

The commits must meet the following requirements:

- the title must be written in English
- the verb must be infinitive
- the first part of title must contain the commit type, colon and whitespace. For example: `feat: add description`
- if the change is related to a task, its number should be specified with colon and whitespace. For example: `fix: DOA-123: change description`
- the title of the commit should be concise, but fully describe the contents of the changed. For example: `fix: DOA-123: fixe Safari focus bug`
- optional, a more detailed description can be added after an empty line. This will also be added in the CHANGELOG. For example:

```markdown
fix: DOA-123: fix Safari focus bug

Bug happens when someone tries to focus input using Safari browser
```

Before merging, you need to combine commits into one ore more criticals ones, describing the essence of the changes beign made. Changes should describe the result, not the workflow.

Possible types of commits:

- `build`: changes in build systems or adding dependencies to the project
- `ci`: changes in configuration files and CI scripts
- `docs`: only changes in documentation
- `feat`: changes adding new functionality
- `fix`: bug fix
- `perf`: performance improvement
- `refacror`: changes that are neither new functionality nor bug fixes
- `style`: only changes in styles
- `test`: adding new tests or fixing existing ones
- `chore`: other changes that do not affect users (e.g., updating dependency versions)
