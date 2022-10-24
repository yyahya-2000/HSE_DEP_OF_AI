# Rules for working with the project

## Install

```bash
git clone git@github.com:GlushnevaDasha/HSE_DEP_OF_AI.git
cd web
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## Adding a new component

When adding new components, you mast adhere to the following rules:

- the component is added to the folder `src/components/%ComponentName%`
- the component name must be in CamelCase
- components is developed on TypeScript and should be typed
- code of the component must be in the file `%ComponentName%.tsx`
- it is best to write functional components whenever possible, as this presents fewer problems when working with TypeScript
- default values are written to attributes during destructuring
- the types used in the component are stored in the file `%ComponentName%.types.ts`
- the names of the property types and the state of the component must be unique in the project (e.g. `MyComponentProps`). This makes it easier to find the project
- styles of the component are keeped in the file `%ComponentName%.styles.ts`
- catalog of the component must contain file `selections.types.ts` with default import. This will avoid verbosity when
  reusing the component within the project
- overly generic file names should be avoided (e.g. `utils.ts`). If the utilities are related to the component being
  developed, add the namespace to the file name (e.g. `%ComponentName%.utils.ts`). Otherwise, place the code one level
  higher in the appropriate directory
- component should be tested when it's possible. Test need to be written in the file `%ComponentName%.test.ts`
- all comments in the code are in English

```tsx
import { FC } from 'react'
import useStyles from 'MyComponent.styles.ts'
import { MyComponentProps } from 'MyComponent.types.ts'

const MyComponent: FC<MyComponentProps> = ({ id, size = 'm' }) => {
  /** Your code goes here */
}

export default MyComponent
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
