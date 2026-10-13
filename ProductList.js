import React from 'react';

export default function ProductList({ products }) {
  if (!products || products.length === 0) return <p>No products to display.</p>;

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <img src={p.images && p.images[0]} alt={p.title} />
          <div className="card-body">
            <h3>{p.title}</h3>
            <p className="price">₹{p.price}</p>
            <p className="category">{p.category?.name}</p>
            <details>
              <summary>Details</summary>
              <p>{p.description}</p>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
}
