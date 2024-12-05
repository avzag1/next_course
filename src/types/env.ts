import { schema } from "@/libs/check.js"
import { Schema, z } from "zod"

declare global {
  namespace NodeJS{
    interface ProcessEnv extends z.infer<typeof schema>{}
  }
}