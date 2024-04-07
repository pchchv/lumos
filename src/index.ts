function showTooltip(elem: Element, msg: string) {
  elem.setAttribute("aria-label", msg);
  elem.setAttribute(
    "class",
    "btn btn-outline-secondary tooltipped tooltipped-s",
  );
}

function clearTooltip(e: Event) {
  (e.currentTarget as HTMLElement).setAttribute(
    "class",
    "btn btn-outline-secondary",
  );
  (e.currentTarget as HTMLElement).removeAttribute("aria-label");
}

function fallbackMessage(action: string): string {
  let actionMsg = "";
  const actionKey = action === "cut" ? "X" : "C";
  if (/iPhone|iPad/i.test(navigator.userAgent)) {
    actionMsg = "No support :(";
  } else if (/Mac/i.test(navigator.userAgent)) {
    actionMsg = `Press ⌘-${actionKey} to ${action}`;
  } else {
    actionMsg = `Press Ctrl-${actionKey} to ${action}`;
  }
  return actionMsg;
}
