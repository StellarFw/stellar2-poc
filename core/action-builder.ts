import { ActionBuilder, Action, ActionFunctor, DataType, Input, Output, ActionResolver } from "common";

function onErrorHandler(error) {
  // TODO: do something with the error, for now just print the error on the screen
  console.log("ERROR:", error)
}

function create(name: string, description: string): Action {
  return {
    name, 
    description,
    inputs: {},
    outputs: {
      error: {
        name: "Error",
        description: "Default output error for when an exception occurs inside action",
        type: Object,
      }
    },

    resolver: () => {}
  }
}

const input = (name: string, type: DataType, description?: String) => (action: Action) => {
  const newInput: Input =  { name, type, description };

  return {
    ...action,
    inputs: {
      ...action.inputs,
      [name]: newInput
    }
  }
};

const output = (name: string, type: DataType, description?: String) => (action: Action)  => {
  const newOutput = { name, type, description };

  return {
    ...action,
    outputs: {
      ...action.outputs,
      [name]: newOutput
    }
  }
}

const resolver = (resolver: ActionResolver) => (action: Action) => {
  return {
    ...action,
    resolver
  }
}

const compose = (...fns: Array<ActionFunctor>) => (action: Action) => fns.reduceRight((action: Action, fn: ActionFunctor) => fn(action), action);

export const builder: ActionBuilder = {
  create,
  input,
  output,
  resolver,
  compose
} as ActionBuilder;
