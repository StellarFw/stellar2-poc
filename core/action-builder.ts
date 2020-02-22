import { ActionBuilder, Action, ActionFunctor, DataType, Input, ActionResolver } from "common";

function create(name: string, description: string): Action {
  return {
    name, 
    description,
    inputs: {},

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
  resolver,
  compose
} as ActionBuilder;
