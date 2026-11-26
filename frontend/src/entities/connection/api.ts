import { createCrudApi } from "@/shared/api";
import type { Connection, ConnectionInput } from "./model";

export const connectionApi = createCrudApi<Connection, ConnectionInput>("/connections");
