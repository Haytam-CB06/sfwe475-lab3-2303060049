import { z } from "zod";

export const TaskStatusSchema = z.enum(["open", "doing", "done"]);

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
  dueDate: z.string().optional(),
  status: TaskStatusSchema.optional(),
});

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  dueDate: z.union([z.literal(""), z.iso.date("Enter a valid due date")]).optional(),
  status: TaskStatusSchema.default("open"),
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
