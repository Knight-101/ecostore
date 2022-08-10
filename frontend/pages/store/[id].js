import { useRouter } from 'next/router'
import Product from '../../components/Product'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const prod = [{
    id: id,
    name: 'NFT',
    price: '1',
    description: 'NFT',
    image_url: '',
  }, {
    id: id + 1,
    name: 'NFT',
    price: '1',
    description: 'NFT',
    image_url: '',
  },
  {
    id: id + 2,
    name: 'NFT',
    price: '1',
    description: 'NFT',
    image_url: '',
  }, {
    id: id + 3,
    name: 'NFT',
    price: '1',
    description: 'NFT',
    image_url: '',
  }]

  return (<div className='store-container'>
    {prod.map((item) =>  (<Product key={item.id} product={item} />))}
    
    </div>)
}

export default User