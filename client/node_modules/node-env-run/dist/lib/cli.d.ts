import * as yargs from 'yargs';
export interface CliOptions extends yargs.Arguments {
    force: boolean;
    env: string;
    verbose: boolean;
    encoding: string;
    exec: string;
    script: string;
    newArguments: string[];
}
export declare type CliArgs = {
    program: CliOptions;
    script: string | undefined;
};
export declare type Cli = {
    isRepl: true;
    node: boolean;
} | {
    isRepl: false;
    error?: Error;
    script?: string;
};
export declare function parseArgs(argv: string[]): CliArgs;
export declare function init(args: CliArgs): Cli;
