import env from "@/env";
import orval from "orval";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL ?? "https://catfact.ninja";

const SCHEMA_NAME = "/docs?api-docs.json";

orval("orval.config.ts", "nextjs-template", {
  input: API_BASE_URL + SCHEMA_NAME,
});
