[![npm version](https://badge.fury.io/js/is-valid-object.svg)](https://badge.fury.io/js/is-valid-object)

# is-valid-object

is-valid-object is a Javascript library for making sure objects conform to a defined structure.

## Installation
```bash
npm install is-valid-object
```

## Usage
```javascript
import { ObjectChecker } from 'is-valid-object';

const schema = {
    "keyToCheck": {
        "type": "string"
    }
};

const objectToCheck = {
    "keyToCheck": "some string"
};

console.time("object-checker");
const checker = new ObjectChecker();
try {
    // will throw if there is some problem with the specified object
    checker.check(objectToCheck, schema);
} catch (error) {
    // some key is malformed
    console.log(error.message || error, "error");
}
console.timeEnd("object-checker");
```

A detailed example can be found in [this file](./examples/sample.js)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](./LICENSE)