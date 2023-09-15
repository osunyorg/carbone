const { co2 } = require("@tgwf/co2");
const co2Emission = new co2();
const bytesSent = 1000; // 1 ko
const greenHost = true;
const options = {
    gridIntensity: {
      dataCenter: { country: "FRA" },
    },
  };
estimatedCO2 = co2Emission.perVisitTrace(bytesSent, greenHost, options);
const co2PerKo = estimatedCO2['co2'];
console.log(co2PerKo);