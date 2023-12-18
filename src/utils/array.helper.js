export class arrayHelper {
  /**
   * Insert new item into an array
   * @params array: original array
   * @params index: index position append new item
   * @params items: item insert
   */
  static insert = (array, index, ...items) => {
    return [
      // part of the array before the specified index
      ...array.slice(0, index),
      // inserted items
      ...items,
      // part of the array after the specified index
      ...array.slice(index),
    ];
  };

  static update = (arr, newItem, field = "_id") => {
    var itemField = Array.isArray(newItem) ? newItem[0] : newItem;

    if (Array.isArray(arr)) {
      return arr.map((item) => {
        if (item[field] === itemField[field]) {
          return {
            ...item,
            ...itemField,
          };
        }

        return item;
      });
    }

    return itemField;
  };

  static delete = (arr, objItems, field = "_id") => {
    return objItems.length
      ? objectHelper.diffArrayObjects(arr, objItems) // deleteMany
      : arr.filter((item) => {
          // deleteOne
          return item[field] !== objItems[field];
        });
  };

  //* shuffle array
  static shuffle = (array) => {
    let ctr = array.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
  };

  //* build buildHierarchies
  static buildHierarchies = (
    array = [],
    idField = "_id",
    parentField = "parent"
  ) => {
    var sortDirectories = function (directories, parent) {
      let node = [];
      directories
        .filter(function (d) {
          return d[parentField] === parent;
        })
        .forEach(function (d) {
          var cd = d;
          cd.children = sortDirectories(directories, d[idField]);
          return node.push(cd);
        });
      return node;
    };

    return sortDirectories([...array], "");
  };
}
