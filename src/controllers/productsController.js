const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products', {
			products
		})
		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const productDetail = products.find(product => product.id === +id)
		return res.render('detail',{
			...productDetail
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form',{			
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category, description, image} = req.body;

		const newProduct = {
			id : products[products.length -1].id +1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category: category,
			description: description.trim(),
			image:null,
		};
		products.push(newProduct);
		/* res.send(products) */
		fs.writeFileSync('./src/data/productsDataBase.json',JSON.stringify(products, null, 3),'utf-8');
		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;

		const productToEdit = products.find(producto => producto.id === +id);
		return res.render('product-edit-form',{
			...productToEdit,
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount, category, description, image} = req.body;

		const id = +req.params.id

		const product = products.find(product => product.id === +id);

		const productUpdated = {
			id: id,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category: category,
			description: description.trim(),
			image:null,
		}

		const productosModified = products.map(product=>{
			if(product.id === +id){
				return productUpdated
			}
			return product
		});

		

		fs.writeFileSync('./src/data/productsDataBase.json',JSON.stringify(productosModified, null, 3),'utf-8');

		return res.redirect('/products')

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		const product = products.filter(product => product.id !== +id)
		
	fs.writeFileSync('./src/data/productsDataBase.json',JSON.stringify(product, null, 3),'utf-8');
	return res.redirect('/products')
	}
};

module.exports = controller;