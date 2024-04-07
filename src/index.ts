import * as StellarSdk from "@stellar/stellar-sdk";
import ClipboardJS from "clipboard";

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

document.addEventListener("DOMContentLoaded", function () {
  const btns = document.querySelectorAll(".btn.btn-outline-secondary");
  btns.forEach((btn: Element) => {
    btn.addEventListener("mouseleave", clearTooltip);
    btn.addEventListener("blur", clearTooltip);
  });

  const clipboard = new ClipboardJS(".btn.btn-outline-secondary");
  clipboard.on("success", function (e) {
    e.clearSelection();
    showTooltip(e.trigger, "Copied!");
    console.log(e.trigger);
  });

  clipboard.on("error", function (e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
  });

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    const mobileAlert = document.getElementById("mobile-alert");
    if (mobileAlert) {
      mobileAlert.style.display = "block";
    }
  }

  const suffixInput = document.getElementById("suffix") as HTMLInputElement;
  suffixInput.addEventListener("keyup", function () {
    if (this.value.length >= 4) {
      const suffixBadge = document.getElementById("suffixbadge");
      if (suffixBadge) {
        suffixBadge.style.visibility = "visible";
        if (this.value.length === 4) {
          suffixBadge.classList.remove("badge-danger");
          suffixBadge.classList.add("badge-warning");
          suffixBadge.textContent = "Will take 30-120 min to compute addresses";
        } else {
          suffixBadge.classList.remove("badge-warning");
          suffixBadge.classList.add("badge-danger");
          suffixBadge.textContent =
            "Will take more than 2 hours to compute addresses";
        }
      }
    } else {
      const suffixBadge = document.getElementById("suffixbadge");
      if (suffixBadge) {
        suffixBadge.style.visibility = "hidden";
      }
    }
  });
});

function generateInUiThread(suffix: string) {
  const pr = document.getElementById("privateKey") as HTMLInputElement;
  const pp = document.getElementById("publicKey") as HTMLInputElement;

  const st = new Date().getTime();
  let pair = StellarSdk.Keypair.random();
  while (true) {
    if (pair.publicKey().endsWith(suffix)) {
      break;
    }
    pair = StellarSdk.Keypair.random();
  }
  const end = new Date().getTime();

  pr.value = pair.secret();
  pp.value = pair.publicKey();

  document.getElementById("timebadge")!.textContent =
    `Took ${(end - st) / Number((1000.0).toFixed(2))} sec to compute`;
}
