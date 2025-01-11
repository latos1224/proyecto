document.querySelectorAll(".nav-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const placeholder = {
      linear: "Ejemplo: 2x + 3 = 7",
      quadratic: "Ejemplo: 2x^2 + 3x - 5 = 0",
      "square-root": "Ejemplo: 25",
      "cubic-root": "Ejemplo: 27",
    }[button.dataset.type];
    document.getElementById("equation").placeholder = placeholder;

    // Clear previous results
    document.getElementById("steps").innerHTML = "";
    document.getElementById("steps-container").classList.add("hidden");
  });
});

document.getElementById("equation-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("equation").value.trim();
  const stepsContainer = document.getElementById("steps");
  const activeTab = document.querySelector(".nav-button.active").dataset.type;

  try {
    const steps = {
      linear: solveLinearEquation,
      quadratic: solveQuadraticEquation,
      "square-root": solveSquareRoot,
      "cubic-root": solveCubicRoot,
    }[activeTab](input);

    stepsContainer.innerHTML = steps.map(step => `<p>${step}</p>`).join("");
    document.getElementById("steps-container").classList.remove("hidden");
  } catch (error) {
    stepsContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    document.getElementById("steps-container").classList.remove("hidden");
  }
});

function solveLinearEquation(equation) {
  const match = equation.match(/(-?\d*)x\s*([+-]\s*\d+)\s*=\s*(-?\d+)/);
  if (!match) throw new Error("Formato no válido. Usa el formato: ax + b = c");

  let [_, a, b, c] = match;
  a = parseFloat(a || 1);
  b = parseFloat(b.replace(/\s+/g, ""));
  c = parseFloat(c);

  const steps = [];
  steps.push(`Ecuación original: ${equation}`);
  steps.push(`Paso 1: Resta ${b} de ambos lados`);
  c -= b;
  steps.push(`Resultado: ${a}x = ${c}`);
  steps.push(`Paso 2: Divide ambos lados entre ${a}`);
  const result = c / a;
  steps.push(`Resultado final: x = ${result}`);

  return steps;
}

function solveQuadraticEquation(equation) {
  const match = equation.match(/(-?\d*)x\^2\s*([+-]\s*\d*)x\s*([+-]\s*\d+)\s*=\s*0/);
  if (!match) throw new Error("Formato no válido. Usa el formato: ax^2 + bx + c = 0");

  let [_, a, b, c] = match;
  a = parseFloat(a || 1);
  b = parseFloat(b.replace(/\s+/g, ""));
  c = parseFloat(c.replace(/\s+/g, ""));

  const steps = [];
  steps.push(`Ecuación original: ${equation}`);
  steps.push(`Paso 1: Identifica los coeficientes: a = ${a}, b = ${b}, c = ${c}`);
  const discriminant = b * b - 4 * a * c;
  steps.push(`Paso 2: Calcula el discriminante: Δ = b² - 4ac = ${discriminant}`);

  if (discriminant < 0) {
    steps.push("La ecuación no tiene soluciones reales.");
  } else {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    steps.push(`Paso 3: Calcula las raíces usando la fórmula cuadrática:`);
    steps.push(`x₁ = ${root1}`);
    steps.push(`x₂ = ${root2}`);
  }

  return steps;
}

function solveSquareRoot(input) {
  const number = parseFloat(input);
  if (isNaN(number) || number < 0) throw new Error("Por favor, ingresa un número no negativo.");
  
  const steps = [];
  steps.push(`Número original: ${number}`);
  steps.push(`Paso 1: Calcula la raíz cuadrada de ${number}`);
  const result = Math.sqrt(number);
  steps.push(`Resultado: √${number} = ${result}`);
  return steps;
}

function solveCubicRoot(input) {
  const number = parseFloat(input);
  if (isNaN(number)) throw new Error("Por favor, ingresa un número válido.");
  
  const steps = [];
  steps.push(`Número original: ${number}`);
  steps.push(`Paso 1: Calcula la raíz cúbica de ${number}`);
  const result = Math.cbrt(number);
  steps.push(`Resultado: ∛${number} = ${result}`);
  return steps;
}