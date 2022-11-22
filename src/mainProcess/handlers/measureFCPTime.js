const puppeteer = require("puppeteer");

const measureFCPTime = async (deviceInfo) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--start-maximized"],
  });

  const Promises = deviceInfo.devices.map(async (device) => {
    const page = await browser.newPage();

    await page.setUserAgent(device.useragent);
    await page.setViewport({ width: device.width, height: device.height });
    await page.goto(deviceInfo.url);

    const FCPResult = await page.evaluate(async () => {
      const timeObject = {};

      performance.getEntriesByType("paint").forEach((entry) => {
        if (entry.name === "first-contentful-paint") {
          timeObject[entry.name] = entry.startTime;
        }
      });

      return timeObject;
    });

    FCPResult.deviceName = device.name;

    return FCPResult;
  });

  const FCPResults = await Promise.all(Promises);

  await browser.close();

  return FCPResults.find((result) => !result["first-contentful-paint"])
    ? await measureFCPTime(deviceInfo)
    : FCPResults;
};

module.exports = measureFCPTime;
