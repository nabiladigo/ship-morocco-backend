const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'name can not be empty']
        },
        image:{
            type: String,
            // required: [true, 'image can not be empty']
        },
        price: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            // required: [true, 'price can not be empty'],
        },
        weight:{
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, 'price can not be empty'],
        },
        trackingNumber:{
            type: String,
        },
        user: {
          type: String,
        //   required: true,
          ref: "User",
        },
    },
    {
        timestamps :true,
    }
);

const Package= mongoose.model('Package', packageSchema);

module.exports = Package;

// class Collection {
//     #Model
//     #currentId
//     #items
//     constructor(model, startingData) {
//         this.#Model = model;
//         this.#currentId = 0;
//         this.#items = this.#populateItems( startingData );
//     }

//     /**
//      * @description It will take an array as a argument 
//      * @returns on Object that contains the { id as a key } and { te item as the value } 
//      */

//     #populateItems( startingData ) {
//         return startingData.reduce(( acc, item, idx ) => {
//             this.#currentId = idx;
//             acc[this.#currentId] = new this.#Model(item, idx)
//             return acc;
//         }, {});
//     }

//     #generateId(){
//         return ++this.#currentId
//     }

//     /**
//      * @description Will return an array with all items availible in this.items
//      * @returns array
//      */

//     find() {
//         return Object.values(this.#items);
//     }

//     /**
//      * @description Will return item match with the itemId
//      * @param { string } itemId
//      * @param { function } callBack Will return error or item
//      * @returns function;
//      */

//     findById( itemId, callBack ) {
//         if (!itemId) return console.log("missing id in first argument");
    
//         if (typeof callBack !== "function") {
//             return console.log("missing function in second argument");
//         }
    
//         let error;
//         const item = this.#items[itemId];
    
//         if (!item) {
//             error = { message: `item with id "${itemId}" can't be found` };
//         }
    
//         return callBack(error, item);
//     }
// };


// class Package {
//     constructor( data, id ) {
//         this.id = id;
//         this.title = data.title;
//         this.price = data.price;
//         this.image = data.image;
//         this.weight = data.weight;
//     }
// }

// module.exports = new Collection(Package, [
//     {
//         title: 'Internet Friends',
//         price: 29,
//         image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
//         weight:  20,
//     }
// ]);