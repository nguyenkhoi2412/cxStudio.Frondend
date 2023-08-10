import gVariabies from "@stores/shared/variables";
const glang = gVariabies.locale.lang;

export const buildTreeSelect = (directories, lang = glang, parent = "") => {
  let node = [];
  directories
    .filter(function (d) {
      return d["parent"] === parent;
    })
    .forEach(function (d) {
      var cd = {
        key: d._id,
        title: d.title[lang],
        value: d._id,
      };

      const getChild = buildTreeSelect(directories, lang, d["_id"]);
      if (getChild.length > 0) {
        cd["children"] = getChild;
      }

      return node.push(cd);
    });

  return node;
};

export const convertListToTreeObjects = (list) => {
  if (list != null) {
    var map = {};
    var roots = [];
    for (var i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (var j = 0; j < list.length; j += 1) {
      var node = list[j];
      if (
        node.parentId !== null &&
        typeof list[map[node.parentId]] !== "undefined"
      ) {
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
};
