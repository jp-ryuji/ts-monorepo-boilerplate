# Software Architecture

This project follows a Domain-Driven Design (DDD) approach with an Onion Architecture structure. This pattern emphasizes separation of concerns and dependency inversion, with dependencies pointing inward toward the domain core.

In this architecture:

- The **core domain** (business logic) resides at the center and is independent of external systems
- **Domain entities** represent the core business objects with identity
- **Value objects** are immutable objects that describe aspects of the domain
- **Repository interfaces** define the contracts for data access (ports)
- **Application services** orchestrate use cases and business flows
- **DTOs** (Data Transfer Objects) carry data between processes
- **Adapters** come in two types:
  - **Secondary/Driven Adapters**: Implementations of repository interfaces that connect to external systems (databases, message queues, etc.)
  - **Primary/Driving Adapters**: Interface adapters that expose application functionality to external clients (gRPC services, HTTP handlers, etc.)

## Project Structure (API)

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
    ├── application/               # Application services (orchestration)
    ├── infrastructure/            # Technical implementations
    │   ├── postgres/              # PostgreSQL database adapters
    │   │   └── repository/        # Repository implementations
    └── interface/                 # Interface Adapters
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

### 2. Application Layer (Services)

Contains application-specific business logic:

- **Services**: Implementation of specific business operations (orchestration)
- **DTOs**: Data Transfer Objects for input/output boundaries
- **Application Services**: Coordination of domain objects and external services

This layer depends only on the domain layer and defines the application's capabilities.

Files in this layer use the `*.service.ts` naming convention.

### 3. Infrastructure Layer (Adapters)

Contains technical implementations:

- **Repository Implementations**: Concrete implementations of repository interfaces
- **Database Adapters**: Database connection and ORM configurations
- **External Service Adapters**: HTTP clients, message queues, etc.
- **Framework Integrations**: NestJS modules, controllers, etc.

This layer depends on both domain and application layers.

### 4. Presentation Layer (Interface)

Contains user-facing interface:

- **REST Controllers**: Handle HTTP requests and responses
- **GraphQL Resolvers**: Handle GraphQL queries and mutations
- **CLI Commands**: Command-line interface implementations

This layer depends on the application layer and translates user input into service execution.

## Key Design Principles

### 1. Separation of Concerns

Each layer has a specific responsibility:

- **Domain**: Business rules and logic
- **Application**: Service orchestration
- **Infrastructure**: Technical implementations
- **Presentation**: User interface concern

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

DTOs are defined in the presentation layer and validated before being processed by services.

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
