import { v4 as uuid } from 'uuid';

class Category {
  id?: string;

  name: string | undefined;

  description: string | undefined;

  createdAt: Date | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
