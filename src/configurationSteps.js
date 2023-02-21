// TypeScript compiler
/**
 * Watch mode => tsc filename.ts --watch | -w
 *
 * tsc --init => creating tsconfig.json file
 * tsc => to compile the entire ts files
 * tsc -w => to watch the entire ts files
 */

// configuration file options
/**
 *? exclude files. array of files name or folder name.
 * "exclude": ['name.ts']
 * ['*.dev.ts']to exclude all files ends with .dev.ts
 * ["**/
/*.div.ts"] to exclude all file with this pattern in all files
 * we should exclude if we specify exclude files ['node_module'] is automatically excluded by default
 */

/**
 *? include files. array of files name or folder name.
 * we should include all file we need to compile
 *
 */

// setting a compilation target
/**
 * enable
 ** "sourceMap": true, to work with ts files in browser source tab.
 *
 ** "outDir": "./folder name" => where the compiler will create the compiled files
 *
 ** "rootDir": "./folder name" => where to compile files
 *
 ** "noEmit": "true" => compile files without generating output js files
 *
 *! "noEmitOnError": "true" => problematic files will not be generated.
 */
