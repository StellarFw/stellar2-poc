import { ActionContext, Action, isolate, Result } from "../common/mod.ts";

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

const createContext = (action: Action, params: Params): ActionContext => ({
  get: get(params),
});

export const execute = async (action: Action, params: Params): Promise<Result<any, Error>> => {
  const context = createContext(action, params);
  return isolate(action.resolver, context);
};
