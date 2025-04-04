import {useState} from 'react';

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return <>
    <SearchBar 
      filterText={filterText} 
      inStockOnly={inStockOnly}
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly} />
    <ProductTable 
      products={PRODUCTS}
      filterText={filterText}
      inStockOnly={inStockOnly} />
  </>
}



function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return <>
    <input type="text"  value={filterText}  placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)} />
    <br/>
    <label>
      <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
      {' '}
      Only show products in stock
    </label>
  </>
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({category}) {
  
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({product}) {
  return (
    <tr>
      <td style={product.stocked ? {} : {color: '#ff0000'}}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}