function showTooltip(elem: HTMLElement, msg: string) {
  elem.setAttribute("aria-label", msg);
  elem.setAttribute("class", "btn btn-outline-secondary tooltipped tooltipped-s");
}

function clearTooltip(e: MouseEvent) {
  (e.currentTarget as HTMLElement).setAttribute("class", "btn btn-outline-secondary");
  (e.currentTarget as HTMLElement).removeAttribute("aria-label");
}
