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
      // { id: 0, name: 'Stead Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 400 },
      // { id: 2, name: 'Eggs', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function() {
      let total = 0;

      // Loop through items and add calories
      data.items.forEach(function(item) {
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UIselectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
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
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UIselectors.itemNameInput).value,
        calories: document.querySelector(UIselectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UIselectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pen"></i>
      </a>`;

      // Insert item
      document
        .querySelector(UIselectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    clearInput: function() {
      document.querySelector(UIselectors.itemNameInput).value = '';
      document.querySelector(UIselectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UIselectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UIselectors.totalCalories
      ).textContent = totalCalories;
    },
    getSelectors: function() {
      return UIselectors;
    }
  };
})();

// App Controller
const App = (function(itemCtrl, UICtrl) {
  // Load evet listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UIselectors = UICtrl.getSelectors();

    // Add Item event
    document
      .querySelector(UIselectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  // Add Item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Public methods
  return {
    init: function() {
      console.log('Initializing App.');

      // Fetch items from data structure
      const items = itemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(itemCtrl, UICtrl);

App.init();
