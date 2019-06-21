var db = new PouchDB('shopping');

// Vue Material plugin
Vue.use(VueMaterial);

Vue.component('fieldAwesome', {
  template: 
    '<input\
        class="form-control" \
        type="text" \
        :model="model" \
        placeholder="schema.placeholder" \
        :disabled="disabled">',

  script:
     'import { abstractField } from "VueFormGenerator";\
   export default {\
         mixins: [ abstractField ]\
   };'
});


// Vue Form Generator plugin
Vue.use(VueFormGenerator);

// Vue Material theme
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'white',
  warn: 'red',
  background: 'grey'
});

var app = new Vue({
  el: '#app',
  data: {
    pagetitle: 'Operator Forklit',
    shoppingLists: [],
    shoppingListItems: [],
    mode: 'showlist',
    //singleList: null,
    modelIndex: 0,
    model: {},
    schema: {},
    currentListId: null,
    newItemTitle:'',
    formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
  },
  created: function(){
    //create database index on the 'type' field
    db.createIndex({ index: { fields: ['type'] }}).then(() => {
      //load all 'list' items
      var q = {
        selector: {
          type: 'list'
        }
      };
      return db.find(q);
    }).then((data) => {
      //write the data to the vue model, and from there the web page
      app.shoppingLists = data.docs;

      //get all of the shopping list item
      var q = {
        selector: {
          type: 'item'
        }
      };
      return db.find(q);
    }).then((data) => {
      app.shoppingListItems = data.docs;
    });
  },
  methods: {
    findDoc: function(docs, id, key){
      if(!key){
        key = '_id';
      }
      var doc = null;
      for(var i in docs){
        if(docs[i][key] == id){
          doc = docs[i];
          break;
        }
      }
      return{ i:i, doc: doc};
    },
    onClickAddShoppingList: function() {
      // open shopping list form
      this.pagetitle = 'Tambah Assesi';
      this.mode='addlist';
      this.model = JSON.parse(JSON.stringify(sampleShoppingList));
      this.schema = schema_assesi;
      this.model._id = 'list:' + cuid();
      this.model.createdAt = new Date().toISOString();
    },
    onBack: function() {
      this.mode='showlist';
      this.pagetitle='Operator Forklit'; //addlist, showlist, id
    },
    onBalik: function(id, nama){
      this.mode = id;
      this.pagetitle = 'Assesi : ' + nama;
    },
    onClickSaveShoppingList: function() {
      
      // add timestamps
      this.model.updatedAt = new Date().toISOString();

      // add to on-screen list, if it's not there already
      if(typeof this.model._rev === 'undefined')
      this.shoppingLists.unshift(this.model);

      // write to database
      db.put(this.model).then((data) => {
        // keep the revision tokens
        this.model._rev = data.rev;

        // switch mode
        this.onBack();
      });
    },
    onClickEdit: function(id, nama){
      this.model = this.findDoc(this.shoppingLists, id).doc;
      this.schema = schema_assesi;
      this.pagetitle = 'Edit : ' + nama;
      this.mode = 'addlist';

    },
    onClickSaveForm: function(id, nama) {
      
      // add timestamps
      this.model.updatedAt = new Date().toISOString();

      // add to on-screen list, if it's not there already
      if(typeof this.model._rev === 'undefined')
      this.shoppingLists.unshift(this.model);

      // write to database
      db.put(this.model).then((data) => {
        // keep the revision tokens
        this.model._rev = data.rev;

        // switch mode
        this.onBalik(id, nama);
      });
    },
    onMPA02_2: function(id,nama){
      //add timestamps
      this.model =  this.findDoc(this.shoppingLists, id).doc;

      //add to on-screen list
      this.schema = schema_edit_assesi;
      this.pagetitle = 'FR-MPA-02.2 CEKLIS OBSERVASI-DEMONSTRASI/PRAKTEK : ' + nama;
      this.mode = "MPA02.2";

    },
    
    onClickList: function(id, nama) {
      var pindah = this.findDoc(this.shoppingLists, id);
      this.model = pindah.doc;
      this.modelIndex = pindah.i;
      this.currentListId = id;
      this.pagetitle = 'Assesi : ' + nama;
      this.mode = id;
    },
    onHapus: function(id){
      var match = this.findDoc(this.shoppingLists, id);
      db.remove(match.doc).then(() => {
        this.shoppingLists.splice(match.i, 1);
      });
    },
    prettyJSON: function(json) {
        if (json) {
            json = JSON.stringify(json, undefined, 4);
            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
    }
  }
});