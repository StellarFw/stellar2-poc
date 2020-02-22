import { LogLevel } from "../enums/log-level.enum.ts"

/**
 * Data types that a input can have.
 */
export type DataType = Number | String | Object | Array<any>;

/**
 * Structure of an action input.
 */
export interface Input {
  /**
   * Input name
   */
  name: string,

  /**
   * Description for what the description will be used for.
   */
  description?: String,

  /**
   * Data type of the input.
   */
  type: DataType,
}

/**
 * Defines the structure of the action context.
 * 
 * The context allows to get inputs and call outputs.
 */
export interface ActionContext {
  /**
   * Get the value for a parameter.
   */
  get: (id: string) => DataType;
}

/**
 * TODO: temporary, this can change
 */
export type ActionResolver = (context: ActionContext) => Promise<any>;

export interface Action {
  /**
   * A unique action identifier.
   *
   * It's recommended to use a namespace to eliminate the possibility
   * of collision, e.g. `auth.login`.
   */
  name?: string;

  /**
   * Describes the action.
   *
   * This information is used in automatic documentation.
   */
  description?: string;

  /**
   * Action version.
   *
   * This allow to have multiple action with the same name for
   * in different versions.
   */
  version?: number;

  /**
   * Group which this action is part of.
   *
   * This is used to apply batch edits to actions.
   */
  group?: string;

  /**
   * Defines how the action should be logged.
   */
  logLevel?: LogLevel;

  /**
   * Allow protect the action against overrides.
   *
   * When `true`, prevent the action to be overridden by a higher priority
   * module.
   */
  protected?: boolean;

  /**
   * Prevent action to be called from outside world.
   */
  private?: boolean;

  /**
   * Allows set if this action should be parte of the docs.
   *
   * By default, this property is set to `true`, otherwise documentation will
   * not be generated for the action.
   */
  toDocument?: boolean;

  /**
   * Enumerate the action's input parameters.
   *
   * You can also apply restrictions to allowed inputted values.
   */
  inputs: {[key: string]: Input};

  /**
   * TODO: finish type declaration
   */
  resolver: Function;
}
