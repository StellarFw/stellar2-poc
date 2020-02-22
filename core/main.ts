import { ActionBuilder, ActionContext } from "common";
import { builder } from "./action-builder.ts";
import { execute } from "./action-processor.ts";

const buildAction = (builder: ActionBuilder) => {
  const action = builder.create("sum", "Sum two integer numbers");

  return builder.compose(
    builder.input("a", Number, "first number"),
    builder.input("b", Number, "second number"),

    builder.output("result", Number),

    builder.resolver(async (ctx: ActionContext): Promise<void> => {
      const a = ctx.get("a") as number;
      const b = ctx.get("b") as number;

      throw new Error("TEST");

      ctx.out("result", a + b);
    })
  )(action);
};

const action = buildAction(builder);

console.log("Action >", action);
execute(action, {a: 1, b: 4}).then(r => console.log("Result >", r));
