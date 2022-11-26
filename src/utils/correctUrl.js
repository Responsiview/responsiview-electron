export default function correctUrl(url) {
  let correctedUrl = url[url.length - 1] !== "/" ? url + "/" : url;

  if (!correctedUrl.includes("http") || !correctedUrl.includes("https")) {
    correctedUrl = "https://" + correctedUrl;
  }

  return correctedUrl;
}
