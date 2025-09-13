document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Last modified
  document.getElementById("lastModified").textContent = document.lastModified;

  // Data for calculating wind chill
  const temp = parseFloat(document.getElementById("temperature").textContent);
  const wind = parseFloat(document.getElementById("wind-speed").textContent);
  const windChillEl = document.getElementById("wind-chill");

  // Cooling factor formula
  function calculateWindChill(t, v) {
    return 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);
  }

  // Apply conditions for the calculation
  if (temp <= 10 && wind > 4.8) {
    windChillEl.textContent = calculateWindChill(temp, wind).toFixed(1) + "°C";
  } else {
    windChillEl.textContent = "N/A";
  }
});