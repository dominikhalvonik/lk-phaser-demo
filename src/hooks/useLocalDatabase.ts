/**
 * @prettier
 */

"use strict";

import LocalDatabase from "@/libs/LocalDatabase";

let db: LocalDatabase | null = null;

const useLocalDatabase = (): LocalDatabase =>
	!db ? (db = new LocalDatabase()) : db;

export default useLocalDatabase;
