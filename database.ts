export class KeyValueDatabase {
  databaseSnapshots = [new Map<string, any>()];
  currentDatabaseSnapshot = this.databaseSnapshots[this.databaseSnapshots.length - 1];

  constructor() {
  }

  public beginTransaction() {
    this.databaseSnapshots = [...this.databaseSnapshots, new Map([...this.currentDatabaseSnapshot])];
    this.currentDatabaseSnapshot = this.databaseSnapshots[this.databaseSnapshots.length - 1];
  }

  public commit() {
    if (this.databaseSnapshots.length === 1) {
      console.log('NO TRANSACTIONS');
      return;
    }
    this.removeLastDatabaseSnapshot();
    const lastDatabaseSnapshot = this.getLastDatabaseSnapshot();
    this.removeLastDatabaseSnapshot();
    const newDatabaseSnapshot = new Map<string, any>([
      ...lastDatabaseSnapshot,
      ...this.currentDatabaseSnapshot
      ]);
    this.databaseSnapshots = [...this.databaseSnapshots, newDatabaseSnapshot];
    this.currentDatabaseSnapshot = this.databaseSnapshots[this.databaseSnapshots.length - 1];
  }

  public rollback() {
    if (this.databaseSnapshots.length === 1) {
      console.log('NO TRANSACTIONS');
      return;
    }
    this.databaseSnapshots = this.databaseSnapshots.slice(0, -1);
    this.currentDatabaseSnapshot = this.databaseSnapshots[this.databaseSnapshots.length - 1];
  }

  public set(key: string, value: any) {
    this.currentDatabaseSnapshot.set(key, value);
  }

  public get(key: string) {
    return this.currentDatabaseSnapshot.get(key);
  }

  public numEqualTo(value: any) {
    let quantity = 0;
    for (const databaseValue of this.currentDatabaseSnapshot.values()) {
      if (databaseValue === value) quantity++;
    }
    return quantity;
  }

  public unset(key: string) {
    this.currentDatabaseSnapshot.delete(key);
  }

  private getLastDatabaseSnapshot() {
    return this.databaseSnapshots[this.databaseSnapshots.length - 1];
  }

  private removeLastDatabaseSnapshot() {
    this.databaseSnapshots = this.databaseSnapshots.slice(0, -1);
  }
}
