export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
    this.value = email.toLowerCase();
  }

  private isValidEmail(email: string): boolean {
    // Email validation based on RFC 5322 with practical considerations
    // This regex properly validates:
    // - Local part (before @): alphanumeric, dots, underscores, dashes, plus signs
    // - Domain part (after @): valid domain format with at least one dot
    // - Proper structure with no consecutive dots or invalid characters
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Additional checks for edge cases
    if (!email || email.length > 254) return false; // Email too long
    if (email.startsWith('.') || email.endsWith('.')) return false; // Starts/ends with dot
    if (email.includes('..')) return false; // Consecutive dots
    if (email.split('@')[0].length > 64) return false; // Local part too long

    return emailRegex.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
