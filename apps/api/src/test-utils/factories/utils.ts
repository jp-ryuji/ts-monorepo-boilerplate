// Simple sequence generator for unique test data
class SequenceGenerator {
  private sequences = new Map<string, number>();

  next(key: string): number {
    const current = this.sequences.get(key) || 0;
    const next = current + 1;
    this.sequences.set(key, next);
    return next;
  }

  reset(key: string): void {
    this.sequences.delete(key);
  }
}

export const sequence = new SequenceGenerator();
