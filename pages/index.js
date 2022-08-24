import Layout from '../components/Layout'
import OneProduct from '../components/Product'
import data from '../utils/data'
import Product from '../models/Product'
import db from '../utils/db'
export default function Home({products}) {
  return (
    <Layout title='home'>
          <div className='grid md:grid-cols-3 gap-5 lg:grid-cols-4 '>
            {products.map(product=>(<OneProduct key={product.slug} product={product} />)) } 
          </div>
    </Layout>
  )
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}