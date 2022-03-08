export declare class ChromeStorage {
  private STORAGE_TYPE: string;
  public constructor(storageType: string);
  public clear(): void;
  public headKey(keys: string[]): string;
  public is_nestedKey(keys: string[]): string;
  public getAll(): Promise<any>;
  public get(key: string): Promise<any>;
  public set(key: string, value: any): Promise<void>;
  public push(key: string, value: any): Promise<void>;
  public remove(key: string): Promise<any>;
}
