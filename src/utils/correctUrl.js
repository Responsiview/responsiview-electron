export default function correctUrl(url) {
  let correctedUrl = url[url.length - 1] !== "/" ? url + "/" : url;

  if (correctedUrl.startsWith("http://")) {
    correctedUrl = correctedUrl.replace("http://", "https://");
  }

  if (!correctedUrl.includes("https://")) {
    correctedUrl = "https://" + correctedUrl;
  }

  if (!correctedUrl.includes("www")) {
    correctedUrl = correctedUrl.replace("//", "//www.");
  }

  return correctedUrl;
}
