import Parser from "./frontend/parser.ts";
import {evaluate} from "./runtime/interpreter.ts";
import Environment from "./runtime/enviorment.ts";
import {MK_NULL, MK_NUMBER, MK_BOOL} from "./runtime/values.ts";

repl();

function repl() {
  const parser = new Parser();
  const env = new Environment();
  env.declareVar("x", MK_NUMBER(100));
  env.declareVar("true", MK_BOOL(true));
  env.declareVar("false", MK_BOOL(false));
  env.declareVar("null", MK_NULL());
  console.log("Repl v0.1");

  while (true) {
    const input = prompt("> ");
    // Check for no user input or exit keyword.
    if (!input || input.includes("exit")) {
      Deno.exit(1);
    }

    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);

  }
}