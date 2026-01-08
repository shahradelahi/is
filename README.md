# @se-oss/is

[![CI](https://github.com/shahradelahi/is/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/is/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/is.svg)](https://www.npmjs.com/package/@se-oss/is)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@se-oss/is)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/is)](https://packagephobia.com/result?p=@se-oss/is)

_@se-oss/is_ is an elegant and type-safe value validation library for TypeScript and JavaScript.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/is
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/is
```

**yarn**

```bash
yarn add @se-oss/is
```

</details>

## 📖 Usage

### Basic validation

```typescript
import is from '@se-oss/is';

is.string('☕');
//=> true

is.number(42);
//=> true

is.array([1, 2, 3]);
//=> true

is.urlInstance(new URL('https://example.com'));
//=> true
```

### Type detection

```typescript
import is from '@se-oss/is';

is('hello');
//=> 'string'

is(new Map());
//=> 'Map'

is(new Uint8Array());
//=> 'Uint8Array'
```

### Type narrowing

```typescript
import is from '@se-oss/is';

const value: unknown = '☕';

if (is.string(value)) {
  console.log(value.length);
  //=> 2
}
```

### Logical operators

```typescript
import is from '@se-oss/is';

// Check if any of the predicates match
is.any([is.string, is.number], 'hello');
//=> true

// Check if all of the predicates match
is.all([is.array, is.nonEmptyArray], [1, 2, 3]);
//=> true

// Check if a value is optional
is.optional(undefined, is.string);
//=> true

// Use as predicate factories
const isStringOrNumber = is.any([is.string, is.number]);
isStringOrNumber('hello');
//=> true
```

### Advanced usage

```typescript
import is from '@se-oss/is';

// Validate array elements
is.array([1, 2, 3], is.number);
//=> true

// Check if a number is in range
is.inRange(3, [0, 5]);
//=> true

// Check for plain objects
is.plainObject({ a: 1 });
//=> true
```

### Web & String validation

```typescript
import is from '@se-oss/is';

is.json('{"a":1}');
//=> true

is.base64('SGVsbG8gd29ybGQ=');
//=> true

is.ipv4('127.0.0.1');
//=> true

is.hexColor('#ffffff');
//=> true
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/is).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/is)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/is/graphs/contributors).
