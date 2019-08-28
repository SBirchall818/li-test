export default function fetchLatLong(epcObj) {
  return new Promise((resolve, reject) => {
    // Process as if each call takes the maximum 250 ms
    setTimeout(resultFn, 250);
    function resultFn() {
      // Return value should be EPC object with lat / long
      return resolve(Object.assign(epcObj, {latitude: 51.45, longitude: 1.001}));
    }
  });
}