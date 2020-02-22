import { Action, DataType, ActionResolver } from "./action.interface.ts";

/**
 * Functor that receives an Action and return a new Action.
 */
export type ActionFunctor = (action: Action) => Action;

/**
 * Interface that defines the available functions to define a new action.
 */
export interface ActionBuilder {
  /**
   * Create a new action.
   */
  create: (name: string, description: string) => Action,

  /**
   * Allows to compose the different Action parts.
   */
  compose: (...fns: Array<Function>) => ActionFunctor,

  /**
   * Defines a new input for the Action.
   */
  input: (name: string, type: DataType, description?: string) => ActionFunctor,

  /**
   * Defines a new output for the Action.
   */
  output: (name: string, type: DataType, description?: string) => ActionFunctor,

  /**
   * Defines the resolver for the action.
   */
  resolver: (fn: ActionResolver) => ActionFunctor,
}
