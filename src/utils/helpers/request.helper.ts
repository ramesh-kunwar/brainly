import { AsyncLocalStorage } from "node:async_hooks";

interface AsyncLocalStorageType {
  correlationId: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const getcorrelationId = () => {
  const asyncStore = asyncLocalStorage.getStore();
  return (
    asyncStore?.correlationId || "unknown-error-while-creating-correlation-id"
  );
};
