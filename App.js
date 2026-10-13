import React, { useState } from 'react';
import useFetch from './hooks/useFetch';
import ProductList from './components/ProductList';

const API = 'https://api.escuelajs.co/api/v1/products';

function App() {
  const [url, setUrl] = useState(API + '?offset=0&limit=12');
  const { data, loading, error, refetch } = useFetch(url);

  return (
    <div className="container">
      <header>
        <h1>React useFetch — Products</h1>
        <p className="subtitle">Custom hook example that fetches products from a demo API.</p>
      </header>

      <section className="controls">
        <button onClick={() => { setUrl(API + '?offset=0&limit=12'); }}>Load first 12</button>
        <button onClick={() => { setUrl(API + '?offset=12&limit=12'); }}>Next 12</button>
        <button onClick={() => refetch()}>Refetch</button>
        <input
          placeholder="Custom URL (press Enter)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = e.target.value.trim();
              if (val) setUrl(val);
            }
          }}
        />
      </section>

      <main>
        {loading && <div className="loading">Loading…</div>}
        {error && (
          <div className="error">
            <strong>Error:</strong> {error.message}
            <button onClick={() => refetch()}>Try again</button>
          </div>
        )}
        {data && Array.isArray(data) && <ProductList products={data} />}
        {data && !Array.isArray(data) && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </main>

      <footer>
        <p>Built with a custom <code>useFetch</code> hook. Deploy to Netlify or similar.</p>
      </footer>
    </div>
  );
}

export default App;
