import { SearchIndex } from 'algoliasearch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class BatchAlgoliaUpdater<T extends Readonly<Record<string, any>>> {
  private data: T[] = [];
  private batchSize: number;
  private index: SearchIndex;

  constructor(index: SearchIndex, batchSize: number) {
    this.batchSize = batchSize;
    this.index = index;
  }

  load = (item: T) => this.data.push(item);

  execute = () =>
    new Promise<void>((resolve, reject) => {
      const func = async () => {
        if (this.data.length < this.batchSize) {
          if (!this.data.length) {
            resolve();
          } else {
            this.index
              .saveObjects(this.data)
              .then(() => resolve())
              .catch((err) => reject(err));
          }
        } else {
          const data = this.data.slice(0, this.batchSize);

          this.index
            .saveObjects(data)
            .then(() => {
              this.data = this.data.slice(this.batchSize);
              func();
            })
            .catch((err) => reject(err));
        }
      };

      func();
    });
}

export default BatchAlgoliaUpdater;
