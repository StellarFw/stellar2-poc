import { ActionContext, Action } from "../common/index.ts";
import { isolate } from "./errors.ts";

// interface ActionRequest {
//   action: Action,
//   inputData: {[key: string]: DataType}
// }

// interface InputsHelper {
//   get: (name: string) => DataType
// }

// function createInputsResolver(request: ActionRequest): InputsHelper {
//   return {
//     get(name: string): DataType | undefined {
//       return request.inputData[name];
//     }
//   }
// }

// export function execute(action: Action, inputData: {[key: string]: DataType}) {
//   const newRequest: ActionRequest = {
//     action,
//     inputData
//   }

//   const newInputResolver = createInputsResolver(newRequest);

//   return newRequest.action.resolver(newInputResolver, action.outputs)
// }

interface Params {
  [key: string]: any
}

const get = (params: Params) => (id: string) => params[id];

// TODO: to implement
const out = () => {}

const createContext = (action: Action, params: Params): ActionContext => ({
  get: get(params),
  out
});

export const execute = async (action: Action, params: Params): Promise<any> => {
  const context = createContext(action, params);
  return isolate(action.resolver, context);
};
