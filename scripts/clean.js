require("rimraf")(
  require("path").resolve(__dirname, "../dist"),
  function(){
    console.log("[clean] done!")
  }
)
