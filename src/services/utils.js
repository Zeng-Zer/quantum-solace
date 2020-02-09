export function getRandomId() {
  return Math.floor(Math.random() * 50000 + 1);
}

export function getExplanationLevelOne() {
  return `
    What you're seeing here is a bloch sphere. It's a representation of a qubit state in 3D. <br/>
    A qubit state can be seen as a vector pointing at a
    sphere surface. Feel free to test differents gates to figure out what is happening ! <br/>
    Obviously, this is a "tutorial-level" there is no good or bad answer for it.
  `;
}

export function getGateDescriptionByName(gateName) {
  return {
    H: `
      The H or Hadamard gate rotates the states |0⟩ and |1⟩ to |+⟩ and |−⟩, respectively.<br/>
      It is useful for making superpositions. As a Clifford gate, it is useful for moving information between the x and z bases.
    `,
    X: `
      The Pauli X gate has the property of flipping the |0⟩ state to |1⟩, and vice versa. It is equivalent to Rx for the angle π.
    `,
    Z: `
      The Pauli Z gate has the property of flipping the |+⟩ to |−⟩, and vice versa. It is equivalent to Rz for the angle π.
    `,
    barrier: `
      To make your quantum program more efficient, the compiler will try to combine gates.
      The barrier is an instruction to the compiler to prevent these combinations being made.
    `,
    CX: `
      The controlled-X gate is also known as the controlled-NOT. It acts on a pair of qubits, with one acting as ‘control’ and the other as ‘target.
      It performs an X on the target whenever the control is in state |1⟩. If the control qubit is in a superposition, this gate creates entanglement.
    `
  }[gateName];
}
