const channel = new BroadcastChannel("webviewChannel");

let prevRatio = 0;

function handleScrollEvent(event) {
  let scrollTop = Math.round(window.scrollY);
  let scrollHeight = Math.round(document.body.scrollHeight);
  let clientHeight = Math.round(window.innerHeight);

  let contentHeight = scrollHeight - clientHeight;
  let ratio = Math.round((scrollTop / contentHeight) * 100);

  channel.postMessage(ratio);
}

window.addEventListener("scroll", handleScrollEvent);

channel.onmessage = (event) => {
  let scrollHeight = Math.round(document.body.scrollHeight);
  let clientHeight = Math.round(window.innerHeight);

  if (event.data === 0) {
    window.scrollTo(0, 0);
    return;
  }
  if (event.data === 100) {
    window.scrollTo(0, scrollHeight - clientHeight);
    return;
  }
  if (Math.abs(prevRatio - event.data) <= 1) return;

  prevRatio = event.data;
  window.scrollTo(0, (event.data * (scrollHeight - clientHeight)) / 100);
};
