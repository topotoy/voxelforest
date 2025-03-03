/* Shared between editor/viewer. */
var Module = {
  preRun: [],
  postRun: [],
  canvas: (function () {
    var canvas = document.querySelector("#canvas");
    canvas.addEventListener("webglcontextlost", function (e) {
      alert("WebGL context lost. Please reload the page."); e.preventDefault();
    }, false);
    return canvas;
  })(),
  locateFile: function (path, prefix) {
    if (path.endsWith(".wasm")) { return (g_webex_basedir + path); }
    if (path.endsWith(".data")) { return (g_webex_basedir + path); }
    return prefix + path;
  },
  onRuntimeInitialized: function () { }
};
function webex_in(op, d0, d1, d2) {
  Module.ccall("webex_in", null, ["string", "string", "string", "string"], [op, d0, d1, d2]);
}
var webex_is_alive = false;
function webex_out(op, d0, d1, d2) {
  webex_is_alive = true;
}
/* Boot sequence. */
async function read_version_txt(file_path) {
  try {
    const response = await fetch(file_path, { cache: "reload" });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const contents = (await response.text());
    return contents;
  } catch (error) {
    console.error("There was a problem reading the file:", error);
    throw error;
  }
}
function swap_editor_div_progress() {
  //    if (webex_is_alive) {
  document.getElementById("editor-div").style.display = "block";
  document.getElementById("editor-div-progress").style.display = "none";
  /*  }
    else {
        setTimeout(swap_editor_div_progress, 250);
    }*/
}
function append_version_controlled_js(version_controlled_js) {
  const js = document.createElement("script");
  js.setAttribute("src", (g_webex_basedir + version_controlled_js));
  js.onload = () => {
    swap_editor_div_progress();
  }
  document.head.appendChild(js);
}
/* We assume DOMContentLoaded here... */
function on_sign_in(state, auth_token) {
  read_version_txt(g_webex_basedir + g_webex_version_txt)
    .then(append_version_controlled_js)
    .catch(error => {
      console.error(error);
    });
}