// types
const typeNumber: number = 0;
const typeString: string = "text";
const typeBoolean: boolean = true;
const typeAny: any = ""; // dynamic type value
const typeAny2 = ""; // dynamic type value

// object types
const person: {
	id: string;
	name: string;
	age: number;
	nickname?: string; // optional value
} = {
	id: "i12",
	name: "Maximilian",
	age: 30,
};
console.log(person.name);

// enums
enum Role {
	ADMIN = "ADMIN",
	READ_ONLY = 100,
	AUTHOR = "AUTHOR",
}
const role: Role = Role.ADMIN;

// union types
let unionType: number | string = 0;
unionType = "some text...";

// literal type
type LiteralType = "custom-type";
let lType: LiteralType;
lType = "custom-type";

// type Aliases - custom types
type AliasName = number | string;
type AliasName2 = "as-number" | "as-text";

type User = { name: string; age: number };
const u1: User = { name: "ali", age: 20 };

// functions return types
/**
 * types => number, string, boolean, custom, undefined, void, never.
 *? undefined should return undefined value.
 *
 *? function of type void doesn't return any value.
 *
 *! `never` used in conjunction with functions that throw errors or never return a value,
 *! such as throw statements or Infinite loops
 *
 * function name(params: type): type {
 * }
 **/
function add(n1: number, n2: number): number {
	// return type is number
	return n1 + n2;
}

function printResult(num: number): void {
	console.log("Result: " + num);
}

function generateError(message: string, code: number): never {
	throw { message, code };
}
// generateError("An error occurred!", 500);

//  functions as a type
let funRef: Function;
let combineValues: (a: number, b: number) => number;
combineValues = add; // no error - match function type.
// combineValues = printResult; // !error in completion - mismatch function type

console.log(combineValues(8, 8));

// functions and callback
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}
addAndHandle(20, 10, result => {
	console.log(result);
});

//! unknown vs any types
/**
 ** `unknown` => represents any value with an added level of type-checking
 * its more restrictive than `any`
 *
 ** `unknown` => requires explicit type of assertions or type narrowing before it can be used
 * while `any` can be used without restrictions.
 *
 *? its recommended to use `unknown` as it provides a higher level of type-checking,
 *? making your code safer and less prone to errors.
 */

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

// Classes
/**
 * ?Objects => The things you work with in code.
 *  -> instances of classes
 *
 * *singletons => only one instance of the class can exist at a time.
 *
 * ?Classes => The blueprint for objects (theoretical definition).
 *  -> define how objects look like, which properties and methods they have.
 *
 * *abstract => can not be instantiated directly.
 * ?abstract => is a template for other classes to inherit from,
 * -and contains abstract methods that must be implemented by the subclasses.
 */
abstract class Department {
	// private readonly id: string;
	// name: string;
	// !public => accessible from everywhere. (default)
	// *private => only accessible within the class.
	// *protected => accessible from within the class and classes that inherit from this class.
	// ?readonly => can only be set once.
	// *static =>  accessed using the class name without creating an instance of the class

	protected employees: string[] = [];
	static fiscalYear = 2010;

	// *shortcut for declaring and initializing properties in a constructor.
	constructor(protected readonly id: string, public name: string) {
		// this.id = id;
		// this.name = name;
	}

	// ?static => used to provide utility functions or constants that are related to the class, but not specific to any instance of the class.
	static createEmployee(name: string) {
		return { name: name };
	}

	// *this as a parameter => add extra type safety.
	abstract describe(this: Department): void;

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(this.employees);
	}
}
// const accounting = new Department("d1", "Accounting");
// accounting.describe(); // *Department: Accounting

// accounting.name = 'new name'; // !error => private property

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe(); // !error => this is undefined
//? this => typically refers to the thing which is responsible for calling the method.
//* this as a parameter => this: ClassName => check the type of object instance.

// Inheritance
class ITDepartment extends Department {
	admins: string[];
	constructor(id: string, admins: string[]) {
		super(id, "IT");
		this.admins = admins;
	}

	describe() {
		console.log("IT Department - ID: " + this.id);
	}
}
const it = new ITDepartment("d2", ["Max"]);
console.log({ it });

class AccountingDepartment extends Department {
	private lastReport: string;
	private static instance: AccountingDepartment;

	private constructor(id: string, private reports: string[]) {
		super(id, "Accounting");
		this.lastReport = reports[0];
	}

	// TODO: check if there is an instance of the class => singleton
	static getInstance() {
		if (AccountingDepartment.instance) {
			return this.instance;
		}
		this.instance = new AccountingDepartment("d2", []);
		return this.instance;
	}

	// *getter => access a property
	//? getter method has to return a value.
	get mostRecentReport() {
		if (this.lastReport) {
			return this.lastReport;
		}
		throw new Error("No report found.");
	}

	// *setter => change (mutate) a property
	//? getter method and setter method should have the same name.
	set mostRecentReport(value: string) {
		if (!value) throw new Error("Please pass in a valid value!");

		this.addReport(value);
	}

	describe() {
		console.log("IT Department - ID: " + this.id);
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports);
	}

	// ?overriding method
	addEmployee(name: string) {
		if (this.employees.includes(name)) {
			console.error("Employee already exists");
			return;
		} else this.employees.push(name);
	}
}
// const accountingDepartment = new AccountingDepartment("d2", ["report1"]);

// ?implementing singleton - only one instance of the class.
const accountingDepartment = AccountingDepartment.getInstance();

accountingDepartment.addReport("Something went wrong...");
accountingDepartment.printReports();
accountingDepartment.addEmployee("ali");
accountingDepartment.printEmployeeInformation();

// Getters & Setters.
accountingDepartment.mostRecentReport = "Year End Report...";
console.log("Last Report: ", accountingDepartment.mostRecentReport);

// static properties and methods
const employee1 = Department.createEmployee("Omar");
console.log(employee1, Department.fiscalYear);

// Interfaces
/**
 * *Interfaces => define the structure of an object.
 *
 * ?you can only inherit from one class, but you can implement multiple interfaces.
 *
 *  * Interfaces vs Types.
 *  - interfaces are commonly used for defining the shape of objects,
 *  - and types are commonly used for creating aliases or defining advanced type constructs.
 *
 *  ? Interfaces => can extend more than one interface.
 *
 * * Interfaces => force class or object to have certain structure.
 */

// interface Person {
// 	readonly name: string;
// 	age: number;

// 	greet(phrase: string): void;
// }

interface Named {
	readonly name?: string;
	outputName?: string;
}

interface Greatable extends Named {
	greet(phrase: string): void;
}

class Person implements Greatable {
	name?: string;
	age = 30;

	constructor(n?: string) {
		if (n) {
			this.name = n;
		}
	}

	greet(phrase: string) {
		console.log(phrase + " " + this.name);
	}
}

let user1: Greatable;
user1 = new Person("Abram");
user1.greet("Hi there - I am");

// Interface as function types

interface AddFn {
	(a: number, b: number): number;
}

let addHandler: AddFn;
addHandler = (n1: number, n2: number) => {
	return n1 + n2;
};

// Intersection Types
/**
 *
 * ?we can use intersection types to combine multiple types into one.
 * *we can use interface instead of type.
 */

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// *if we use interface
// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "Abram",
	privileges: ["create-server"],
	startDate: new Date(),
};
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

/**
 * *Type Guards => check the type of a variable at runtime.
 * !the idea of check if a certain property exists in an object. before use it.
 * ?helps us with union types.
 */

type UnknownEmployee = Employee | Admin;
const printEmployeeInformation = (emp: UnknownEmployee) => {
	console.log("Name: ", emp.name);
	if ("privileges" in emp) {
		console.log("Privileges: ", emp.privileges);
	}
	if ("startDate" in emp) {
		console.log("Start Date: ", emp.startDate);
	}
};
printEmployeeInformation(e1);

// type guards with classes...
class Car {
	drive() {
		console.log("Driving a car...");
	}
}
class Truck {
	drive() {
		console.log("Driving a truck...");
	}

	loadCargo(amount: number) {
		console.log("Loading cargo...", amount);
	}
}

const v1 = new Car();
const v2 = new Truck();
type Vehicle = Car | Truck;

const useVehicle = (vehicle: Vehicle) => {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
};

useVehicle(v1);
useVehicle(v2);

/**
 * *Discriminated Unions => help us with union types easier.
 * ?giving each type an extra property. => (type | kind) property.
 * !discriminator is used to differentiate between the different types | interfaces.
 */

interface Bird {
	type: "bird";
	flyingSpeed: number;
}
interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;
function moveAnime(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;
		case "horse":
			speed = animal.runningSpeed;
			break;
	}
	console.log("Moving with speed: ", speed);
}
moveAnime({ type: "bird", flyingSpeed: 100 });
moveAnime({ type: "horse", runningSpeed: 70 });
