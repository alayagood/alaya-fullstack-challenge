const moduleAlias = require("module-alias");
moduleAlias.addAliases({
    "@root": __dirname,
    "@configs": __dirname + "/configs",
    "@constants": __dirname + "/constants",
    "@controllers": __dirname + "/controllers",
    "@middlewares": __dirname + "/middlewares",
    "@models": __dirname + "/models",
    "@routes": __dirname + "/routes",
    "@utils": __dirname + "/utils"
});