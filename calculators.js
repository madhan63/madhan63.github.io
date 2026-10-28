
(function () {
  const $ = (id) => document.getElementById(id);

  function number(id) {
    return Number($(id).value);
  }

  function money(value) {
    return "₹" + value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function showError(id, message) {
    const el = $(id);
    if (el) {
      el.textContent = message;
      el.hidden = !message;
    }
  }

  function valid(values, errorId) {
    if (values.some(v => !Number.isFinite(v) || v < 0)) {
      showError(errorId, "Please enter valid, non-negative numbers.");
      return false;
    }
    showError(errorId, "");
    return true;
  }

  const fuelForm = $("fuel-form");
  if (fuelForm) {
    function calculateFuel() {
      const d = number("distance");
      const m = number("mileage");
      const p = number("fuel-price");

      if (!valid([d, m, p], "fuel-error")) return;
      if (m <= 0) {
        showError("fuel-error", "Mileage must be greater than zero.");
        return;
      }

      const litres = d / m;
      const cost = litres * p;

      $("fuel-total").textContent = money(cost);
      $("fuel-litres").textContent = litres.toFixed(2) + " litres";
      $("fuel-per-km").textContent = money(cost / (d || 1));
      $("fuel-distance").textContent = d.toLocaleString("en-IN") + " km";
    }

    fuelForm.addEventListener("submit", function (e) {
      e.preventDefault();
      calculateFuel();
    });

    $("fuel-reset").addEventListener("click", function () {
      $("distance").value = 250;
      $("mileage").value = 15;
      $("fuel-price").value = 105;
      calculateFuel();
    });
  }

  const mileageForm = $("mileage-form");
  if (mileageForm) {
    function calculateMileage() {
      const d = number("m-distance");
      const l = number("litres-used");

      if (!valid([d, l], "mileage-error")) return;
      if (l <= 0) {
        showError("mileage-error", "Fuel consumed must be greater than zero.");
        return;
      }

      $("mileage-total").innerHTML =
        (d / l).toFixed(2) + " <small>km/l</small>";
      $("mileage-distance").textContent =
        d.toLocaleString("en-IN") + " km";
      $("mileage-litres").textContent = l.toLocaleString("en-IN") + " litres";
    }

    mileageForm.addEventListener("submit", function (e) {
      e.preventDefault();
      calculateMileage();
    });

    $("mileage-reset").addEventListener("click", function () {
      $("m-distance").value = 300;
      $("litres-used").value = 20;
      calculateMileage();
    });
  }

  const tripForm = $("trip-form");
  if (tripForm) {
    function calculateTrip() {
      const d = number("trip-distance");
      const m = number("trip-mileage");
      const p = number("trip-price");
      const tolls = number("tolls");
      const other = number("other-costs");

      if (!valid([d, m, p, tolls, other], "trip-error")) return;
      if (m <= 0) {
        showError("trip-error", "Mileage must be greater than zero.");
        return;
      }

      const litres = d / m;
      const fuel = litres * p;

      $("trip-total").textContent = money(fuel + tolls + other);
      $("trip-fuel").textContent = money(fuel);
      $("trip-tolls").textContent = money(tolls);
      $("trip-other").textContent = money(other);
      $("trip-litres").textContent = litres.toFixed(2) + " litres";
    }

    tripForm.addEventListener("submit", function (e) {
      e.preventDefault();
      calculateTrip();
    });

    $("trip-reset").addEventListener("click", function () {
      $("trip-distance").value = 500;
      $("trip-mileage").value = 15;
      $("trip-price").value = 105;
      $("tolls").value = 300;
      $("other-costs").value = 200;
      calculateTrip();
    });
  }
})();
