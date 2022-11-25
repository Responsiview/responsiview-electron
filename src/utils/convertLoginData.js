export default function convertLoginData(data) {
  return JSON.parse(
    data
      .replace("responsiview:", "")
      .replaceAll("%7B", "{")
      .replaceAll("%22", '"')
      .replaceAll("%7D", "}"),
  );
}
