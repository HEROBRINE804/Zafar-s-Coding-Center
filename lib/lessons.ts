export type Lesson = {
  id: string
  index: number
  title: string
  level: string
  description: string
  instructions: string[]
  starterCode: string
}

export const lessons: Lesson[] = [
  {
    id: 'variables',
    index: 1,
    title: 'Variables & console.log',
    level: 'Beginner',
    description:
      'Store values in variables and print them to the terminal with console.log.',
    instructions: [
      'Create a variable using const or let.',
      'Use console.log() to print a value to the terminal.',
      'Try printing more than one value on the same line.',
    ],
    starterCode: `// Variables hold values you can reuse.
const name = "Ada"
let year = 1843

console.log("Hello,", name)
console.log("First programmer, born in", year)

// Try changing the values above, then press Run.
`,
  },
  {
    id: 'functions',
    index: 2,
    title: 'Functions & Return Values',
    level: 'Beginner',
    description:
      'Write reusable blocks of logic that take input and return a result.',
    instructions: [
      'Define a function with the function keyword or an arrow function.',
      'Give it parameters and return a value.',
      'Call the function and log the result.',
    ],
    starterCode: `// A function takes input and returns output.
function add(a, b) {
  return a + b
}

const double = (n) => n * 2

console.log("2 + 3 =", add(2, 3))
console.log("double(10) =", double(10))
`,
  },
  {
    id: 'loops',
    index: 3,
    title: 'Loops & Arrays',
    level: 'Beginner',
    description:
      'Store lists of data in arrays and repeat work with loops.',
    instructions: [
      'Create an array of values.',
      'Loop over it with a for loop or forEach.',
      'Log each item, or build up a total.',
    ],
    starterCode: `// Arrays store lists; loops repeat work.
const fruits = ["apple", "banana", "cherry"]

for (let i = 0; i < fruits.length; i++) {
  console.log(\`\${i + 1}. \${fruits[i]}\`)
}

const numbers = [5, 10, 15, 20]
let total = 0
numbers.forEach((n) => (total += n))
console.log("Total:", total)
`,
  },
]
