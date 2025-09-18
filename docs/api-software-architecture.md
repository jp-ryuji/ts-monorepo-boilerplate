# Software Architecture

This project follows the Onion Architecture pattern with Domain-Driven Design (DDD) principles. This pattern, along with Clean Architecture and Hexagonal Architecture, shares common principles of separation of concerns and dependency inversion, though each has its own emphasis:

- **Onion Architecture** focuses on layers with dependencies pointing inward toward the domain core
- **Clean Architecture** emphasizes dependency rules where inner layers should not depend on outer layers
- **Hexagonal Architecture** emphasizes defining interfaces (ports) at the system boundaries and implementing adapters for external systems

All these patterns promote loose coupling between the application core and external systems.

In this architecture:

- The **core domain** (business logic) resides at the center and is independent of external systems
- **Ports** are interfaces defined in the core that allow communication with external systems
- **Adapters** are implementations of those ports that connect to external systems (databases, HTTP APIs, etc.)

## Core Concept

The application is structured around three primary layers:

1. **Domain Layer** - Pure business logic and entities
2. **Application Layer** - Use cases that orchestrate domain logic
3. **Infrastructure Layer** - Technical implementations (database, HTTP, etc.)

This separation ensures that business logic remains independent of technical concerns.

## Project Structure

```plaintext
apps/api/
└── src/
    ├── domain/                    # Business logic and entities
    │   ├── shared/                # Shared kernel for common domain concepts
    │   │   └── value-object/      # Universal value objects (e.g., Email)
    │   ├── user/                  # User bounded context
    │   │   ├── user.entity.ts     # User entity with business rules
    │   │   └── user.repository.ts # Repository interface (port)
    │   └── post/                  # Post bounded context
    ├── usecase/                   # Application use cases
    └── infrastructure/            # Technical implementations
        ├── postgres/              # PostgreSQL database adapters
        │   └── repository/        # Repository implementations (adapters)
        └── rest/                  # HTTP API adapters
            └── v1/                # API version 1 controllers and modules
```

## Architecture Layers

### 1. Domain Layer (Core)

The innermost layer containing business logic and domain models:

- **Entities**: Objects with identity and behavior (e.g., `User`, `Post`)
- **Value Objects**: Objects without identity, defined by their attributes (e.g., `Email`)
- **Repository Interfaces**: Contracts defining data access operations (ports)
- **Domain Services**: Business logic that doesn't naturally fit within entities

This layer is completely framework-agnostic and has no external dependencies.

**Persistence Mapping**: Domain entities include `fromPersistence()` and `toPersistence()` methods for converting between domain objects and persistence representations. This approach keeps simple mapping logic close to the entity while more complex transformations can be handled in infrastructure layer mappers.

### 2. Application Layer (Use Cases)

Contains application-specific business logic:

- **Use Cases**: Implementation of specific business operations
- **DTOs**: Data Transfer Objects for input/output boundaries
- **Application Services**: Coordination of domain objects and external services

This layer depends only on the domain layer and defines the application's capabilities.

### 3. Infrastructure Layer (Adapters)

Contains technical implementations:

- **Repository Implementations**: Concrete implementations of repository interfaces
- **Database Adapters**: Database connection and ORM configurations
- **External Service Adapters**: HTTP clients, message queues, etc.
- **Framework Integrations**: NestJS modules, controllers, etc.

This layer depends on both domain and application layers.

### 4. Presentation Layer (Interfaces)

Contains user-facing interfaces:

- **REST Controllers**: Handle HTTP requests and responses
- **GraphQL Resolvers**: Handle GraphQL queries and mutations
- **CLI Commands**: Command-line interface implementations

This layer depends on the application layer and translates user input into use case execution.

## Key Design Principles

### 1. Separation of Concerns

Each layer has a specific responsibility:

- **Domain**: Business rules and logic
- **Application**: Use case orchestration
- **Infrastructure**: Technical implementations
- **Presentation**: User interface concerns

### 2. Dependency Inversion

High-level modules don't depend on low-level modules. Both depend on abstractions.
Abstractions don't depend on details. Details depend on abstractions.

### 3. Single Responsibility

Each class/module has one reason to change, making the system more maintainable.

### 4. Open/Closed Principle

Classes are open for extension but closed for modification.

### 5. Persistence Mapping Patterns

The project uses a hybrid approach for persistence mapping:

1. **Simple Mapping in Domain**: Basic `fromPersistence()` and `toPersistence()` methods are included in domain entities for straightforward 1:1 conversions
2. **Complex Mapping in Infrastructure**: More complex transformations are handled by infrastructure layer mappers when needed
3. **Technology Agnostic Naming**: Methods use "persistence" terminology rather than "database" to maintain abstraction and allow for different storage technologies

This approach balances simplicity with flexibility, keeping common mapping logic close to the entities while allowing complex transformations to be handled separately.

### 6. Data Transfer Objects (DTOs)

REST controllers use Data Transfer Objects to:

- **Validate Request Data**: Ensure incoming data conforms to expected structure
- **Provide Type Safety**: Strong typing for API contracts
- **Separate API Contracts**: Decouple API interfaces from domain entities
- **Enable Documentation**: Clear DTOs support API documentation generation

DTOs are defined in the presentation layer and validated before being processed by use cases.

## Testing Strategy

The project follows a comprehensive testing approach:

1. **Unit Tests**: Test individual components in isolation with mock dependencies
2. **Integration Tests**: Test the interaction between components
3. **End-to-End Tests**: Test complete user flows

Test utilities include:

- **Factories**: For creating test data with realistic scenarios
- **Database Test Setup**: For isolated database testing with Testcontainers
- **Mock Repositories**: For testing use cases without external dependencies

## Benefits

1. **Maintainability**: Clear separation of concerns makes code easier to understand and modify
2. **Testability**: Business logic can be tested independently of external systems
3. **Flexibility**: Easy to swap implementations (e.g., switch from PostgreSQL to MongoDB)
4. **Scalability**: Architecture supports adding new features without disrupting existing code
5. **Framework Independence**: Core business logic is not tied to specific frameworks
