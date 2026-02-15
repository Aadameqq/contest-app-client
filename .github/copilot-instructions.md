# GitHub Copilot Instructions

## Project Overview
This is a Next.js 15+ application using TypeScript, React, and a feature-based architecture. The app is a contest application with authentication and user management capabilities.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Library**: Mantine
- **Form Management**: Mantine Forms with Zod validation
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Custom HTTP client wrapper
- **Validation**: Zod schemas
- **Styling**: CSS (globals.css), Mantine components

## Architecture Patterns

### Feature-Based Structure
The project follows a feature-based architecture where each feature is self-contained:

```
src/features/<feature-name>/
  ├── contracts/       # Zod schemas and type definitions
  ├── hooks/          # React hooks (queries, mutations, forms)
  ├── pages/          # Page components
  ├── services/       # API service functions
  └── index.ts        # Public API exports
```

### Shared Code Organization
```
src/shared/
  ├── components/     # Reusable UI components
  │   ├── layout/    # Layout components (navbar, footer, etc.)
  │   ├── providers/ # React context providers
  │   └── ui/        # Generic UI components
  ├── domain/         # Domain logic and types
  ├── hooks/          # Shared hooks
  └── lib/            # Utilities and libraries
```

## Coding Conventions

### File Naming
- **Components**: `feature-name.component.tsx` (e.g., `auth-buttons.component.tsx`)
- **Pages**: `feature-name.page.tsx` (e.g., `register.page.tsx`)
- **Hooks**: `use-feature-name.hook.ts` (e.g., `use-register-form.hook.ts`)
- **Services**: `feature-name.service.ts` (e.g., `auth.service.ts`)
- **Contracts**: `feature-name.contract.ts` (e.g., `user.contract.ts`)
- **Domain**: `feature-name.domain.ts` (e.g., `result.domain.ts`)
- **Lib**: `feature-name.lib.ts` (e.g., `http-client.lib.ts`)

### Export Pattern
Each directory should have an `index.ts` file that exports the public API:
```typescript
// features/auth/index.ts
export * from './hooks';
export * from './pages';
export * from './services';
```

### Contracts (Zod Schemas)
- Use Zod for all data validation and type inference
- Define contracts in `contracts/` directory
- Export both schema and inferred type:
```typescript
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;
```

### Hooks Pattern
- **Query hooks**: Use `use-query-with-result.hook.ts` wrapper for React Query
- **Mutation hooks**: Use `use-mutation-with-result.hook.ts` wrapper for React Query mutations
- **Form hooks**: Use Mantine forms with `mantine-form-zod-resolver` for validation

Example query hook:
```typescript
export const useCurrentUser = () => {
  return useQueryWithResult({
    queryKey: ['currentUser'],
    queryFn: userService.getCurrentUser,
  });
};
```

Example form hook:
```typescript
import { useForm, zodResolver } from '@mantine/form';

export const useRegisterForm = () => {
  return useForm({
    initialValues: { email: '', password: '' },
    validate: zodResolver(registerSchema),
  });
};
```

### Services Pattern
- Services handle API communication
- Use the shared `httpClient` from `shared/lib/http-client.lib.ts`
- Return properly typed responses validated against contracts
- Handle errors appropriately

Example service:
```typescript
import { httpClient } from '@/shared/lib';
import { userSchema, type User } from '../contracts';

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await httpClient.get('/api/users/me');
    return userSchema.parse(response.data);
  },
};
```

### Component Pattern
- Use `.component.tsx` suffix for components
- Prefer functional components with TypeScript
- Export as default when it's a page component
- Use named exports for reusable components

```typescript
// For pages
export default function RegisterPage() {
  return <div>Register</div>;
}

// For components
export const AuthButtons = () => {
  return <div>Auth Buttons</div>;
};
```

### Result Domain Pattern
The project uses a Result pattern for handling success/error states:
- Located in `shared/domain/result.domain.ts`
- Use with mutation hooks for proper error handling
- Provides type-safe success/failure handling

## React Query Setup
- Query provider is set up in `shared/components/providers/query-provider.component.tsx`
- Wrap mutations with `useMutationWithResult` for Result pattern integration
- Wrap queries with `useQueryWithResult` for Result pattern integration

## Best Practices

### When Creating New Features
1. Create feature directory in `src/features/`
2. Add `contracts/` directory with Zod schemas
3. Add `services/` directory with API functions
4. Add `hooks/` directory with React Query hooks
5. Add `pages/` directory with page components
6. Export public API through `index.ts`

### When Adding Components
1. Determine if component is feature-specific or shared
2. Feature-specific → place in feature directory
3. Shared → place in `src/shared/components/`
4. Use proper naming convention (`.component.tsx`)

### When Working with Forms
1. Define validation schema in contracts
2. Create form hook using `useForm` with `zodResolver`
3. Create mutation hook using `useMutationWithResult`
4. Handle form submission with proper error handling

### When Adding API Endpoints
1. Define request/response contracts with Zod
2. Create service function using `httpClient`
3. Parse response with Zod schema
4. Create React Query hook for the endpoint

## Import Conventions
- Use absolute imports with `@/` prefix for `src/` directory
- Import from `index.ts` files, not direct files:
  ```typescript
  // Good
  import { useCurrentUser } from '@/features/auth';
  
  // Avoid
  import { useCurrentUser } from '@/features/auth/hooks/use-current-user.hook';
  ```

## TypeScript Guidelines
- Enable strict mode
- Use explicit return types for functions
- Prefer `type` over `interface` unless extending
- Use `z.infer<typeof schema>` for deriving types from Zod schemas

## Styling
- Use Mantine component props for styling when possible
- Global styles in `src/app/globals.css`
- The app supports theme switching (light/dark mode)

## Error Handling
- Use Result pattern from `shared/domain/result.domain.ts`
- Handle errors at the hook level
- Display user-friendly error messages
- Log errors appropriately for debugging

## Code Generation Preferences
When generating code for this project:
1. Follow the established file naming conventions
2. Use the feature-based architecture
3. Create proper contracts with Zod
4. Use the custom React Query wrappers
5. Export through index.ts files
6. Maintain TypeScript strict typing
7. Use Mantine components for UI
8. Follow the established patterns for hooks, services, and components
