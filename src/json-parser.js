"use strict";

function ThreeSerializer () {
};


ThreeSerializer.prototype = {
	serializeToString : function(json, element, clazz, mapToMethod, fieldTypes) {
		let parentobj = {};
		parentobj.children = [];
		parentobj.string = "X3D";
		let obj = this.parseObject(parentobj, "Scene", fieldTypes, json["X3D"]["Scene"]);
		this.deltree(obj);
		console.log(JSON.stringify(obj, null, 2));
		// dump after we find first scene
		return JSON.stringify(obj, null, 2);
	},
	parseFromString : function(data) {
		let fieldTypes = require('./fieldTypes.js');
		let parentobj = {};
		parentobj.children = [];
		parentobj.string = "X3D";
		return  this.parseObject(parentobj, "Scene", fieldTypes, JSON.parse(data)["X3D"]["Scene"]);
	},
	deltree : function (tree) {
		if (typeof tree === 'object') {
			delete tree.parent;
			for (let t in tree) {
				this.deltree(tree[t]);
			}
		}
	},
	parseSubObject : function(attrType, type, values) {
		if (attrType.startsWith("MF")) {
			let newArray = [];
			for (let j = 0; j < values.length;) {
				let newObject = {};
				for (let letter in type) {
					newObject[type[letter]] = parseFloat(values[j++]);
				}
				newArray.push(newObject);
			}
			return newArray;

		} else {
			let newObject = {};
			let j = 0;
			for (let letter in type) {
				newObject[type[letter]] = parseFloat(values[j++]);
			}
			return newObject;
		}
	},
	parseSubArray : function(attrType, numpersub, values) {
		if (numpersub > 1 && attrType.startsWith("MF")) {
			let newArrays = [];
			for (let j = 0; j < values.length;) {
				let newArray = [];
				for (let i = 0; i < numpersub; i++) {
					if (attrType === "MFString") {
						newArray[i] = values[j++];
					} else {
						newArray[i] = parseFloat(values[j++]);
					}
				}
				newArrays.push(newArray);
			}
			return newArrays;
		} else if (numpersub === 0) { // index
			let newArrays = [];
			let newArray = [];
			let i = 0;
			for (let j = 0; j < values.length;) {
				if (values[j] == -1) {
					newArrays.push(newArray);
					newArray = [];
					j++;
					i = 0;
				} else {
					if (attrType === "MFString") {
						newArray[i++] = values[j++];
					} else {
						newArray[i++] = parseFloat(values[j++]);
					}
				}
			}
			return newArrays;
		} else {
			return values;
		}
	},
	parseObject : function(parentobj, name, fieldTypes, json, containerField) {
		let obj = {};
		obj.string = name;
		if (name != "Scene") {
			obj.string = name.toLowerCase();
			obj.nodeType = name.toLowerCase();
			if (containerField !== obj.nodeType) {
				obj.string = containerField+" "+obj.nodeType;
			}
		}
		obj.children = [];
		for (let field in json) {
			if (field.startsWith("@")) {
				if (field == "@xmlns:xsd" || field == "@xsd:noNamespaceSchemaLocation") {
					continue;
				}
				let attr = field.substr(1);
				if (attr !== '@containerField') {
					// look at object model
					let attrType = "SFString";
					if (typeof fieldTypes[name] !== 'undefined') {
						attrType = fieldTypes[name][attr];
					}

					let value = "";
					if (json[field] === 'NULL') {
						value = null;
					} else if (attrType === "SFString") {
						value = json[field];
					} else if (attrType === "SFInt32") {
						value = json[field];
					} else if (attrType === "SFFloat") {
						value = json[field];
					} else if (attrType === "SFDouble") {
						value = json[field];
					} else if (attrType === "SFBool") {
						value = json[field];
					} else if (attrType === "MFString") {
						value = this.parseSubArray(attrType, 1, json[field]);
					} else if (attrType === "MFInt32") {
						if (attr.endsWith("Index")) {
							value = this.parseSubArray(attrType, 0, json[field]);
						} else {
							value = this.parseSubArray(attrType, 1, json[field]);
						}
					} else if (
						attrType === "MFImage"||
						attrType === "SFImage") {
						value = this.parseSubArray(attrType, 1, json[field]);
					} else if (
						attrType === "SFColor"||
						attrType === "MFColor") {
						value = this.parseSubObject(attrType, "rgb", json[field]);
					} else if (
						attrType === "SFColorRGBA"||
						attrType === "MFColorRGBA") {
						value = this.parseSubObject(attrType, "rgba", json[field]);
					} else if (
						attrType === "SFVec2d"||
						attrType === "MFVec2d"||
						attrType === "SFVec2f"||
						attrType === "MFVec2f") {
						value = this.parseSubObject(attrType, "xy", json[field]);
					} else if (
						attrType === "SFVec3d"||
						attrType === "MFVec3d"||
						attrType === "SFVec3f"||
						attrType === "MFVec3f") {
						value = this.parseSubObject(attrType, "xyz", json[field]);
					} else if (
						attrType === "SFVec4d"||
						attrType === "MFVec4d"||
						attrType === "SFVec4f"||
						attrType === "MFVec4f") {
						value = this.parseSubObject(attrType, "xyzw", json[field]);
					} else if (
						attrType === "SFRotation"||
						attrType === "MFRotation") {
						value = this.parseSubObject(attrType, "xyzw", json[field]);
					} else if (
						attrType === "SFMatrix3d"||
						attrType === "MFMatrix3d"||
						attrType === "SFMatrix3f"||
						attrType === "MFMatrix3f") {
						value = this.parseSubArray(attrType, 9, json[field]);
					} else if (
						attrType === "SFMatrix4d"||
						attrType === "MFMatrix4d"||
						attrType === "SFMatrix4f"||
						attrType === "MFMatrix4f") {
						value = this.parseSubArray(attrType, 16, json[field]);
					} else if (
						attrType === "MFFloat") {
						value = this.parseSubArray(attrType, 1, json[field]);
					} else if (
						attrType === "MFDouble") {
						value = this.parseSubArray(attrType, 1, json[field]);
					} else if (attrType === "MFBool") {
						value = this.parseSubArray(attrType, 1, json[field]);
					} else {
						value = json[field];
					}
					obj[attr] = value;
				}
			} else if (field === "#comment") {
				obj.children.push("/*"+json[field]+"*/");
			} else if (field === "#sourceText") {
				obj.children.push("<script>"+json[field].join("\r\n")+'</Script>');
			} else {
				let node = json[field];
				if (typeof node === 'object') {
					let cf = "";
					if (field === "-children") {
						cf = "";
					} else if (field.startsWith("-")) {
						cf = containerField === "appearance"
							? containerField
							: field.substr(1);
					} else {
						cf = containerField;
					}
					let container = this.parseObject(obj, field, fieldTypes, node, cf);

					let ct = container.nodeType || "-";
					let nct = parseInt(ct.trim());
					let ict = ct.startsWith("-") || !isNaN(nct); // illegal if true
					if (ict) {
						obj.children = obj.children.concat(container.children);
						container.parent = obj;
					} else if (obj.nodeType) {
						obj.children.push(container);
						container.parent = obj;
					}
				}
			}
		}

		// Now do something with the attribute
		if (obj.DEF) {
			obj.string += " DEF "+obj.DEF;
		}
		if (obj.USE) {
			obj.string += " USE "+obj.USE;
		}
		if (obj.point) {
			obj.points = obj.point;
		}
		return obj;
	}
}


if (typeof module === 'object')  {
	module.exports = ThreeSerializer;
}
