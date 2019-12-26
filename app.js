// Storage Controller

// Item Controller
const itemCtrl = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Stead Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UIselectors = {
    itemList: '#item-list'
  };

  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pen"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UIselectors.itemList).innerHTML = html;
    }
  };
})();

// App Controller
const App = (function(itemCtrl, UICtrl) {
  // Public methods
  return {
    init: function() {
      console.log('Initializing App.');

      // Fetch items from data structure
      const items = itemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);
    }
  };
})(itemCtrl, UICtrl);

App.init();
