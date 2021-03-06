"use strict";
var PerforatedPlastic = {
    name: "Perforated plastic",
    inputs: [
        { name: "Red", value: 0.7, min: 0, max: 1 },
        { name: "Green", value: 0.7, min: 0, max: 1 },
        { name: "Blue", value: 0.7, min: 0, max: 1 },
        { name: "Specularity", value: 0, min: 0, max: 1 },
        { name: "Roughness", value: 0, min: 0, max: 1 },
        { name: "Transparency", value: 0.25, min: 0, max: 1 }
    ],
    rad: "void plastic %base_material_name% 0 0 5 %red% %green% %blue% %specularity% %roughness% void mixfunc %MAT_NAME% 4 void %base_material_name% transparency %funcfile% 0 0",
    support_files: [{ name: "funcfile", content: "transparency = %transparency%;" }],
    color_property: "Base material reflectance",
    process: function (inputs) {
        inputs["alpha"] = Math.sqrt(1 - parseFloat(inputs["Transparency"]));
        if (inputs["alpha"] > 0.95) {
            inputs["alpha"] = 0.95;
        }
        ;
        inputs["base_material_name"] = inputs["name"].toLowerCase().replace(/\s/g, "_") + "_base_material";
        return inputs;
    },
    parse: function (material) {
        var rad = material["rad"];
        var data = rad.split(" ");
        $("#red").val(data[6]);
        $("#green").val(data[7]);
        $("#blue").val(data[8]);
        $("#material_specularity").val(data[9]);
        $("#material_roughness").val(data[10]);
        var support_files = material["support_files"];
        var funcfile = support_files[0]["content"].split(" = ");
        var transparency = parseFloat(funcfile[1].replace(new RegExp(";", 'g'), ""));
        $("#material_transparency").val(transparency);
    }
};
module.exports = PerforatedPlastic;
//# sourceMappingURL=perforated-plastic.js.map