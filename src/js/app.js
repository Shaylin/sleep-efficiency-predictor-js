// TODO: Do a PR on danfo to fix the incorrect "module": "lib/bundle.js" key in its package.json when building
import {Series} from "danfojs"

let s = new Series([1, 3, 5, undefined, 6, 8])
s.print();
