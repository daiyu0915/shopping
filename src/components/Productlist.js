import React from 'react'
import {connect} from 'dva'
import styles from './Productlist.css'
// import Size from '../components/Size'
import FloatCart from '../components/FloatCart'
import Shelf from '../components/Shelf'
import Product from '../components/Product'

@connect(({shop}) => ({
  products: shop.products
}))


class Productlist extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'shop/testMock'
    })
  }
  
  render() {
    const {products} = this.props

    return (
      <div className={styles.product}>
     
        <div className={styles.product_head}>
          <div>{products.length} product(s) found.</div>
          <div>
            {/* <Size /> */}
          </div>
          <div className={styles.product_head_selectBar}>
           Order by 
            <Shelf style={{paddingLeft:'10px'}}/>
          </div>
          <FloatCart />
        </div>
       
        <div className={styles.product_list}>
          {products.map(item => (
            <Product data={item} key={item.id}/>           
          ))}
        </div>
        
      </div>
    )
  }
}

export default Productlist;
