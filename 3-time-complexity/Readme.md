# Time complexity 20/04/23

### Asymptotic analysis of algorthms

- Algorithms are solutions/blueprint of a program
- Time & space complexities
- Asymptotic notations: Why we need all 3, depending on size of input
  - Big O. For n inputs how much time does it take (Upper bound - worst case). Huge number of inputs
  - Big omega. For n inputs, how much time does it take for the best case(Lower bound). Small number of inputs
  - Big theta. For the average case. Average number of inputs

### Types of algs for repetitive tasks

- Iterative
- Recursive

### Big O calc tricks:

Take the highest power of the equation
When in doubt, supply values and see the pattern
Usually take 1, 2 and n cases, add it all up.
Consider if loops are dependent and independent
Resolve in terms of n only, other values should probably be a progression value if n is dependent on it

### Recursion

- Back substitution
- Master theorm(Applicable to only certain functions) - Different versions
  - T(n) = a T(n/b) + Theta(n^k\*log^pn), take cases. Google it.
- Notes on some math needed:
  https://towardsdatascience.com/logarithms-exponents-in-complexity-analysis-b8071979e847#e39a
