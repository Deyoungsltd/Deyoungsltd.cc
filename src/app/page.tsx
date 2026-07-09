import { db } from '@/db';
import { products } from '@/db/schema';
import { desc } from 'drizzle-orm';
import DynamicCarousel from '@/components/DynamicCarousel';

export const revalidate = 0; // Bypasses aggressive caching to ensure data is always fresh

export default async function HomePage() {
  // Fetch the latest entries directly from the Drizzle ORM
  const inventory = await db.select().from(products).orderBy(desc(products.id)).limit(6);
  
  // Format the data specifically for the Carousel props
  const carouselSlides = inventory.slice(0, 3).map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl || '',
    title: item.name,
  }));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Featured Inventory</h1>
          <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest font-semibold">High-Fidelity Asset Showcase</p>
        </header>
        
        {/* Carousel Implementation */}
        <div className="mb-16">
          <DynamicCarousel slides={carouselSlides} />
        </div>

        {/* Structural Grid Layout for Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inventory.map((product) => (
            <article key={product.id} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
              <div className="aspect-w-16 aspect-h-9 bg-slate-100">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="object-cover w-full h-56" 
                  />
                ) : (
                  <div className="w-full h-56 flex items-center justify-center text-slate-400 text-xs uppercase tracking-wider">No Media Rendered</div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-lg font-bold tracking-tight mb-2">{product.name}</h2>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold bg-slate-100 px-3 py-1 rounded text-slate-800">
                    ₦{Number(product.price).toLocaleString()}
                  </span>
                  <button className="text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-slate-600 transition-colors">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
